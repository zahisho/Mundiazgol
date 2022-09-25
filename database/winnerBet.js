let parse = require('parse/node');

parse.initialize('MundiazGol');
parse.serverURL = 'http://mundiazgol.sytes.net/parse';

let q = new parse.Query('WinnerBet');
q.containedIn('team', ['FFQ3pyjoF5']);
q.ascending('user');
q.include('user');

q.find().then((wbs) => {
  let us = [];
  let u = { id: '' };

  for (let wb of wbs) {
    if (wb.attributes.user.id !== u.id) {
      u = {
        id: wb.attributes.user.id,
        name: wb.attributes.user.attributes.username,
        count: 0
      };
      us.push(u);
    }
    u.count++;
  }

  us = us.sort((a, b) => { return b.count - a.count; })
  console.log(us);
}).catch((error) => {
  console.log(error);
})
