
module.exports = {
  getGamesOfBettingBook(bettingBook) {
    let query = new Parse.Query('Game');

    query.equalTo('bettingBook', bettingBook);

    query.ascending('date');

    query.include('teamA');
    query.include('teamB');

    return query.find();
  },

  getGameById(id) {
    let query = new Parse.Query('Game');

    return query.get(id);
  }
}