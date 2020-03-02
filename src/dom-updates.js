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

  insertTotalSpentOnTrips: (totalSpentOnTrips) => {
    $('#total-spent-on-trips')[0].innerText = `Total Spent On Trips: ${totalSpentOnTrips}`
  },

  insertTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <li>
          <span>Date: ${trip.date}</span>
          <span>Status: ${trip.status}</span>
          <span>${trip.duration} Days</span>
        </li>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `<ul>${tripsHTML}</ul>`;
  },

  insertCreateTripForm: (destinations) => {
    const dropDownHTML = destinations.reduce((destinationsDropDown, destination) => {
      return destinationsDropDown + `
      <option value="${destination.id}">
        ${destination.destination}
      </option>`
    }, ``)
    $('#create-trip-section')[0].innerHTML = `
    <form class="create-trip-form">
      Duration: <input type="number">
      Date: <input type="date">
      Travelers: <input type="number">
      <select>
        ${dropDownHTML}
      </select>
    </form>`
  }
}
