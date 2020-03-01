class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  findUserTrips(userId) {
    return this.tripData.filter(tripData => {
      return tripData.userID === userId;
    })
  }

  calculateTotalSpentOnTrips(destinations, userId) {
    const userTrips = this.findUserTrips(userId);
    return userTrips.reduce((totalCost, userTrip) => {
      let userDestination = destinations.find(destination => {
        return destination.id === userTrip.destinationID
      });
      let lodgingCost = userDestination.estimatedLodgingCostPerDay * userTrip.duration * userTrip.travelers;
      let travelCost = userDestination.estimatedFlightCostPerPerson * userTrip.travelers;
      // console.log(lodgingCost, travelCost);
      return totalCost + lodgingCost + travelCost;
    }, 0)
  }
}

module.exports = Trip;
