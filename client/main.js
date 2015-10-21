$.get('http://localhost:8081/beers', function gotData(data) {
	console.debug('got data: ', data);
	createTable(data);
}, 'json');

function createTable(beerList) {
	// clear
	$('div#main').empty();

	// create a new table
	$('<table/>', {
		id: 'beerListTable'
	}).appendTo('div#main');
	$('#beerListTable').append('<thead><tr><th>Name</th><th>Style</th><th>Region</th></thead>');

	// create a new row for each beer
	_.forEach(beerList, function createBeerRow(beer) {
		var str = '<tr><td>' + beer.name + '</td><td>' + beer.style + '</td><td>' + beer.region + '</td></tr>';
		$('#beerListTable').append(str);
	});
}
