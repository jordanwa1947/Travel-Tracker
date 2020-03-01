import $ from 'jquery'

export default {
  insertUserMessage: (user) => {
    $("#welcome-user-name")[0].innerText = `Welcome ${user.name}`;
    $("#welcome-traveler-type")[0].innerText = user.travelerType;
  },

  insertLoginForm: () => {
    $('#login-form-sect')[0].innerHTML = `
      <h1>Sign-In</h1>
      <form class="login-form">
        <label for="username-input">Username</label><br>
        <input id="username-input" type="text" id="username-input" name="username"><br>
        <label for="password-input">Password</label><br>
        <input id="password-input" type="text" name="password">
        <button id="login-button" class="button" type="button">Login</button>
      </form>`
  },

  removeLoginForm: () => {
    $('#login-form-sect')[0].innerHTML = ``;
  },

  insertTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <li>
          <span>Status: ${trip.status}</span>
          <span>Date: ${trip.date}</span>
          <span>${trip.duration} Days</span>
          <span>${trip.travelers}</span>
        </li>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `<ul>${tripsHTML}</ul>`;
  },

  insertTotalSpentOnTrips: (totalSpentOnTrips) => {
    $('#total-spent-on-trips')[0].innerText = `Total Spent on Trips: ${totalSpentOnTrips}`
  },

  insertAgencyProfit: (grossProfit) => {
    $('#total-profit-on-trips')[0].innerText = `Total Proft on Trips: ${grossProfit}`
  },

  insertNumberOfUserOnTripsToday: (numberOfUserOnTripsToday) => {
    $('#numb-of-users-on-trips-today')[0].innerText = `Number of Users On Trips Today: ${numberOfUserOnTripsToday}`
  }
}
