// @ts-check
// Share links encode chosen ids as a bare query string: /?3&17&42

const QUERY_SEPARATOR = '&';

/**
 * @param {string} baseUrl origin plus pathname
 * @param {Set<number>} ids
 * @returns {string}
 */
export function buildShareUrl(baseUrl, ids) {
	if (ids.size === 0) {
		return baseUrl;
	}
	return `${baseUrl}?${[...ids].join(QUERY_SEPARATOR)}`;
}

/**
 * @param {string} search window.location.search, including the leading "?"
 * @returns {number[]}
 */
export function parseSharedIds(search) {
	if (!search.startsWith('?')) {
		return [];
	}
	return search
		.slice(1)
		.split(QUERY_SEPARATOR)
		.map(Number)
		.filter((id) => Number.isInteger(id) && id > 0);
}

/**
 * @param {string} text
 * @returns {Promise<boolean>} false when the clipboard is unavailable (http, old browser, denied)
 */
export async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
