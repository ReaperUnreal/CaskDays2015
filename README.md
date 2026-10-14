# Cask Days 2026 Helper
A static web page for Cask Days 2026 to browse the cask list, star the beers you want, share your picks, and tick them off on the day.

Serve `client/` as static files. To refresh the beer list from the organizers' Google Sheet:

```sh
node scripts/import-list.mjs
```

Hosted at https://reaperunreal.github.io/CaskDays2015/ via GitHub Pages. Every push to `master` redeploys `client/`.
