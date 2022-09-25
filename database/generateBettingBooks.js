let parse = require('parse/node');
parse.initialize('MundiazGol');
parse.serverURL = 'http://localhost:1337/parse';

let fs = require('fs');

let baseDir = ''

fs.readFile(baseDir + '/fixture.csv', (error, data) => {
  if (error) {
    console.log(error);
    return error;
  }

  let BettingBook = parse.Object.extend('BettingBook');
  let Game = parse.Object.extend('Game');
  let qp = new parse.Query('Phase');
  let qt = new parse.Query('Team');

  Promise.all([qp.find(), qt.find()]).then((values) => {
    let promises = [];

    let phases = values[0];
    let teams = values[1];
    let lines = data.toString().split('\n').slice(1);
    let phase;
    let bettingBook;
    let initDate;
    let endDate = new Date(2018, 5, 1);
    for (let line of lines) {
      if (line !== '') {
        let sp = line.split(',');
        let spD = sp[0].split('/');
        let date = new Date(Number.parseInt(spD[2]), Number.parseInt(spD[1]) - 1, Number.parseInt(spD[0]));
        let hours = Number.parseInt(sp[1].split(':')[0]);
        date.setHours(hours);

        if (sp[4] === 'x') {
          for (let ph of phases) {
            if (ph.attributes.name === sp[5]) {
              phase = ph;
              break;
            }
          }
          initDate = endDate;
          endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          bettingBook = new BettingBook();

          bettingBook.set('phase', phase);
          bettingBook.set('initDate', initDate);
          bettingBook.set('endDate', endDate);
          bettingBook.set('active', true);

          promises.push(bettingBook.save());
        }
        let teamA;
        let teamB;

        if (sp[2] !== '') {
          for (let team of teams) {
            if (team.attributes.name === sp[2]) {
              teamA = team;
              break;
            }
          }
          for (let team of teams) {
            if (team.attributes.name === sp[3]) {
              teamB = team;
              break;
            }
          }
        }

        let game = new Game();

        game.set('bettingBook', bettingBook);
        game.set('finished', false);
        game.set('teamA', teamA);
        game.set('teamB', teamB);
        game.set('teamAScore', 0);
        game.set('teamBScore', 0);
        game.set('date', date);

        promises.push(game.save());
      }
    }

    return Promise.all(promises).then(() => {
      console.log('done');
    });
  }).catch((error) => {
    console.log(error);
  });
});