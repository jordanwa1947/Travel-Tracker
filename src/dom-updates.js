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
      </form>
      <button id="login-button" class="button" type="button">Login</button>`
  },

  removeLoginForm: () => {
    $('#login-form-sect')[0].innerHTML = ``;
  },

  insertTotalSpentOnTrips: (totalSpentOnTrips) => {
    $('#total-spent-on-trips')[0].innerText = `Total Spent On Trips: ${totalSpentOnTrips}`
  },

  insertUserTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <li>
          <span>Date: ${trip.date}</span>
          <span class="trip-status">Status: ${trip.status}</span>
          <span>${trip.duration} Days</span>
          <span id="${trip.id}">
            <button class="deny-trip-button">Delete</button>
          </span>
        </li>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `<ul id="trips-list-head">${tripsHTML}</ul>`;
  },

  insertAgentTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <li>
          <span>Date: ${trip.date}</span>
          <span class="trip-status">Status: ${trip.status}</span>
          <span>${trip.duration} Days</span>
          <span id="${trip.id}">
            <button class="approve-trip-button">Approve</button>
            <button class="deny-trip-button">Deny</button>
          </span>
        </li>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `<ul id="trips-list-head">${tripsHTML}</ul>`;
  },

  insertCreateTripForm: (destinations) => {
    const dropDownHTML = destinations.reduce((destinationsDropDown, destination) => {
      return destinationsDropDown + `
      <option value='${JSON.stringify(destination)}'>
        ${destination.destination}
      </option>`
    }, ``)
    $('#create-trip-section')[0].innerHTML = `
    <form class="create-trip-form">
      Duration: <input id="duration-field" type="number">
      Date: <input id="date-field" type="date">
      Travelers: <input id="travelers-field" type="number">
      <select id="destinations-drop-down">
        ${dropDownHTML}
      </select>
      <button id="create-trip-button" class="button" type="button">Add Trip</button>
    </form>
    <p id="estimated-cost"></p>`
  },

  insertEstimatedCost: (estimatedCost) => {
    $('#estimated-cost').empty();
    if (estimatedCost) {
      $('#estimated-cost')[0].innerText = `Estimated Cost: ${estimatedCost}`;
    }
  },

  insertNewTrip: (trip) => {
    const tripHTML = `
      <li>
        <span>Date: ${trip.date}</span>
        <span class="trip-status">Status: ${trip.status}</span>
        <span>${trip.duration} Days</span>
        <span id="${trip.id}">
          <button class="deny-trip-button">Delete</button>
        </span>
      </li>`
    $('#trips-list-head').prepend(tripHTML);
  },

  insertAgencyProfit: (profit) => {
    $('#total-profit-on-trips')[0].innerText = `Total Profit: ${profit}`;
  },

  insertNumberOfUserOnTripsToday: (numberOfUsersOnTrips) => {
    $('#numb-of-users-on-trips-today')[0].innerText = `Number Of Users On Trips: ${numberOfUsersOnTrips}`
  },

  insertUserSearch: (user) => {
    $('#user-search-section')[0].innerHTML = `
      <form>
        <input id="user-search-field" type="text" />
        <button class="user-search-button" type="button">Search</button>
      </form>
    `
  },

  insertAllUsers: (users) => {
    const userList = users.reduce((usersHTML, user) => {
      usersHTML += `
      <div id="${user.id}">
        <h3>${user.name}</h3>
        <p>${user.travelerType}</p>
        <button class="view-trips-button" type="button">View Trips</button>
      <div>
      `
      return usersHTML
    }, ``)
    $('#user-search-section').append(userList);
  }
}
