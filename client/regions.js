// @ts-check

/**
 * Display abbreviations. Anything not listed falls back to the full name.
 * @type {Readonly<Record<string, string>>}
 */
const REGION_SHORT = Object.freeze({
	'Alberta': 'AB',
	'British Columbia': 'BC',
	'Manitoba': 'MB',
	'Nova Scotia': 'NS',
	'Ontario': 'ON',
	'Quebec': 'QC',
	'Québec': 'QC',
	'Toronto': 'TO',
	'Volo': 'Volo',
});

/**
 * @param {string} region
 * @returns {string}
 */
export function shortenRegion(region) {
	return REGION_SHORT[region] ?? region;
}
