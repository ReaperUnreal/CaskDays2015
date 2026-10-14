// @ts-check
import { beers, lastUpdated } from './beers.js';
import { Column, Mode, SortDirection, View } from './types.js';
import { StorageKey, loadIds, saveIds } from './storage.js';
import { buildShareUrl, copyText, parseSharedIds } from './share.js';
import { nextSort, sortBeers } from './sort.js';
import { renderTable } from './table.js';

/** @typedef {import('./types.js').Beer} Beer */
/** @typedef {import('./types.js').State} State */
/** @typedef {import('./types.js').ColumnValue} ColumnValue */

const TOAST_DURATION_MS = 2000;

const Label = Object.freeze({
	SHOW_CHOSEN: 'Show Chosen Only',
	SHOW_ALL: 'Show All',
	ENTER_DRINKING: 'Enter Drinking Mode',
	EXIT_DRINKING: 'Back To Planning',
	LINK_COPIED: 'Link copied',
	NOTHING_CHOSEN: 'Choose some beers first',
	COPY_FAILED: 'Copy this link:',
});

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
function requireElement(id) {
	const element = document.getElementById(id);
	if (!element) {
		throw new Error(`Missing element #${id}`);
	}
	return element;
}

const elements = Object.freeze({
	main: requireElement('main'),
	lastUpdated: requireElement('last-updated'),
	share: requireElement('share'),
	toggleView: requireElement('toggle-view'),
	toggleMode: requireElement('toggle-mode'),
	toast: requireElement('toast'),
});

/** @type {State} */
let state = {
	chosen: loadIds(StorageKey.CHOSEN),
	drank: loadIds(StorageKey.DRANK),
	mode: Mode.PLANNING,
	view: View.ALL,
	sort: { column: Column.ID, direction: SortDirection.ASC },
};

/** @type {number | undefined} */
let toastTimer;

/**
 * @param {string} message
 */
function showToast(message) {
	elements.toast.textContent = message;
	elements.toast.hidden = false;
	window.clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => {
		elements.toast.hidden = true;
	}, TOAST_DURATION_MS);
}

/**
 * @param {Set<number>} ids
 * @param {number} id
 * @returns {Set<number>}
 */
function toggleId(ids, id) {
	const next = new Set(ids);
	if (next.has(id)) {
		next.delete(id);
	} else {
		next.add(id);
	}
	return next;
}

/**
 * @param {State} current
 * @returns {readonly Beer[]}
 */
function visibleBeers(current) {
	const filtered = current.view === View.CHOSEN
		? beers.filter((beer) => current.chosen.has(beer.id))
		: beers;
	return sortBeers(filtered, current.sort);
}

function render() {
	document.body.dataset.mode = state.mode;
	elements.toggleView.textContent = state.view === View.CHOSEN ? Label.SHOW_ALL : Label.SHOW_CHOSEN;
	elements.toggleMode.textContent = state.mode === Mode.DRINKING ? Label.EXIT_DRINKING : Label.ENTER_DRINKING;
	renderTable(elements.main, visibleBeers(state), state, { onRowClick, onHeaderClick });
}

/**
 * @param {Partial<State>} patch
 */
function update(patch) {
	state = { ...state, ...patch };
	render();
}

/**
 * @param {Beer} beer
 */
function onRowClick(beer) {
	if (state.mode === Mode.DRINKING) {
		const drank = toggleId(state.drank, beer.id);
		saveIds(StorageKey.DRANK, drank);
		update({ drank });
		return;
	}

	const chosen = toggleId(state.chosen, beer.id);
	saveIds(StorageKey.CHOSEN, chosen);

	// an empty chosen-only view has nothing to click, so fall back to the full list
	const view = chosen.size === 0 ? View.ALL : state.view;
	update({ chosen, view });
}

/**
 * @param {ColumnValue} column
 */
function onHeaderClick(column) {
	update({ sort: nextSort(state.sort, column) });
}

function onToggleView() {
	if (state.chosen.size === 0) {
		showToast(Label.NOTHING_CHOSEN);
		return;
	}
	update({ view: state.view === View.CHOSEN ? View.ALL : View.CHOSEN });
}

function onToggleMode() {
	update({ mode: state.mode === Mode.DRINKING ? Mode.PLANNING : Mode.DRINKING });
}

async function onShare() {
	if (state.chosen.size === 0) {
		showToast(Label.NOTHING_CHOSEN);
		return;
	}

	const url = buildShareUrl(location.origin + location.pathname, state.chosen);
	const copied = await copyText(url);
	if (copied) {
		showToast(Label.LINK_COPIED);
		return;
	}
	window.prompt(Label.COPY_FAILED, url);
}

/** Merge ids from a shared link into chosen, then clear the query so a reload doesn't re-apply it. */
function importSharedIds() {
	const sharedIds = parseSharedIds(location.search);
	if (sharedIds.length === 0) {
		return;
	}

	const knownIds = new Set(beers.map((beer) => beer.id));
	const chosen = new Set(state.chosen);
	for (const id of sharedIds) {
		if (knownIds.has(id)) {
			chosen.add(id);
		}
	}
	saveIds(StorageKey.CHOSEN, chosen);
	state = { ...state, chosen };

	history.replaceState(null, '', location.pathname);
}

elements.lastUpdated.textContent = lastUpdated;
elements.share.addEventListener('click', onShare);
elements.toggleView.addEventListener('click', onToggleView);
elements.toggleMode.addEventListener('click', onToggleMode);

importSharedIds();
render();
