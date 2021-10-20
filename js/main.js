const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemter'];
const $dailyFact = document.querySelector('#daily-fact');
const $dateLabel = document.querySelector('#date-label');
const $currentDate = document.querySelector('#current-date');
const $getNewFact = document.querySelector('#new-fact');
const $dateModal = document.querySelector('#date-modal');
const $monthSelector = document.querySelector('#month-select');
const $daySelector = document.querySelector('#day-select');
const $viewNewDate = document.querySelector('#view-new-date');
const $submitNewDate = document.querySelector('#submit-new-date');
const $closeDateSelect = document.querySelector('#close-date-select');
const factRequest = new XMLHttpRequest();
var getLimit = 0;
var today = dateToday();
var otherDate = [...today];
var factToday;
getFact(today);

/* listener for loading fact, if fact is the same, retry loading up to 3 times */
factRequest.addEventListener('load', function () {
  factToday = JSON.parse(factRequest.response);
  if ($dailyFact.textContent === factToday.text && getLimit < 4) {
    getLimit++;
    return getFact(otherDate);
  }
  $dailyFact.textContent = factToday.text;
  getLimit = 0;
});

/* generate new fact */
$getNewFact.addEventListener('click', function () {
  getFact(otherDate);
});

/* open view new date modal, auto populate selection with today */
$viewNewDate.addEventListener('click', function (event) {
  $dateModal.className = 'modal';
  for (let i = 0; i < $monthSelector.children.length; i++) {
    if (parseInt($monthSelector.children[i].getAttribute('value')) === today[0]) {
      $monthSelector.children[i].setAttribute('selected', 'selected');
    }
  }
  populateDays(checkDaysInMonth(today[0]));
  for (let i = 0; i < $daySelector.children.length; i++) {
    if (parseInt($daySelector.children[i].getAttribute('value')) === today[1]) {
      $daySelector.children[i].setAttribute('selected', 'selected');
    }
  }
});

/* submit new date for new fact of day */
$submitNewDate.addEventListener('click', function (event) {
  event.preventDefault();
  otherDate[0] = parseInt($monthSelector.value);
  otherDate[1] = parseInt($daySelector.value);
  $dateModal.className = 'hidden';
  $dateLabel.textContent = 'VIEWING DATE';
  if (otherDate[0] === today[0] && otherDate[1] === today[1]) {
    $dateLabel.textContent = 'TODAY\'S DATE';
  }
  getFact(otherDate);
});

/* cancel and close new date modal */
$closeDateSelect.addEventListener('click', function (event) {
  event.preventDefault();
  $dateModal.className = 'hidden';
});

/* auto populate date selector days with days of month */
$monthSelector.addEventListener('change', function (event) {
  populateDays(checkDaysInMonth(parseInt($monthSelector.value)));
});

function checkDaysInMonth(value) {
  let dayCount;
  switch (value) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      dayCount = 31;
      break;
    case 2:
      dayCount = 29;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      dayCount = 30;
      break;
  }
  return dayCount;
}

function populateDays(days) {
  const currentDayCount = $daySelector.length;
  if (days - currentDayCount === 0) return;
  if (days - currentDayCount > 0) {
    for (let i = (currentDayCount + 1); i <= days; i++) {
      const newDay = document.createElement('option');
      newDay.setAttribute('value', i);
      newDay.textContent = i;
      $daySelector.appendChild(newDay);
    }
  } else if (days - currentDayCount < 0) {
    const diff = currentDayCount - days;
    for (let i = 0; i < diff; i++) {
      $daySelector.lastChild.remove();
    }
  }
}

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
