let TeamService = require('./TeamService');

module.exports = {
  async generateWinnerBet(user, bettingBook, team) {
    let query = new Parse.Query('WinnerBet');

    query.equalTo('bettingBook', bettingBook);
    query.equalTo('user', user);

    let winnerBet = await query.first();

    if (winnerBet && winnerBet.get('team')) {
      return winnerBet;
    }

    if (team === undefined) {
      team = (await TeamService.getActiveTeams())[0];
    }

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

  async getWinnerBet(bettingBook, user) {
    let query = new Parse.Query('WinnerBet');

    query.equalTo('bettingBook', bettingBook);
    query.equalTo('user', user);

    query.include('team');

    let winnerBet = await query.first();
    if (winnerBet === undefined) {
      winnerBet = await this.generateWinnerBet(user, bettingBook);
    }
    if (winnerBet.get('team') === undefined) {
      let team = await TeamService.getActiveTeams();
      winnerBet.set('team', team);
      await winnerBet.save()
    }
    return winnerBet;
  },

  getWinnerBetById(winnerBetId) {
    let query = new Parse.Query('WinnerBet');

    return query.get(winnerBetId);
  }
}