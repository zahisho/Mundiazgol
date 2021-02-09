import Parse from 'parse';

class TeamService {
  static getActiveTeams() {
    let query = new Parse.Query('Team');

    query.equalTo('active', true);
    query.ascending('name');

    return query.find();
  }
};

export default TeamService;
