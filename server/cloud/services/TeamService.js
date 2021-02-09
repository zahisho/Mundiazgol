
module.exports = {
  getActiveTeams() {
    let query = new Parse.Query('Team');

    query.equalTo('active', true);
    query.ascending('name');

    return query.find();
  },

  getTeam(teamId) {
    let query = new Parse.Query('Team');

    return query.get(teamId);
  }
}