var LOCAL_STORAGE_KEY = 'caskdays2017chosen';

var chosenById = {};
var isViewingChosen = false;

var favs = $('button#toggle-favs');

function toggleViewingChosen() {
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
	'Home Brewers': 'Home'
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
	var thead = $('<thead />').addClass('noprint').appendTo(table);
	thead.append('<tr><th>Id</th><th>Brewery</th><th>Name</th><th>Style</th><th>Region</th><th>Chosen</th>');

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer, idx) {

		if (isSparse && ! beerList[idx].chosen) {
			return;
		}

		var row = $('<tr/>');
		$('<td/>').addClass('printable').text(beer.id).appendTo(row);
		$('<td/>').addClass('printable').text(beer.brewery).appendTo(row);
		$('<td/>').addClass('printable').text(beer.name).appendTo(row);
		$('<td/>').addClass('printable').text(beer.style).appendTo(row);
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
				if (isSparse) {
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
