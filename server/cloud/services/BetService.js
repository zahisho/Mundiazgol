
module.exports = {
  generateBetsForUserByGames(user, games, withDouble) {
    let Bet = Parse.Object.extend('Bet');
    let bets = [];
    for (let game of games) {
      let bet = new Bet();
      bet.set('game', game);
      bet.set('valid', false);
      bet.set('user', user);
      bet.set('doubleBet', false);

      bets.push(bet);
    }

    if (withDouble) {
      let extraBet = new Bet();
      extraBet.set('game', games[0]);
      extraBet.set('valid', false);
      extraBet.set('user', user);
      extraBet.set('doubleBet', true);
      bets.push(extraBet);
    }
    return Parse.Object.saveAll(bets);
  },

  getBetsByUser(user, games) {
    let query = new Parse.Query('Bet');

    query.equalTo('user', user);
    query.containedIn('game', games);

    query.include('game.teamA');
    query.include('game.teamB');
    query.include('game');

    return query.count().then((limit) => {
      query.limit(limit);
      return query.find();
    });
  },

  getBetsByIds(ids) {
    let query = new Parse.Query('Bet');

    query.containedIn('objectId', ids);

    return query.find();
  },

  getValidBets(games) {
    let query = new Parse.Query('Bet');

    query.containedIn('game', games);
    query.equalTo('valid', true);

    query.include('user');
    query.ascending('user');

    return query.count().then((limit) => {
      query.limit(limit);

      return query.find();
    });
  },

  getBetsByGames(games) {
    let query = new Parse.Query('Bet');

    query.containedIn('game', games);

    query.include('user');
    query.ascending('user');

    return query.count().then((limit) => {
      query.limit(limit);

      return query.find();
    });
  },

  setValid(bets, valid) {
    for (let bet of bets) {
      bet.set('valid', valid);
    }

    return Parse.Object.saveAll(bets);
  }
}