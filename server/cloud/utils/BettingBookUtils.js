
module.exports = {
  generateBettingBookJson(bettingBook, bets, winnerBet) {
    let today = new Date();

    let phase = bettingBook.attributes.phase;

    let enabled = today >= bettingBook.attributes.initDate
      && today < bettingBook.attributes.endDate;

    let betsJson = [];

    let bettingBookJson = {
      id: bettingBook.id,
      initDate: bettingBook.attributes.initDate,
      endDate: bettingBook.attributes.endDate,
      phase: {
        withScore: phase.attributes.withScore,
        withDouble: phase.attributes.withDouble,
        name: phase.attributes.name
      },
      enabled,
      winnerBet: {
        id: winnerBet.id,
        teamId: winnerBet.attributes.team.id
      }
    };

    let valid = true;

    for (let bet of bets) {
      let cGame = bet.attributes.game;
      let betJson = {
        id: bet.id,
        gameId: cGame.id,
        date: cGame.attributes.date,
        teamA: {
          flagImg: cGame.attributes.teamA.attributes.flagImg,
          name: cGame.attributes.teamA.attributes.name
        },
        teamB: {
          flagImg: cGame.attributes.teamB.attributes.flagImg,
          name: cGame.attributes.teamB.attributes.name
        },
        teamAScore: bet.attributes.teamAScore,
        teamBScore: bet.attributes.teamBScore
      };
      if (bet.attributes.doubleBet) {
        bettingBookJson.extraBet = betJson;
      } else {
        betsJson.push(betJson);
      }

      valid &= bet.attributes.valid;
    }

    betsJson.sort((a, b) => {
      return a.date - b.date;
    });

    bettingBookJson.bets = betsJson;
    bettingBookJson.valid = valid;

    return bettingBookJson;
  },

  generateScoreTable(bettingBook, games, bets) {
    let scoreTable = {
      bettingBookId: bettingBook.id,
      phase: {
        name: bettingBook.attributes.phase.attributes.name,
        withScore: bettingBook.attributes.phase.attributes.withScore
      }
    };

    let sgames = [];
    let matrix = {};

    for (let game of games) {
      sgames.push({
        id: game.id,
        date: game.attributes.date,
        teamA: {
          name: game.attributes.teamA.attributes.name,
          flagImg: game.attributes.teamA.attributes.flagImg
        },
        teamB: {
          name: game.attributes.teamB.attributes.name,
          flagImg: game.attributes.teamB.attributes.flagImg
        },
        teamAScore: game.attributes.teamAScore,
        teamBScore: game.attributes.teamBScore,
        finished: game.attributes.finished
      });

      matrix[game.id] = {};

      for (let bet of bets) {
        if (bet.attributes.game.id === game.id) {
          let user = bet.attributes.user;
          if (matrix[game.id][user.id]) {
            if (!matrix[game.id][user.id].flag) {
              matrix[game.id][user.id].flag = Math.sign(game.attributes.teamAScore - game.attributes.teamBScore) ===
                Math.sign(bet.attributes.teamAScore - bet.attributes.teamBScore);
              matrix[game.id][user.id].teamAScore = bet.attributes.teamAScore;
              matrix[game.id][user.id].teamBScore = bet.attributes.teamBScore;
            }
          } else {
            matrix[game.id][user.id] = {};
            if (bettingBook.attributes.phase.attributes.withScore) {
              matrix[game.id][user.id].flag = game.attributes.teamAScore === bet.attributes.teamAScore
                && game.attributes.teamBScore === bet.attributes.teamBScore;
            } else {
              matrix[game.id][user.id].flag = Math.sign(game.attributes.teamAScore - game.attributes.teamBScore) ===
                Math.sign(bet.attributes.teamAScore - bet.attributes.teamBScore);
            }
            matrix[game.id][user.id].teamAScore = bet.attributes.teamAScore;
            matrix[game.id][user.id].teamBScore = bet.attributes.teamBScore;
          }
        }
      }
    }

    scoreTable.games = sgames;

    let users = [];
    let user = {
      id: '0'
    };
    for (let bet of bets) {
      if (bet.attributes.user.id !== user.id) {
        user = {
          id: bet.attributes.user.id,
          name: bet.attributes.user.attributes.username,
          hits: [],
          totalHits: 0
        };
        users.push(user);
        for (let game of games) {
          user.hits.push(matrix[game.id][bet.attributes.user.id]);
          if (game.attributes.finished && matrix[game.id][bet.attributes.user.id].flag) {
            user.totalHits++;
          }
        }
      }
    }

    users.sort((a, b) => {
      return b.totalHits - a.totalHits;
    });

    scoreTable.users = users;

    return scoreTable;
  },

  generateValidBetsSummary(users, bets) {
    let nusers = [];

    for (let user of users) {
      nusers.push({
        id: user.id,
        name: user.attributes.username,
        valid: true,
        withBet: false
      });
    }

    for (let bet of bets) {
      for (let user of nusers) {
        if (user.id === bet.attributes.user.id) {
          user.valid &= bet.attributes.valid;
          if (bet.attributes.teamAScore !== undefined) {
            user.withBet = true;
          }
        }
      }
    }

    nusers = nusers.filter((x) => {
      return x.withBet;
    });

    nusers.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 1;
    });

    return nusers;
  }
}