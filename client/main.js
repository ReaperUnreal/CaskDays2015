var LOCAL_STORAGE_KEY = 'caskdays2018chosen';

var chosenById = {};
var isViewingChosen = false;
var shouldRemoveSession3 = false;
var shouldRemoveKegs = false;

function toggleViewingChosen() {
	if (! _.keys(chosenById).length) {
		return;
	}
	createTable(beerList, ! isViewingChosen, shouldRemoveSession3, shouldRemoveKegs);
	// don't persist unless createTable passes
	// not sure why I bother trusting things to throw properly
	isViewingChosen = ! isViewingChosen;
	$('span#toggle-favs-icon').toggleClass('glyphicon-star');
	$('span#toggle-favs-icon').toggleClass('glyphicon-star-empty');
	$('span#toggle-favs-text').text(isViewingChosen ? "Show All" : "Show Chosen Only");
}
var favs = $('button#toggle-favs');
favs.on('click', toggleViewingChosen);

function copyShareUrl() {
	var chosenIds = _.keys(chosenById);
	var query;
	if (! chosenIds.length) {
		query = 'https://caskdayshelper.com/';
	} else {
		query = 'https://caskdayshelper.com/?' + chosenIds.join('&');
	}

	swal({
		title: "Share Link",
		text: "Copy and paste this text to share with others.",
		type: "info",
		input: "text",
		inputValue: query,
		showCancelButton: false
	});
	// TOOD: just write to clipboard
	// rather than mess with location
	//history.replaceState({}, 'chosen', query);
}
var share = $('button#share-url');
share && share.on('click', copyShareUrl);

function toggleViewingSession3() {
	createTable(beerList, isViewingChosen, ! shouldRemoveSession3, shouldRemoveKegs);
	shouldRemoveSession3 = ! shouldRemoveSession3;
	$('button#toggle-session3').toggleClass('btn-danger');
	$('button#toggle-session3').toggleClass('btn-warning');
	$('span#toggle-session3-text').text(shouldRemoveSession3 ? "Show Session 3" : "Hide Session 3");
}
var session3 = $('button#toggle-session3');
session3.on('click', toggleViewingSession3);

function toggleViewingKegs() {
	createTable(beerList, isViewingChosen, shouldRemoveSession3, ! shouldRemoveKegs);
	shouldRemoveKegs = ! shouldRemoveKegs;
	$('button#toggle-keg').toggleClass('btn-danger');
	$('button#toggle-keg').toggleClass('btn-warning');
	$('span#toggle-keg-text').text(shouldRemoveKegs ? "Show Kegs" : "Hide Kegs");
}
var kegs = $('button#toggle-keg');
kegs.on('click', toggleViewingKegs);

var regionShort = {
	'Washington': 'WA',
	'California': 'CA',
	'Oregon': 'OR',
	'New York': 'NY',
	'Pennsylvania': 'PA',
	'Maine': 'MN',
	'United Kingdom': 'UK',
	'House Ales': 'Volo',
	'Alberta': 'AB',
	'British Columbia': 'BC',
	'Quebec': 'QC',
	'Ontario': 'ON',
	'Nova Scotia': 'NS',
	'IPA Challenge': 'IPA',
	'Homebrewer': 'Home',
	'Cider': 'Cid',
	'Toronto': 'TO',
	'Keep6 Imports': 'K6'
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

var headerNames = [
	"No.",
	"Brewery",
	"Name",
	"Style",
	"ABV",
	"Region",
	"Session",
	"Chosen"
];

function createTable(beerList, favoritesOnly, removeSession3, removeKegs) {
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
	var headerRow = $('<tr />');
	var sortIcon = $('<span />').addClass('noprint').addClass('glyphicon').addClass('glyphicon-sort');
	var numHeaders = headerNames.length;
	for (var idxHeader = 0; idxHeader < numHeaders; idxHeader++) {
		var headerName = headerNames[idxHeader];
		$('<th />').attr("id", "header-id-" + idxHeader).text(headerName).appendTo(headerRow);
	}
	$('<th />').append(sortIcon).appendTo(headerRow);
	thead.append(headerRow);

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer, idx) {

		if (favoritesOnly && ! beerList[idx].chosen) {
			return;
		}
		if (beer.name === "To Be Announced") {
			return;
		}
		if (beer.session[0] !== 'S') {
			return;
		}
		var session = Number.parseInt(beer.session[1]);
		if (removeSession3 && session === 3) {
			return;
		}

		var region = shortenRegion(beer.region);
		if (removeKegs && region === 'K6') {
			return;
		}

		var row = $('<tr/>');
		if (beer.limited) {
			row.css('background-color', 'orangered');
		}

		var abvNum = Number.parseFloat(beer.abv);
		var abv = "" + abvNum;
		if (isNaN(abvNum)) {
			abv = "";
		}
		$('<td/>').addClass('printable').text(beer.id).appendTo(row);
		$('<td/>').addClass('printable').text(beer.brewery).appendTo(row);
		$('<td/>').addClass('printable').text(beer.name).appendTo(row);
		$('<td/>').addClass('printable').text(beer.style).appendTo(row);
		$('<td/>').addClass('printable').text(abv).appendTo(row);
		$('<td/>').addClass('printable').text(region).appendTo(row);
		$('<td/>').addClass('printable').text("" + session).appendTo(row);
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
			try {
				history.replaceState({}, 'chosen', '/');
			} catch (err) {
				console.error("RIP: ", err);
			}

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
// TODO: kill all of this with fire before caskdays 2019... lol
createTable(beerList);
$("th#header-id-0").click();
