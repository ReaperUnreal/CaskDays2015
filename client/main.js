var beerList = [];

var LOCAL_STORAGE_KEY = 'caskdays2015chosen';

$.get('http://localhost:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
//$.get('http://159.203.19.50:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
	console.debug('got data: ', data);
	beerList = data;
	createTable(data);
}, 'json');
git@github.com:ReaperUnreal/CaskDays2015.git

function saveListToLocalStorage() {
	// space delimited string because why not
	var arrChosen = _.filter(beerList, 'chosen');
	var arrChosenIds = _.pluck(arrChosen, 'id');
	var chosenStr = _.reduce(arrChosenIds, function append(accum, val) {
		return accum + ' ' + val;
	}, '').trim();
	localStorage[LOCAL_STORAGE_KEY] = chosenStr;
}

function loadChosenFromLocalStorage() {
	var chosenStr = localStorage[LOCAL_STORAGE_KEY];
	if (! chosenStr) {
		return;
	}

	var arrChosenIds = chosenStr.split(' ');
	_.forEach(arrChosenIds, function assignChosen(id) {
		var beer = _.find(beerList, 'id', id|0);
		if (beer) {
			beer.chosen = true;
		}
	});
}
