class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  findUserTrips(userId) {
    return this.tripData.filter(tripData => {
      return tripData.userID === userId;
    })
  }
}

module.exports = Trip;
