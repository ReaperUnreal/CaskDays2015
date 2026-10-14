// @ts-check
import { Column, SortDirection } from './types.js';
import { shortenRegion } from './regions.js';

/** @typedef {import('./types.js').Beer} Beer */
/** @typedef {import('./types.js').State} State */
/** @typedef {import('./types.js').ColumnValue} ColumnValue */

/** @type {ReadonlyArray<{ column: ColumnValue, label: string }>} */
const HEADERS = Object.freeze([
	{ column: Column.ID, label: 'No.' },
	{ column: Column.BREWERY, label: 'Brewery' },
	{ column: Column.NAME, label: 'Name' },
	{ column: Column.STYLE, label: 'Style' },
	{ column: Column.ABV, label: 'ABV' },
	{ column: Column.REGION, label: 'Region' },
]);

const CHOSEN_MARK = '★';
const SORT_MARK = Object.freeze({
	[SortDirection.ASC]: '▲',
	[SortDirection.DESC]: '▼',
});

/**
 * @param {Beer} beer
 * @param {ColumnValue} column
 * @returns {string}
 */
function cellText(beer, column) {
	if (column === Column.REGION) {
		return shortenRegion(beer.region);
	}
	return String(beer[column]);
}

/**
 * @param {State} state
 * @param {(column: ColumnValue) => void} onHeaderClick
 * @returns {HTMLTableSectionElement}
 */
function buildHead(state, onHeaderClick) {
	const thead = document.createElement('thead');
	const row = document.createElement('tr');

	for (const { column, label } of HEADERS) {
		const th = document.createElement('th');
		th.scope = 'col';
		th.dataset.column = column;
		th.textContent = label;

		const isSorted = state.sort.column === column;
		if (isSorted) {
			th.textContent = `${label} ${SORT_MARK[state.sort.direction]}`;
			th.setAttribute('aria-sort', state.sort.direction === SortDirection.ASC ? 'ascending' : 'descending');
		}

		th.addEventListener('click', () => onHeaderClick(column));
		row.appendChild(th);
	}

	// trailing column for the chosen star
	row.appendChild(document.createElement('th'));
	thead.appendChild(row);
	return thead;
}

/**
 * @param {Beer} beer
 * @param {State} state
 * @param {(beer: Beer) => void} onRowClick
 * @returns {HTMLTableRowElement}
 */
function buildRow(beer, state, onRowClick) {
	const tr = document.createElement('tr');
	tr.classList.toggle('chosen', state.chosen.has(beer.id));
	tr.classList.toggle('drank', state.drank.has(beer.id));

	for (const { column } of HEADERS) {
		const td = document.createElement('td');
		td.dataset.column = column;
		td.textContent = cellText(beer, column);
		tr.appendChild(td);
	}

	const star = document.createElement('td');
	star.className = 'star';
	star.textContent = state.chosen.has(beer.id) ? CHOSEN_MARK : '';
	tr.appendChild(star);

	tr.addEventListener('click', () => onRowClick(beer));
	return tr;
}

/**
 * Replaces the table inside `container`. Full re-render is cheap at ~100 rows and keeps the DOM a pure function of state.
 * @param {HTMLElement} container
 * @param {readonly Beer[]} beers already filtered and sorted
 * @param {State} state
 * @param {{ onRowClick: (beer: Beer) => void, onHeaderClick: (column: ColumnValue) => void }} handlers
 */
export function renderTable(container, beers, state, handlers) {
	const table = document.createElement('table');
	table.className = 'beers';
	table.appendChild(buildHead(state, handlers.onHeaderClick));

	const tbody = document.createElement('tbody');
	for (const beer of beers) {
		tbody.appendChild(buildRow(beer, state, handlers.onRowClick));
	}
	table.appendChild(tbody);

	container.replaceChildren(table);
}
