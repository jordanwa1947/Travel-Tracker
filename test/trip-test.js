import chai from 'chai';
const expect = chai.expect;

const Trip = require('../src/trip.js');

describe('Trip Class', function() {
  let tripsData;
  let destinations;
  beforeEach(function() {
    tripsData = [
      {"id":1,"userID":43,"destinationID":49,"travelers":1,"date":"2019/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":2,"userID":35,"destinationID":14,"travelers":5,"date":"2020/10/04","duration":18,"status":"pending","suggestedActivities":[]},
      {"id":3,"userID":3,"destinationID":49,"travelers":4,"date":"2020/05/22","duration":17,"status":"pending","suggestedActivities":[]},
      {"id":4,"userID":43,"destinationID":14,"travelers":2,"date":"2020/02/25","duration":10,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":42,"destinationID":14,"travelers":3,"date":"2020/04/30","duration":18,"status":"approved","suggestedActivities":[]},
      {"id":6,"userID":29,"destinationID":14,"travelers":3,"date":"2020/06/29","duration":9,"status":"approved","suggestedActivities":[]}
    ]

    destinations = [
      {"id":49, "destination":"Lima, Peru", "estimatedLodgingCostPerDay":70, "estimatedFlightCostPerPerson":400, "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
      {"id":14, "destination":"My House", "estimatedLodgingCostPerDay":30, "estimatedFlightCostPerPerson":100, "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"}
    ]
  });

  it('should exist', function() {
    const trip = new Trip();
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should find trips with an id', function() {
    const trip = new Trip(tripsData);
    expect(trip.findUserTrips(43)).to.deep.eq([
      {
        "date": "2019/09/16",
        "destinationID": 49,
        "duration": 8,
        "id": 1,
        "status": "approved",
        "suggestedActivities": [],
        "travelers": 1,
        "userID": 43,
      },
      {
        "date": "2020/02/25",
        "destinationID": 14,
        "duration": 10,
        "id": 4,
        "status": "approved",
        "suggestedActivities": [],
        "travelers": 2,
        "userID": 43
      }
    ])
  })

  it('should be able to calculate the total a user has spent on trips', function() {
    const tripCost = new Trip(tripsData).calculateTotalSpentOnTrips(destinations, 43);
    expect(tripCost).to.eq(1936);
  });

  it('should calculate the total spent on all trips if no user id is given', function() {
    const tripCost = new Trip(tripsData).calculateTotalSpentOnTrips(destinations);
    expect(tripCost).to.eq(15785);
  });

  it('should be able to find pending trip requests for an agent', function() {
    const pendingTrips = new Trip(tripsData).findTripsByStatus('pending');
    expect(pendingTrips).to.deep.eq([
      {
        "date": "2020/10/04",
        "destinationID": 14,
        "duration": 18,
        "id": 2,
        "status": "pending",
        "suggestedActivities": [],
        "travelers": 5,
        "userID": 35,
      },
      {
        "date": "2020/05/22",
        "destinationID": 49,
        "duration": 17,
        "id": 3,
        "status": "pending",
        "suggestedActivities": [],
        "travelers": 4,
        "userID": 3,
      }
    ]);
  })
});
