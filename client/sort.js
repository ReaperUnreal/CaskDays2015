// @ts-check
import { Column, SortDirection } from './types.js';

/** @typedef {import('./types.js').Beer} Beer */
/** @typedef {import('./types.js').Sort} Sort */
/** @typedef {import('./types.js').ColumnValue} ColumnValue */

/** @type {ReadonlySet<string>} */
const NUMERIC_COLUMNS = new Set([Column.ID, Column.ABV]);

/**
 * @param {Beer} a
 * @param {Beer} b
 * @param {ColumnValue} column
 * @returns {number}
 */
function compareByColumn(a, b, column) {
	if (NUMERIC_COLUMNS.has(column)) {
		return Number(a[column]) - Number(b[column]);
	}
	return String(a[column]).localeCompare(String(b[column]), undefined, { sensitivity: 'base' });
}

/**
 * Returns a new sorted array. Ties fall back to id so the order is stable across renders.
 * @param {readonly Beer[]} beers
 * @param {Sort} sort
 * @returns {Beer[]}
 */
export function sortBeers(beers, sort) {
	const sign = sort.direction === SortDirection.ASC ? 1 : -1;
	return [...beers].sort((a, b) => {
		const primary = compareByColumn(a, b, sort.column);
		if (primary !== 0) {
			return primary * sign;
		}
		return a.id - b.id;
	});
}

/**
 * Clicking the active column flips direction; clicking another column starts ascending.
 * @param {Sort} current
 * @param {ColumnValue} column
 * @returns {Sort}
 */
export function nextSort(current, column) {
	if (current.column !== column) {
		return { column, direction: SortDirection.ASC };
	}
	const direction = current.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
	return { column, direction };
}
