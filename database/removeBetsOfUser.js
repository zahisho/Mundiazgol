let parse = require('parse/node');

parse.initialize('MundiazGol');
parse.serverURL = 'http://10.0.0.10:1337/parse';

let username = 'mfati';

let qu = new parse.Query(parse.User);

qu.equalTo('username', username);

qu.first().then((u) => {
  let qb = new parse.Query('Bet');
  qb.equalTo('user', u);
  qb.count().then((limit) => {
    qb.limit(limit);
    return qb.find().then((bets) => {
      let qw = new parse.Query('WinnerBet');

      qw.equalTo('user', u);

      return qw.find().then((ws) => {
        console.log('removing bets: ', bets.length);
        console.log('removing winners: ', ws.length);

        return Promise.all([
          parse.Object.destroyAll(bets),
          parse.Object.destroyAll(ws)
        ]).then(() => {
          console.log('done');
        });
      });
    });
  });
}).catch((error) => {
  console.log(error);
});