var LOCAL_STORAGE_KEY = 'caskdays2018chosen';

var chosenById = {};
var isViewingChosen = false;
var shouldRemoveSat = false;

function toggleViewingChosen() {
	if (! _.keys(chosenById).length) {
		return;
	}
	createTable(beerList, ! isViewingChosen, shouldRemoveSat);
	// don't persist unless createTable passes
	// not sure why I bother trusting things to throw properly
	isViewingChosen = ! isViewingChosen;
	$('span#toggle-favs-icon').toggleClass('glyphicon-star');
	$('span#toggle-favs-icon').toggleClass('glyphicon-star-empty');
}
var favs = $('button#toggle-favs');
favs.on('click', toggleViewingChosen);

function copyShareUrl() {
	var chosenIds = _.keys(chosenById);
	if (! chosenIds.length) {
		return;
	}
	var query = '/?' + chosenIds.join('&');
	// TOOD: just write to clipboard
	// rather than mess with location
	history.replaceState({}, 'chosen', query);
}
var share = $('button#share-url');
share && share.on('click', copyShareUrl);

function toggleViewingSaturday() {
	createTable(beerList, isViewingChosen, ! shouldRemoveSat);
	shouldRemoveSat = ! shouldRemoveSat;
	$('button#toggle-sat').toggleClass('btn-danger');
	$('button#toggle-sat').toggleClass('btn-warning');
}
var sat = $('button#toggle-sat');
sat.on('click', toggleViewingSaturday);

var regionShort = {
	'Washington': 'WA',
	'California': 'CA',
	'Oregon': 'OR',
	'New York': 'NY',
	'United Kingdom': 'UK',
	'House Ales': 'Volo',
	'Alberta': 'AB',
	'British Columbia': 'BC',
	'Quebec': 'QC',
	'Ontario': 'ON',
	'IPA Challenge': 'IPA',
	'Homebrewer': 'Home',
	'Toronto': 'TO',
	'Maine': 'MN'
};
function shortenRegion(region) {
	var keys = Object.keys(regionShort);
	var key = _.find(keys, function startsWith(val) {
		return _.startsWith(region, val);
	});
	if (! key) {
		return region;
	}
	var short = regionShort[key];
	if (short) {
		return short;
	} else {
		return region;
	}
}

function createTable(beerList, favoritesOnly, removeSat) {
	// update chosen
	loadChosenFromLocalStorage();

	// clear
	$('div#main').empty();

	// create a new table
	$('<table/>', {
		id: 'beerListTable'
	}).addClass('table table-hover tablesorter').appendTo('div#main');
	var table = $('#beerListTable');
	var thead = $('<thead />').addClass('noprint').appendTo(table);
	thead.append('<tr><th>ID</th><th>Brewery</th><th>Name</th><th>Style</th><th>ABV</th><th>IBU</th><th>Region</th><th>Chosen</th>');

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer, idx) {

		if (favoritesOnly && ! beerList[idx].chosen) {
			return;
		}
		if (beer.brewery === 'NA') {
			return;
		}
		if (removeSat && beer.limited) {
			return;
		}

		var row = $('<tr/>');
		if (beer.limited) {
			row.css('background-color', 'orangered');
		}
		var abv = (beer.abv === "NA") ? "" : beer.abv;
		var ibu = (beer.ibu === "NA") ? "" : beer.ibu;
		$('<td/>').addClass('printable').text(beer.id).appendTo(row);
		$('<td/>').addClass('printable').text(beer.brewery).appendTo(row);
		$('<td/>').addClass('printable').text(beer.name).appendTo(row);
		$('<td/>').addClass('printable').text(beer.style).appendTo(row);
		$('<td/>').addClass('printable').text(abv).appendTo(row);
		$('<td/>').addClass('printable').text(ibu).appendTo(row);
		$('<td/>').addClass('printable').text(shortenRegion(beer.region)).appendTo(row);
		var chosen = $('<td/>').addClass('printable');
		var icon = $('<span/>');
		if (beer.chosen) {
			icon.addClass('glyphicon glyphicon-star');
		}
		icon.appendTo(chosen);
	 	row.on('click', function choose() {
			var beer = beerList[idx];
			if (! beer) {
				console.error('Chosen beer is empty for idx: ', idx);
				return true;
			}
			var chosen = beer.chosen = ! beer.chosen;
			// this is awful but overwrite history
			// to remove any stale share url query params
			history.replaceState({}, 'chosen', '/');

			if (chosen) {
				chosenById[beer.id] = beer;
				icon.addClass('glyphicon glyphicon-star');
			} else {
				icon.removeClass('glyphicon glyphicon-star');
				delete chosenById[beer.id];
				if (favoritesOnly) {
					if (_.keys(chosenById).length == 0) {
						// force back to not viewing chosen
						// gg tablesorter throwing when table is empty
						toggleViewingChosen();
						return true;
					} else {
						$(this).remove();
					}
				}
			}
			saveListToLocalStorage();
			return true;
		});
		chosen.appendTo(row);
		table.append(row);
	});

	table.tablesorter();
}

function saveListToLocalStorage() {
	// space delimited string because why not
	var arrChosenIds = _.keys(chosenById);
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
	loadChosen(arrChosenIds);
}

function loadChosen(arrChosenIds) {
	_.forEach(arrChosenIds, function assignChosen(id) {
		var beer = _.find(beerList, 'id', id);
		if (beer) {
			beer.chosen = true;
			chosenById[beer.id] = beer;
		}
	});
}

var query = location.search;
if ((/^\?/).test(query)) {
	var arrChosenIds = query.substring(1).split('&');
	loadChosen(arrChosenIds);
	saveListToLocalStorage();
}

// meh sure, just flog local storage twice
// TODO: kill all of this with fire before caskdays 2018
createTable(beerList);
