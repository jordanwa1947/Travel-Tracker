import chai from 'chai';
const expect = chai.expect;

const User = require('../src/user.js');

describe('User Class', function() {
  let allUsersData;

  beforeEach(function() {
    allUsersData = [
      {"id":1,"name":"Ham Leadbeater","travelerType":"relaxer"},
      {"id":2,"name":"Rachael Vaughten","travelerType":"thrill-seeker"},
      {"id":3,"name":"Sibby Dawidowitsch","travelerType":"shopper"},
      {"id":4,"name":"Leila TheHam","travelerType":"photographer"}
    ]
  })

  it('should exist', function() {
    const user = new User(allUsersData[0]);
    expect(user).to.be.an.instanceof(User);
  });


  it('should find users matching a search query', function() {
    const searchedUsers = User.searchUsersByName(allUsersData, 'ham');
    expect(searchedUsers).to.deep.eq([
      {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer",
      },
      {
        "id": 4,
        "name": "Leila TheHam",
        "travelerType": "photographer",
      }
    ]);
  })
})
