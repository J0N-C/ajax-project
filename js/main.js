const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'Decemter'];
const $dailyFact = document.querySelector('#daily-fact');
const $currentDate = document.querySelector('#current-date');
const $getNewFact = document.querySelector('#new-fact');
const $dateModal = document.querySelector('#date-modal');
const $monthSelector = document.querySelector('#month-select');
const $daySelector = document.querySelector('#day-select');
const $viewNewDate = document.querySelector('#view-new-date');

const $closeDateSelect = document.querySelector('#close-date-select');
const factRequest = new XMLHttpRequest();
var getLimit = 0;
var today = dateToday();
var factToday;
getFact(today);
populateDays(31);

factRequest.addEventListener('load', function () {
  factToday = JSON.parse(factRequest.response);
  if ($dailyFact.textContent === factToday.text && getLimit < 4) {
    getLimit++;
    return getFact(today);
  }
  $dailyFact.textContent = factToday.text;
  getLimit = 0;
});

$getNewFact.addEventListener('click', function () {
  getFact(today);
});

$viewNewDate.addEventListener('click', function (event) {
  $dateModal.className = 'modal';
});

$closeDateSelect.addEventListener('click', function (event) {
  event.preventDefault();
  $dateModal.className = 'hidden';
});

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

$monthSelector.addEventListener('change', function (event) {
  let dayCount = 31;
  switch ($monthSelector.value) {
    case '1':
    case '3':
    case '5':
    case '7':
    case '8':
    case '10':
    case '12':
      dayCount = 31;
      break;
    case '2':
      dayCount = 29;
      break;
    case '4':
    case '6':
    case '9':
    case '11':
      dayCount = 30;
      break;
  }
  populateDays(dayCount);
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
