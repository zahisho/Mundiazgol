
module.exports = {
  getUserById(userId) {
    let query = new Parse.Query(Parse.User);

    return query.get(userId);
  },

  getAllUsers() {
    let query = new Parse.Query(Parse.User);

    query.ascending('username');

    return query.find();
  }
}