let parse = require('parse/node');
parse.initialize('MundiazGol');
parse.serverURL = 'http://localhost:1337/parse';

let Phase = parse.Object.extend('Phase');

let groupPhase = new Phase();
groupPhase.set('name', 'Fase de grupos');
groupPhase.set('withScore', false);
groupPhase.set('withDouble', true);

let finalEight = new Phase();
finalEight.set('name', 'Octavos de final');
finalEight.set('withScore', false);
finalEight.set('withDouble', true);

let finalFour = new Phase();
finalFour.set('name', 'Cuartos de final');
finalFour.set('withScore', false);
finalFour.set('withDouble', true);

let semiFinals = new Phase();
semiFinals.set('name', 'Semifinales');
semiFinals.set('withScore', true);
semiFinals.set('withDouble', false);

let finals = new Phase();
finals.set('name', 'Finales');
finals.set('withScore', true);
finals.set('withDouble', false);

parse.Object.saveAll([
  groupPhase,
  finalEight,
  finalFour,
  semiFinals,
  finals
]).then(() => {
  console.log('done');
}).catch((error) => {
  console.log(error);
});