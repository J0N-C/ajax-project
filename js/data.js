/* exported savedFacts */
var savedFacts = {
  'temp fact': []
};

window.addEventListener('beforeunload', function (event) {
  var savedFactsJSON = JSON.stringify(savedFacts);
  this.localStorage.setItem('saved-facts', savedFactsJSON);
});

var previousSaves = localStorage.getItem('saved-facts');
if (previousSaves !== null) {
  savedFacts = JSON.parse(previousSaves);
}
