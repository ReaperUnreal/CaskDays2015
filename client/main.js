var beerList = [];

var LOCAL_STORAGE_KEY = 'caskdays2015chosen';

var chosenById = {};
var isViewingChosen = false;

$.get('http://localhost:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
//$.get('http://159.203.19.50:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
	console.debug('got data: ', data);
	beerList = data;
	createTable(data);
}, 'json');

var favs = $('button#toggle-favs');

function toggleChosen() {
	if (! _.keys(chosenById).length) {
		return;
	}
	createTable(beerList, ! isViewingChosen);
	// don't persist unless createTable passes
	// not sure why I bother trusting things to throw properly
	isViewingChosen = ! isViewingChosen;
	$('span#toggle-favs-icon').toggleClass('glyphicon-star');
	$('span#toggle-favs-icon').toggleClass('glyphicon-star-empty');
}
favs.on('click', toggleChosen);

function createTable(beerList, isSparse) {
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

		if (isSparse && ! beerList[idx].chosen) {
			return;
		}

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

			if (chosen) {
				chosenById[beer.id] = beer;
			} else {
				delete chosenById[beer.id];
				if (isSparse) {
					if (_.keys(chosenById).length == 0) {
						// force back to not viewing chosen
						// gg tablesorter throwing when table is empty
						toggleChosen();
						return true;
					} else {
						$(this).parent().parent().remove();
					}
				}
			}
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
	var arrChosenIds = Object.keys(chosenById);
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
			chosenById[beer.id] = beer;
		}
	});
}
