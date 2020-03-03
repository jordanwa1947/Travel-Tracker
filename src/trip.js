class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  filterTripsByField(field, searchValue) {
    return this.tripData.filter(tripData => {
      return tripData[field] === searchValue;
    });
  }

  tripHappening(unixTime, trip) {
    const tripLengthInMilliseconds = trip.duration * 86400000;
    const tripStartUnixTime = new Date(trip.date).getTime();
    const endOfTrip = tripStartUnixTime + tripLengthInMilliseconds;
    return tripStartUnixTime <= unixTime && endOfTrip > unixTime;
  }

  findTripsHappeningCurrently() {
    const unixTime = Date.now();
    return this.tripData.filter(tripData => {
      return this.tripHappening(unixTime, tripData);
    })
  }

  calculateTotalSpentOnTrips(destinations, userId) {
    const userTrips = userId ? this.filterTripsByField('userID', userId) : this.tripData;
    const totalTripCost =  userTrips.reduce((totalCost, userTrip) => {
      let userDestination = destinations.find(destination => {
        return destination.id === userTrip.destinationID
      });
      if (userDestination) {
        let lodgingCost = userDestination.estimatedLodgingCostPerDay * userTrip.duration * userTrip.travelers;
        let travelCost = userDestination.estimatedFlightCostPerPerson * userTrip.travelers;
        return totalCost + lodgingCost + travelCost;
      }
      return totalCost;
    }, 0)
    return totalTripCost;
  }
}

module.exports = Trip;
