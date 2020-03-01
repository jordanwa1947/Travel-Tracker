import chai from 'chai';
const expect = chai.expect;

const Trip = require('../src/trip.js');

describe('Trip Class', function() {
  let tripsData;
  beforeEach(function() {
    tripsData = [
      {"id":1,"userID":43,"destinationID":49,"travelers":1,"date":"2019/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2020/10/04","duration":18,"status":"pending","suggestedActivities":[]},
      {"id":3,"userID":3,"destinationID":22,"travelers":4,"date":"2020/05/22","duration":17,"status":"pending","suggestedActivities":[]},
      {"id":4,"userID":43,"destinationID":14,"travelers":2,"date":"2020/02/25","duration":10,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":42,"destinationID":29,"travelers":3,"date":"2020/04/30","duration":18,"status":"approved","suggestedActivities":[]},
      {"id":6,"userID":29,"destinationID":35,"travelers":3,"date":"2020/06/29","duration":9,"status":"approved","suggestedActivities":[]}
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
});
