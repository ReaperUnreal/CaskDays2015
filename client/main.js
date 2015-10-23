var beerList = [];

var LOCAL_STORAGE_KEY = 'caskdays2015chosen';

$.get('http://159.203.19.50:8081/beers', function gotData(data) {
	console.debug('got data: ', data);
	beerList = data;
	createTable(data);
}, 'json');

function createTable(beerList) {
	// update chosen
	loadChosenFromLocalStorage();

	// clear
	$('div#main').empty();

	// create a new table
	$('<table/>', {
		id: 'beerListTable'
	}).addClass('table table-hover tablesorter').appendTo('div#main');
	var table = $('#beerListTable');
	table.append('<thead><tr><th>Id</th><th>Name</th><th>Style</th><th>Region</th><th>Chosen</th></thead>');

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer, idx) {
		var row = $('<tr/>');
		$('<td/>').text(beer.id).appendTo(row);
		$('<td/>').text(beer.name).appendTo(row);
		$('<td/>').text(beer.style).appendTo(row);
		$('<td/>').text(beer.region).appendTo(row);
		var chosen = $('<td/>').addClass('text-center');
		$('<input />', {
			type: 'checkbox',
			id: 'beerCb' + idx,
			value: idx
		}).change(function onBeerCheckChange() {
			var chosen = !!this.checked;
			var idx = this.value|0;
			var beer = beerList[idx];
			if (! beer) {
				console.error('Chosen beer is empty for idx: ', idx);
				return true;
			}
			beer.chosen = chosen;
			saveListToLocalStorage();
			return true;
		}).prop('checked', !!beer.chosen).appendTo(chosen);
		chosen.appendTo(row);
		table.append(row);
	});

	table.tablesorter();
}

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
