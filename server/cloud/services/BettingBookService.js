
module.exports = {
  getBettingBook(bettingBookId) {
    let query = new Parse.Query('BettingBook');

    query.include('phase');

    return query.get(bettingBookId);
  }
}