import Parse from 'parse';

class BettingBookService {
  static loadBettingBooks() {
    let query = new Parse.Query('BettingBook');

    let today = new Date();

    query.lessThanOrEqualTo('initDate', today);
    query.ascending('endDate');

    return query.find();
  }

  static getBettingBook(bettingBookId) {
    return Parse.Cloud.run('getBettingBook', { bettingBookId });
  }

  static saveBettingBook(bettingBook) {
    return Parse.Cloud.run('saveBets', { bettingBook });
  }

  static getScoreTable(bettingBookId) {
    return Parse.Cloud.run('getScoreTable', { bettingBookId });
  }

  static getValidBetsSummary(bettingBookId) {
    return Parse.Cloud.run('getValidBetsSummary', { bettingBookId });
  }
}

export default BettingBookService;