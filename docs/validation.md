# Validation record

- GitHub API metadata confirmed each of the 16 linked repositories exists, is public, and belongs to `RAJTIWARI3594` on 22 October 2026. Each README was fetched and used to check project scope/limitations; summaries avoid unsupported capability claims.
- `node --test tests/*.test.mjs`: data structure, distinct repository names, category coverage, Power BI limitation and prohibited claim checks.
- Chromium desktop and mobile browser checks: all cards render; search finds a specific project; category filter narrows results; clearing returns all cards; unmatched search shows the empty state; keyboard `/` focuses search and Escape clears it; links point to the expected repository; no page errors.
- Screenshots in `docs/previews/` are actual local Chromium renders.

This record validates the static index and its repository links at packaging time. It does not guarantee those repositories remain public or that their contents are unchanged later.
