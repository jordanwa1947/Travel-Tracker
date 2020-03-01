// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './dom-updates.js'

import Trip from './trip';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

// An e xample of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let user;

domUpdates.insertLoginForm();

$('#login-button').click(logUserIn);

function fetchUserInfo() {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/50')
    .then(response => response.json())
    .then(userData => {
      user = userData;
      domUpdates.insertUserMessage(user);
  });
}

function fetchTripsInfo() {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    .then(response => response.json())
    .then(tripData => {
      fetchDestinations(tripData)
    });
}

function fetchDestinations(tripData) {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    .then(response => response.json())
    .then(destinationsData => {
      const trips = new Trip(tripData.trips)
      const userTrips = trips.findUserTrips(50);
      const totalSpentOnTrips = trips.calculateTotalSpentOnTrips(destinationsData.destinations, 50);
      domUpdates.insertTripsList(userTrips, totalSpentOnTrips);
    });
}

function logUserIn() {
  const username = $('#username-input')[0].value
  const password = $('#password-input')[0].value
  if (username === 'traveler50' && password === 'travel2020') {
    domUpdates.removeLoginForm();
    fetchUserInfo();
    fetchTripsInfo();
  } else if (username === 'agency' && password === 'travel2020') {
    domUpdates.removeLoginForm();
    fetchUserInfo();
    fetchTripsInfo();
  }
}
