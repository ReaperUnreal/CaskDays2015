# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A yearly-updated helper site for the Cask Days beer festival, served at caskdayshelper.com. Users browse the beer list, star beers, print or share their picks, and tick beers off on the day. The repo name says 2015; the README says 2018; master says 2019. Same repo re-used every year.

## Branch map (read this first)

`master` is the source of truth. Check which branch you are on before trusting what's in the tree.

| Branch | Date | State |
|---|---|---|
| `master` | 2019-10 | Static client only. Server deleted in `7b632df`. Has drinking mode, kegs toggle, share dialog. |
| `feature_2018_update` | 2018-10 | Ancestor of master. Still carries the old Jersey/Jedis scraper under `src/`. Nothing here is unmerged. |
| `feature_oauth` | 2019-10 | Branched from master. Brand-new Java 11 server (`com.caskdayshelper.server`) doing Google/Facebook/GitHub OAuth to JWT. Auth only; no beer or list endpoints yet. Client in this branch is behind master. |
| `feature_server_saves` | 2015-10 | Original client that fetched `/beers` and saved lists to the server by name. Historical. |
| `feature_accounts` | 2017-10 | Copy-pasted starter from an unrelated project (`com.bigvikinggames.animoji`). Ignore. |

## The client (`client/`)

Fully static. `index.html` loads `list.js` (a hardcoded `var beerList = [...]`) then `main.js`. No build, no package.json, no bundler. Open `client/index.html` directly or serve the directory. Since commit `e7f31fd` the client makes no network calls. Bootstrap 3 and sweetalert2 come from CDNs.

- `beerList` rows are skipped when `name === "To Be Announced"` or `session` doesn't start with `S`. Region `K6` (Keep6 kegs) is skippable via the kegs toggle.
- Two sets of per-user state, both in memory and in `localStorage` as space-delimited id strings: chosen (`caskdays<year>chosen`) and drank (`caskdays<year>drank`). `createTable()` re-reads both on every render.
- Header buttons: share, hide session 3, hide kegs, chosen-only, drinking mode. Each toggle re-calls `createTable()` with all five flags and flips its own button text.
- Planning mode: clicking a row toggles chosen. Drinking mode: clicking a row toggles drank and paints it green. `limited: true` rows are orange.
- Share: a sweetalert2 dialog shows `https://caskdayshelper.com/?id1&id2`. On load, a `?`-query is parsed as ids, merged into chosen, and persisted. Toggling a beer rewrites history to `/` to drop stale query ids.
- `regionShort` maps region names to abbreviations by prefix. Add new festival regions there.
- `print.css` hides `.noprint` and shrinks `.printable` cells.

## Yearly update checklist

Replace `client/list.js` with the new list in the same schema. Grep the old year across `README.md`, `client/index.html` (title and heading), and the two localStorage keys in `main.js`. Update `regionShort` if regions changed. `client/casks.json` is an old different-schema list referenced by nothing.

## Servers

### Old scraper (on `feature_2018_update`, deleted from master)

Java 8, Maven, Jersey 2 on Jetty 9.2, Jedis. Scrapes `festival.caskdays.com/oncask` with Jsoup, applies `config/corrections.txt` (`bad|Good` pairs) and `config/style_guesses.txt`, caches to `config/list.json` (delete it to force a re-scrape), and stores chosen lists in Redis under prefix `CD2015`. Endpoints: `GET /beers`, `POST /savelist`, `GET /getlist/{name}`. No tests.

```sh
cp config/server.properties.template config/server.properties
cp config/log4j.properties.template config/log4j.properties
mvn package
java -jar target/caskdays-server-2017-0.0.1-SNAPSHOT-jar-with-dependencies.jar
```

Run from the repo root; config paths are relative. Default port 7613, template sets 8081. `config/*.properties` are gitignored.

### OAuth server (on `feature_oauth`)

Java 11, Jersey on Jetty 9.4, Lettuce (async Redis), jjwt, async-http-client. Mounted at `/auth`; nginx proxies `/api/*` to port 9001 and strips the prefix. Flow: `/auth/{github,google,fb}` stores a random state in the Redis set `stateset` and redirects to the provider; the callback pops the state, exchanges the code, fetches the user id, signs a JWT with subject `<provider>-<id>`, and redirects to `/auth/isauthed/{jwt}`.

```sh
./run.sh      # mvn clean install && java -jar target/server-0.0.1-SNAPSHOT.jar
./deploy.sh   # same build, then scp the jar to the production host
```

`config/server.properties` needs `port`, `jwt.key` (base64 HMAC key), `base` (public URL including `/api/`), and `oauth.<provider>.id` / `.secret` per provider. Redis via `redis.host`, `redis.port`, `redis.pw`. `.idea/` is committed on this branch; don't propagate that.
