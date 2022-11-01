let BettingBookService = require('./services/BettingBookService');
let GameService = require('./services/GameService');
let BetService = require('./services/BetService');
let UserService = require('./services/UserService');
let WinnerBetService = require('./services/WinnerBetService');
let TeamService = require('./services/TeamService');

let BettingBookUtils = require('./utils/BettingBookUtils');

/**
 * @param {bettingBookId}
 * @returns {
 *  id,
 *  phase: {withScore, withDoble, name},
 *  enabled,
 *  bets: [{
 *   id,
 *   gameId,
 *   date,
 *   teamA: {flagImg, name},
 *   teamB: {flagImg, name},
 *   teamAScore,
 *   teamBScore
 *  }],
 *  extraBet,
 *  winnerBet: {
 *   id,
 *   teamId
 *  }
 * }
 */
Parse.Cloud.define('getBettingBook', (request, response) => {
  if (request.user) {
    return BettingBookService.getBettingBook(request.params.bettingBookId)
      .then((bettingBook) => {
        return GameService.getGamesOfBettingBook(bettingBook)
          .then((games) => {
            return Promise.all([
              BetService.getBetsByUser(request.user, games),
              WinnerBetService.getWinnerBet(bettingBook, request.user)
            ]).then((values) => {
              let bets = values[0];
              let winnerBet = values[1];

              if (bets.length !== 0) {
                return response.success(BettingBookUtils.generateBettingBookJson(bettingBook, bets, winnerBet));
              } else {
                return TeamService.getActiveTeams().then((teams) => {
                  return Promise.all([
                    BetService.generateBetsForUserByGames(request.user, games, bettingBook.attributes.phase.attributes.withDouble),
                    WinnerBetService.generateWinnerBet(request.user, bettingBook, teams[0])
                  ]).then((values) => {
                    let bets = values[0];
                    let winnerBet = values[1];

                    return response.success(BettingBookUtils.generateBettingBookJson(bettingBook, bets, winnerBet));
                  });
                });
              }
            });
          });
      }).catch((error) => {
        console.log(error);
        return response.error(error);
      });
  } else {
    console.log('Not user');
    return response.error('Not user');
  }
});

/**
 * @param {
 *  id,
 *  phase: {withScore, withDoble, name},
 *  enabled,
 *  bets: [{
 *   id,
 *   gameId,
 *   date,
 *   teamA: {flagImg, name},
 *   teamB: {flagImg, name},
 *   teamAScore,
 *   teamBScore
 *  }],
 *  extraBet
 * }
 */
Parse.Cloud.define('saveBets', (request, response) => {
  let bettingBook = request.params.bettingBook;

  return BettingBookService.getBettingBook(bettingBook.id).then((bb) => {
    let now = new Date();
    if (now < bb.attributes.initDate || now > bb.attributes.endDate) {
      return response.error('Fuera de hora');
    }

    let betIds = [];

    for (let bet of bettingBook.bets) {
      betIds.push(bet.id);
    }
    if (bettingBook.extraBet) {
      betIds.push(bettingBook.extraBet.id);
    }

    return Promise.all([
      BetService.getBetsByIds(betIds),
      WinnerBetService.getWinnerBetById(bettingBook.winnerBet.id),
      TeamService.getTeam(bettingBook.winnerBet.teamId)
    ]).then((values) => {
      let bets = values[0];
      let winnerBet = values[1];
      let team = values[2];

      for (let bet of bettingBook.bets) {
        for (let b of bets) {
          if (bet.id === b.id) {
            b.set('teamAScore', bet.teamAScore);
            b.set('teamBScore', bet.teamBScore);
            break;
          }
        }
      }

      return WinnerBetService.updateWinnerBet(winnerBet, team).then(() => {
        return Parse.Object.saveAll(bets).then(() => {
          if (bettingBook.extraBet) {
            return GameService.getGameById(bettingBook.extraBet.gameId).then((game) => {
              let extraBet;
              for (let bet of bets) {
                if (bet.id === bettingBook.extraBet.id) {
                  extraBet = bet;
                  break;
                }
              }

              extraBet.set('teamAScore', bettingBook.extraBet.teamAScore);
              extraBet.set('teamBScore', bettingBook.extraBet.teamBScore);
              extraBet.set('game', game);

              return extraBet.save().then(() => {
                return response.success('success');
              });
            });
          } else {
            return response.success('success');
          }
        });
      });
    });
  }).catch((error) => {
    console.log(error);
    return response.error(error);
  });
});

/**
 * @param {bettingBookId}
 * @returns {
 *  bettingBookId,
 *  phase: {withScore, name},
 *  games: [{
 *   id,
 *   date,
 *   teamA: {name, flagImg},
 *   teamB: {name, flagImg},
 *   teamAScore,
 *   teamBScore,
 *   finished
 *  }],
 *  users: [{
 *   name,
 *   hits: [{
 *    flag,
 *    teamAScore,
 *    teamBScore
 *   }],
 *   totalHits
 *  }]
 * }
 */
Parse.Cloud.define('getScoreTable', (request, response) => {
  return BettingBookService.getBettingBook(request.params.bettingBookId)
    .then((bettingBook) => {
      return GameService.getGamesOfBettingBook(bettingBook)
        .then((games) => {
          return BetService.getValidBets(games)
            .then((bets) => {
              return response.success(BettingBookUtils.generateScoreTable(bettingBook, games, bets));
            });
        });
    }).catch((error) => {
      console.log(error);
      return response.error(error);
    });
});

/**
 * @param{bettingBookId, userId, valid}
 */
Parse.Cloud.define('validateBets', (request, response) => {
  if (request.user.attributes.admin) {
    return BettingBookService.getBettingBook(request.params.bettingBookId)
      .then((bettingBook) => {
        return GameService.getGamesOfBettingBook(bettingBook)
          .then((games) => {
            return UserService.getUserById(request.params.userId)
              .then((user) => {
                return BetService.getBetsByUser(user, games)
                  .then((bets) => {
                    return BetService.setValid(bets, request.params.valid)
                      .then(() => {
                        return response.success('success');
                      });
                  });
              });
          });
      }).catch((error) => {
        console.log(error);
        return response.error(error);
      });
  } else {
    return response.error('No puede realizar esta operación');
  }
});

/**
 * @param {bettingBookId}
 * @returns {[{id, name, valid}]}
 */
Parse.Cloud.define('getValidBetsSummary', (request, response) => {
  return BettingBookService.getBettingBook(request.params.bettingBookId)
    .then((bettingBook) => {
      return GameService.getGamesOfBettingBook(bettingBook)
        .then((games) => {
          return UserService.getAllUsers()
            .then((users) => {
              return BetService.getBetsByGames(games)
                .then((bets) => {
                  return response.success(BettingBookUtils.generateValidBetsSummary(users, bets));
                });
            });
        });
    }).catch((error) => {
      console.log(error);
      return response.error(error);
    })
});