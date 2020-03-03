class User {
  constructor(userData) {
    this.id = userData.id;
  }

  static searchUsersByName(allUsersData, queryString) {
    const regEx = new RegExp(queryString.toLowerCase())
    return allUsersData.filter(userData => {
      return regEx.test(userData.name.toLowerCase());
    })
  }
}

module.exports = User;
