const $dailyFact = document.querySelector('#daily-fact');
const $currentDate = document.querySelector('#current-date');
const factRequest = new XMLHttpRequest();
var today = dateToday();
var factToday;

getFact(today);

function dateToday() {
  const fullDate = [];
  const today = new Date();
  fullDate.push(today.getMonth() + 1);
  fullDate.push(today.getDate());
  return fullDate;
}

function monthsFormat(monthNum) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'Decemter'];
  return monthNames[monthNum - 1];
}

function getFact(date) {
  const month = date[0];
  const day = date[1];
  $currentDate.textContent = `${monthsFormat(month - 1)} ${day}`;
  factRequest.open('GET', `http://numbersapi.com/${month}/${day}/date?json`);
  factRequest.send();
}

factRequest.addEventListener('load', function () {
  factToday = JSON.parse(factRequest.response);
  $dailyFact.textContent = factToday.text;
});
