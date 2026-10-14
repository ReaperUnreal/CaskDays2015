// @ts-check
// localStorage persistence for id sets. Every call is guarded: private windows and blocked storage must not break the page.

export const StorageKey = Object.freeze({
	CHOSEN: 'caskdays2026chosen',
	DRANK: 'caskdays2026drank',
});

/**
 * @param {string} key
 * @returns {Set<number>}
 */
export function loadIds(key) {
	try {
		const raw = localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : [];
		if (!Array.isArray(parsed)) {
			return new Set();
		}
		return new Set(parsed.filter(Number.isInteger));
	} catch {
		return new Set();
	}
}

/**
 * @param {string} key
 * @param {Set<number>} ids
 */
export function saveIds(key, ids) {
	try {
		localStorage.setItem(key, JSON.stringify([...ids]));
	} catch {
		// storage unavailable; the in-memory state still works for this visit
	}
}
