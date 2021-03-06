// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './dom-updates.js'

import Trip from './trip';
import User from './user';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

// An e xample of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/tropical-ocean-huts.jpg'

let user;

domUpdates.insertLoginForm();

$('#login-button').click(logUserIn);
$('#create-trip-section').click(createTripPostRequest);
$('#trips-list').click(deleteTripRequest);
$('#trips-list').click(approveTripRequest);
$('#create-trip-section').on('input', calculateEstimatedTripCost);
$('#user-search-section').click(findAndDisplayUsers);
$('#user-search-section').click(displayUserTrips);

async function displayUserTrips() {
  if (event.target.classList.contains('view-trips-button')) {
    const userID = Number.parseInt(event.target.parentElement.id);
    const userData = await fetchUserInfo(userID);
    user = new User(userData)
    fetchTripsInfo(getAndDisplayUserTrips)
  }
}

async function findAndDisplayUsers(event) {
  if (event.target.classList.contains('user-search-button')) {
    const allUsers = await fetchAllUsers();
    const query = $('#user-search-field')[0].value;
    const searchedUsers = User.searchUsersByName(allUsers, query);
    domUpdates.insertUserSearch();
    domUpdates.insertAllUsers(searchedUsers);
  }
}

function deleteTripRequest() {
  if (event.target.classList.contains('deny-trip-button')) {
    const tripId = event.target.parentElement.id;
    event.target.parentElement.parentElement.remove();
    const postBody = JSON.stringify({
      "id": Number.parseInt(tripId)
    });
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: postBody
    })
    .then(response => response.json())
    .then(responseValue => {

    })
    .catch(error => console.log(error.message))
  }
}

function approveTripRequest(event) {
  if (event.target.classList.contains('approve-trip-button')) {
    let tripId = event.target.parentElement.id;
    const tripElement = event.target.parentElement.parentElement
    tripElement.querySelector('.trip-status').innerText = 'Status: approved'
    const postBody = JSON.stringify({
      "id": Number.parseInt(tripId),
      "status": "approved",
    });
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: postBody
    })
    .then(response => response.json())
    .then(responseValue => {

    })
    .catch(error => console.log(error.message))
  }
}

function changeDateFormat(date) {
  const dateArray = date.split('-');
  const day = dateArray.pop();
  dateArray.splice(1, 0, day);
  return dateArray.join('/');
}

function createTripPostRequest(event) {
  const duration = $('#duration-field')[0].value;
  const date = $('#date-field')[0].value;
  const travelers = $('#travelers-field')[0].value;
  const destination = $('#destinations-drop-down')[0].value;
  if (event.target.id === 'create-trip-button' && duration && date && travelers && destination) {
    const destinationId = Number.parseInt(JSON.parse(destination).id);
    const postBody = JSON.stringify({
      "id": Date.now(),
      "userID": user.id,
      "destinationID": destinationId,
      "travelers": Number.parseInt(travelers),
      "date": changeDateFormat(date),
      "duration": Number.parseInt(duration),
      "status": "pending",
      "suggestedActivities": []
    });
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: postBody
    })
    .then(response => response.json())
    .then(newTripData => {
      const parsedDestination = JSON.parse(destination);
      domUpdates.insertNewTrip(newTripData.newResource, parsedDestination);
    })
  }
}

function calculateEstimatedTripCost() {
  const duration = $('#duration-field')[0].value;
  const date = $('#date-field')[0].value;
  const travelers = $('#travelers-field')[0].value;
  const destination = $('#destinations-drop-down')[0].value;
  if (duration && date && travelers && destination) {
    const destinationJSON = JSON.parse(destination);
    const lodgingCost = destinationJSON.estimatedLodgingCostPerDay * duration * travelers;
    const travelCost = destinationJSON.estimatedFlightCostPerPerson * travelers;
    const estimatedCost = lodgingCost + travelCost
    domUpdates.insertEstimatedCost(estimatedCost + estimatedCost * 0.1);
  } else {
    domUpdates.insertEstimatedCost('');
  }
}

function fetchAllUsers() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    .then(response => response.json())
    .then(usersData => {
      return usersData.travelers;
    })
    .catch(error => console.log(error.message))
}

function fetchUserInfo(userId) {
  return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${userId}`)
    .then(response => response.json())
    .then(userData => {
      domUpdates.insertUserMessage(userData);
      return userData
    })
    .catch(error => console.log(error.message))
}

async function fetchTripsInfo(displayTripsFunction) {
  const destinationsData = await fetchDestinations();
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    .then(response => response.json())
    .then(tripData => {
      displayTripsFunction(tripData, destinationsData)
    })
    .catch(error => console.log(error.message))
}

function fetchDestinations() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    .then(response => response.json())
    .then(destinationsData => {
      return destinationsData.destinations;
    })
    .catch(error => console.log(error.message))
}

function pairTripsAndDestinations(trips, destinations) {
  destinations.forEach(destination => {
    trips.forEach(trip => {
      if (trip.destinationID === destination.id) trip.destination = destination;
    })
  })
  return trips;
}

function getAndDisplayUserTrips(tripsData, destinationsData) {
  const trip = new Trip(tripsData.trips)
  const userTrips = trip.filterTripsByField('userID', user.id);
  const totalSpentOnTrips = trip.calculateTotalSpentOnTrips(destinationsData, user.id);
  const agentFee = totalSpentOnTrips * 0.1
  const tripsAndDestinations = pairTripsAndDestinations(userTrips, destinationsData);
  domUpdates.insertUserTripsList(tripsAndDestinations);
  domUpdates.insertCreateTripForm(destinationsData);
  domUpdates.insertTotalSpentOnTrips(totalSpentOnTrips + agentFee);
}

function formatDate() {
  const date = new Date()
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  return date.getFullYear() + '/' + month + '/' + day;
}

function getAndDisplayAgentTrips(tripsData, destinationsData) {
  const trip = new Trip(tripsData.trips)
  const totalSpentOnTrips = trip.calculateTotalSpentOnTrips(destinationsData);
  const pendingTrips = trip.filterTripsByField('status', 'pending');
  const usersOnTripsToday = trip.findTripsHappeningCurrently();
  const tripsAndDestinations = pairTripsAndDestinations(pendingTrips, destinationsData);
  domUpdates.insertAgentTripsList(tripsAndDestinations);
  domUpdates.insertUserSearch();
  domUpdates.insertAgencyProfit(totalSpentOnTrips * 0.1);
  domUpdates.insertNumberOfUserOnTripsToday(usersOnTripsToday.length);
}

async function logUserIn() {
  const username = $('#username-input')[0].value
  const password = $('#password-input')[0].value
  const userID = Number.parseInt(username.slice(8));
  const withinRange = userID > 0 && userID <= 50;
  if (username.slice(0,8) === 'traveler' && password === 'travel2020' && withinRange) {
    domUpdates.removeLoginForm();
    const userData = await fetchUserInfo(userID);
    user = new User(userData)
    fetchTripsInfo(getAndDisplayUserTrips);
  } else if (username === 'agency' && password === 'travel2020') {
    domUpdates.removeLoginForm();
    fetchTripsInfo(getAndDisplayAgentTrips);
  }
}
