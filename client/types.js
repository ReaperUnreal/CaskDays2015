// @ts-check
// Shared enums and type definitions. No runtime behaviour beyond the frozen enums.

/** @typedef {{ id: number, region: string, brewery: string, name: string, style: string, abv: string }} Beer */

export const Mode = Object.freeze({
	PLANNING: 'planning',
	DRINKING: 'drinking',
});
/** @typedef {typeof Mode[keyof typeof Mode]} ModeValue */

export const View = Object.freeze({
	ALL: 'all',
	CHOSEN: 'chosen',
});
/** @typedef {typeof View[keyof typeof View]} ViewValue */

export const Column = Object.freeze({
	ID: 'id',
	BREWERY: 'brewery',
	NAME: 'name',
	STYLE: 'style',
	ABV: 'abv',
	REGION: 'region',
});
/** @typedef {typeof Column[keyof typeof Column]} ColumnValue */

export const SortDirection = Object.freeze({
	ASC: 'asc',
	DESC: 'desc',
});
/** @typedef {typeof SortDirection[keyof typeof SortDirection]} SortDirectionValue */

/** @typedef {{ column: ColumnValue, direction: SortDirectionValue }} Sort */

/**
 * @typedef {object} State
 * @property {Set<number>} chosen
 * @property {Set<number>} drank
 * @property {ModeValue} mode
 * @property {ViewValue} view
 * @property {Sort} sort
 */
