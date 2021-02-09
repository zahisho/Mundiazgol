
module.exports = {
  generateWinnerBet(user, bettingBook, team) {
    let wb = new (Parse.Object.extend('WinnerBet'))();

    wb.set('user', user);
    wb.set('bettingBook', bettingBook);
    wb.set('team', team);

    return wb.save();
  },

  updateWinnerBet(winnerBet, team) {
    winnerBet.set('team', team);

    return winnerBet.save();
  },

  getWinnerBet(bettingBook, user) {
    let query = new Parse.Query('WinnerBet');

    query.equalTo('bettingBook', bettingBook);
    query.equalTo('user', user);

    query.include('team');

    return query.first();
  },

  getWinnerBetById(winnerBetId) {
    let query = new Parse.Query('WinnerBet');

    return query.get(winnerBetId);
  }
}