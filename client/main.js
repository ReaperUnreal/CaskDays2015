var beerList = [];

var LOCAL_STORAGE_KEY = 'caskdays2015chosen';

$.get('http://159.203.19.50:8081/beers?cacheBust=' + Date.now(), function gotData(data) {
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

	//table.tablesorter();
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

$('button#load').click(function onLoadButtonClicked() {
	promptForName(false, function gotInput(name) {
		$.get('http://159.203.19.50:8081/getlist/' + name, function success(data) {
			console.debug('got data from server: ', data);
			loadBeerListFromJson(data);
			swal('Beers Loaded', 'Loaded beers for ' + name, 'success');
		}, 'json');
		return true;
	});
});

$('button#save').click(function onSaveButtonClicked() {
	promptForName(true, function gotInput(name) {
		var str = convertBeerListToJson(name);
		$.ajax('http://159.203.19.50:8081/savelist', {
			data: str,
			contentType: 'application/json',
			dataType: 'json',
			method: 'POST'
		}).done(function success() {
			swal('Beers Saved', 'Saved beers for ' + name, 'success');
		});
		return true;
	});
});

function promptForName(isForSave, callback) {
	var text;
	if (isForSave) {
		text = "Enter name to save as:";
	} else {
		text = "Enter name to load:";
	}
	swal({
		title: "Enter Name",
		text: text,
		type: "input",
		showCancelButton: true,
		closeOnConfirm: true,
		animation: "slide-from-top",
		inputPlaceholder: "Write something"
	}, function(inputValue){
		if (inputValue === false) {
			return false;
		}
		if (inputValue === "") {
			swal.showInputError("You need to write something!");
			return false;
		}
		callback(inputValue);
		return true;
	});
}

function convertBeerListToJson(name) {
	var arrChosen = _.filter(beerList, 'chosen');
	var arrChosenIds = _.pluck(arrChosen, 'id');
	var obj = {
		name: name,
		chosenIds: arrChosenIds
	};
	var str = JSON.stringify(obj);
	return str;
}

function loadBeerListFromJson(obj) {
	_.forEach(beerList, function clearChosen(beer) {
		delete beer.chosen;
	});
	var arrChosenIds = obj.chosenIds;
	_.forEach(arrChosenIds, function assignChosen(id) {
		var beer = _.find(beerList, 'id', id|0);
		if (beer) {
			beer.chosen = true;
		}
	});
	saveListToLocalStorage();
	createTable(beerList);
}
