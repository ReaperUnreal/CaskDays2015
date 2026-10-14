# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A yearly-updated helper site for the Cask Days beer festival. Users browse the cask list, star beers, share their picks, print, and tick beers off in drinking mode. The repo name says 2015. Same repo re-used every year.

## Layout

- `client/` is the whole app and the directory to serve. Static ES modules, no build, no dependencies, no tests. `// @ts-check` with JSDoc types throughout.
- `client/beers.js` is generated. Never edit it by hand.
- `scripts/import-list.mjs` regenerates `client/beers.js` from the organizers' Google Sheet. Zero dependencies, Node 24.
- `data/corrections.txt` holds `bad|good` text replacements the import applies to brewery, name, and style.

## Commands

```sh
node scripts/import-list.mjs                 # fetch the sheet, rewrite client/beers.js
node scripts/import-list.mjs path/to/x.csv   # same, from a local CSV export
python3 -m http.server 8765 -d client        # serve locally
```

Type check without installing anything into the repo. The corporate npm registry needs a valid token, so point at npmjs:

```sh
npx -y --registry=https://registry.npmjs.org -p typescript tsc --noEmit --allowJs --checkJs --target es2022 --module es2022 --moduleResolution bundler --strict --lib es2022,dom client/*.js
```

## Client architecture

`app.js` owns a single `State` object (chosen ids, drank ids, mode, view, sort) and re-renders the whole table on every change. The DOM is a pure function of state; there is no incremental update.

- `types.js`: enums (`Mode`, `View`, `Column`, `SortDirection`) and JSDoc typedefs. No logic.
- `storage.js`: localStorage read/write of id sets as JSON arrays. Keys carry the year. Every call is try/catch guarded.
- `share.js`: share URL is `origin + pathname + ?id&id&id`. Parsing drops non-positive and non-integer ids.
- `sort.js`: pure sort with id as tiebreak. `id` and `abv` compare numerically, the rest by locale.
- `regions.js`: province to abbreviation map, falls back to the full name.
- `table.js`: builds `<table>` from the filtered, sorted list and current state. Rows get `.chosen` and `.drank` classes; the stylesheet only shows `.drank` when `body[data-mode="drinking"]`.

Behaviours worth knowing:

- A shared link merges its ids into chosen, saves, then `history.replaceState` strips the query so a reload doesn't re-apply it.
- Unchoosing the last beer while in chosen-only view drops back to the full list, since an empty table has nothing to click.
- Share copies via `navigator.clipboard` and falls back to `window.prompt` on plain http or denied permission.
- On phones under 600px the style column is hidden.

## Import script

Parses the CSV export of the sheet's cask-list tab (gid pinned in the script). Finds the header row by its first cell, `Cask #`, and reads columns by name, so column order changes are safe but renames break it loudly. Beer rows are those whose first cell matches `#<n>`. Strips `#` from ids and `%` from ABV. Captures the `Last Updated:` cell for the page header. Refuses to write an empty list.

2026 has no sessions and the off-cask Volo tap list (second tab) is intentionally excluded.

## Yearly update checklist

Update the sheet id and gid in `scripts/import-list.mjs`, the year in `client/index.html` and `README.md`, and the two keys in `client/storage.js`. Run the import. Extend `regions.js` if new provinces appear. Check the sheet's columns still match the `Column` enum in the script.

## History

`master` before this rewrite was a jQuery 2 / lodash 3 / Bootstrap 3 client with a hardcoded `list.js`. Older branches (`feature_2018_update`, `feature_oauth`, `feature_server_saves`, `feature_accounts`) carry Java backends that scraped the festival site or did OAuth. None are used. Don't resurrect them.
