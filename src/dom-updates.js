import $ from 'jquery'

export default {
  insertUserMessage: (user) => {
    $("#welcome-user-name")[0].innerText = `Welcome ${user.name}`;
    $("#welcome-traveler-type")[0].innerText = user.travelerType;
  }
}
