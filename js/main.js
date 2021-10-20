const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'Decemter'];
const $dailyFact = document.querySelector('#daily-fact');
const $currentDate = document.querySelector('#current-date');
const $getNewFact = document.querySelector('#new-fact');
const factRequest = new XMLHttpRequest();
var today = dateToday();
var factToday;
getFact(today);

factRequest.addEventListener('load', function () {
  factToday = JSON.parse(factRequest.response);
  if ($dailyFact.textContent === factToday.text) {
    return getFact(today);
  }
  $dailyFact.textContent = factToday.text;
});

$getNewFact.addEventListener('click', function () {
  getFact(today);
});

function dateToday() {
  const fullDate = [];
  const today = new Date();
  fullDate.push(today.getMonth() + 1);
  fullDate.push(today.getDate());
  return fullDate;
}

function getFact(date) {
  const month = date[0];
  const day = date[1];
  $currentDate.textContent = `${monthNames[month - 1]} ${day}`;
  factRequest.open('GET', `http://numbersapi.com/${month}/${day}/date?json`);
  factRequest.send();
}
