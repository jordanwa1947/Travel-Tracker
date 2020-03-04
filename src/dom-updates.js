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
    $('#login-form-sect').toggleClass('hidden');
    $('body').toggleClass('login-image');
  },

  insertTotalSpentOnTrips: (totalSpentOnTrips) => {
    $('#total-spent-on-trips')[0].innerText = `Total Spent On Trips: ${totalSpentOnTrips}`
  },

  insertUserTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <div class="trip-card">
          <img src="${trip.destination.image}" alt="${trip.destination.alt}" />
          <h3>${trip.destination.destination}</h3>
          <p>Date: ${trip.date}</p>
          <p class="trip-status">Status: ${trip.status}</p>
          <p>${trip.duration} Days</p>
          <div id="${trip.id}">
            <button class="deny-trip-button">Delete</button>
          </div>
        </div>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `
      <section id="trips-list-container" class="trips-container">
        ${tripsHTML}
      </section>`;
  },

  insertAgentTripsList: (trips) => {
    const tripsHTML = trips.reduce((tripListHTML, trip) => {
      tripListHTML += `
        <div class="trip-card">
          <img src="${trip.destination.image}" alt="${trip.destination.alt}" />
          <h3>${trip.destination.destination}</h3>
          <p>Date: ${trip.date}</p>
          <p class="trip-status">Status: ${trip.status}</p>
          <p>${trip.duration} Days</p>
          <div id="${trip.id}">
            <button class="approve-trip-button">Approve</button>
            <button class="deny-trip-button">Deny</button>
          </div>
        </div>`
      return tripListHTML;
    }, ``);
    $('#trips-list')[0].innerHTML = `
    <section id="trips-list-container" class="trips-container">
      ${tripsHTML}
    </section>`;
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
      <label for="duration-field">Duration:
        <input id="duration-field" type="number">
      </label>
      <label for="date-field">Date:
        <input id="date-field" type="date">
      </label>
      <label for="travelers-field">Travelers:
        <input id="travelers-field" type="number">
      </label>
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

  insertNewTrip: (trip, destination) => {
    const tripHTML = `
    <div class="trip-card">
      <img src="${destination.image}" alt="${destination.alt}" />
      <h3>${destination.destination}</h3>
      <p>Date: ${trip.date}</p>
      <p class="trip-status">Status: ${trip.status}</p>
      <p>${trip.duration} Days</p>
      <div id="${trip.id}">
        <button class="deny-trip-button">Deny</button>
      </div>
    </div>`
    $('#trips-list').prepend(tripHTML);
  },

  insertAgencyProfit: (profit) => {
    $('#total-profit-on-trips')[0].innerText = `Total Profit: ${profit}`;
  },

  insertNumberOfUserOnTripsToday: (numberOfUsersOnTrips) => {
    $('#numb-of-users-on-trips-today')[0].innerText = `Number Of Users On Trips: ${numberOfUsersOnTrips}`
  },

  insertUserSearch: (user) => {
    $('#user-search-section').removeClass('hidden');
    $('#user-search-section')[0].innerHTML = `
      <form>
        <input id="user-search-field" type="text" />
        <button class="user-search-button" type="button">Search</button>
      </form>`
  },

  insertAllUsers: (users) => {
    const userList = users.reduce((usersHTML, user) => {
      usersHTML += `
      <div id="${user.id}">
        <h3>${user.name}</h3>
        <p>${user.travelerType}</p>
        <button class="view-trips-button" type="button">View Trips</button>
      </div>
      `
      return usersHTML
    }, ``)
    $('#user-search-section').append(userList);
  }
}
