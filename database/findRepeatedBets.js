let parse = require('parse/node');

parse.initialize('MundiazGol');
parse.serverURL = 'http://10.0.0.10:1337/parse';

let qb = new parse.Query('Bet');
qb.include('game');
qb.include('user');

qb.count().then((limit) => {
  qb.limit(limit);
  return qb.find().then((bets) => {
    let map = {};

    for (let bet of bets) {
      if (!map[bet.attributes.user.id]) {
        map[bet.attributes.user.id] = {};
      }
      if (!map[bet.attributes.user.id][bet.attributes.game.id]) {
        map[bet.attributes.user.id][bet.attributes.game.id] = {}
      }
      if (map[bet.attributes.user.id][bet.attributes.game.id][bet.attributes.doubleBet]) {
        console.log('---------------------------------');
        console.log('BetId: ', map[bet.attributes.user.id][bet.attributes.game.id][bet.attributes.doubleBet]);
        console.log('User: ', bet.attributes.user.attributes.username);
        console.log('Game: ', bet.attributes.game.id);
      }
      map[bet.attributes.user.id][bet.attributes.game.id][bet.attributes.doubleBet] = bet.id;
    }
  });
}).catch((error) => {
  console.log(error);
})