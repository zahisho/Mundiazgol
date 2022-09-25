let parse = require('parse/node');

parse.initialize('MundiazGol');
parse.serverURL = 'http://10.0.0.10:1337/parse';

let qu = new parse.Query(parse.User);

qu.count().then((limit) => {
  qu.limit(limit);

  return qu.find().then((users) => {
    for (let u of users) {
      console.log(u.attributes.username);
    }
  });
}).catch((error) => {
  console.log(error);
});