let parse = require('parse/node');
parse.initialize('MundiazGol');
parse.serverURL = 'http://localhost:1337/parse';

let Team = parse.Object.extend('Team');

let fs = require('fs');

fs.readFile('teams', (error, data) => {
  let lines = data.toString().split('\n');

  let promises = [];

  for (let i = 0; i < lines.length - 1; i++) {
    let ll = lines[i].split(',');

    let nTeam = new Team();

    nTeam.set('name', ll[0]);
    nTeam.set('flagImg', ll[1] + '.png');
    nTeam.set('PJ', 0);
    nTeam.set('G', 0);
    nTeam.set('E', 0);
    nTeam.set('P', 0);
    nTeam.set('GF', 0);
    nTeam.set('GC', 0);
    nTeam.set('DG', 0);
    nTeam.set('Pts', 0);

    promises.push(nTeam.save());
  }

  Promise.all(promises)
    .then(() => {
      console.log('done');
    }).catch((error) => {
      console.log(error);
    });
});