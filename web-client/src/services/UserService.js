import Parse from 'parse';

class UserService {
  static logIn(username, password) {
    return Parse.User.logIn(username, password);
  }

  static validateBets(bettingBookId, userId, valid) {
    return Parse.Cloud.run('validateBets', { bettingBookId, userId, valid });
  }
};

export default UserService;