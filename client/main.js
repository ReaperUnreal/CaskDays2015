var beerList = [];

var LOCAL_STORAGE_KEY = 'caskdays2015chosen';

var chosenById = {};
var isViewingChosen = false;

$.get('http://159.203.19.50:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
	console.debug('got data: ', data);
	beerList = data;
	createTable(data);
}, 'json');

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

var regionShort = {
	'Washington': 'WA',
	'California': 'CA',
	'New York': 'NY',
	'United Kingdom': 'UK',
	'House Ales': 'Volo',
	'Nova Scotia': 'NS & PEI',
	'British Columbia & Alberta': 'BC & AB',
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
	thead.append('<tr><th>Id</th><th>Name</th><th>Style</th><th>Region</th><th>Chosen</th>');

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer, idx) {

		if (isSparse && ! beerList[idx].chosen) {
			return;
		}

		var row = $('<tr/>');
		$('<td/>').addClass('printable').text(beer.id).appendTo(row);
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
