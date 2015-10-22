var beerList = [];

$.get('http://159.203.19.50:8081/beers', function gotData(data) {
	console.debug('got data: ', data);
	beerList = data;
	createTable(data);
}, 'json');

function createTable(beerList) {
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
			saveListToLocalStorage(idx);
			return true;
		}).appendTo(chosen);
		chosen.appendTo(row);
		table.append(row);
	});

	table.tablesorter();
}

function saveListToLocalStorage(idx) {
	console.debug('changed: ', idx);
}
