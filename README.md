# Portfolio Project Atlas

A small, dependency-free static index for browsing selected public repositories. Search by project, tool, language, or topic; filter by category; open each repository directly on GitHub.

## Run locally

No package installation or build step is needed. Serve this folder over HTTP, for example:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8080>. The site is static and can also be hosted by any static-file host, but this repository does not enable GitHub Pages or configure a deployment.

## What is included

- 17 direct links to public repositories. Sixteen were verified against GitHub repository metadata and README content on 22 October 2026; Webhook Reliability Lab was checked against its public repository and README on 28 October 2026.
- Accessible search and category filters, keyboard shortcut `/`, Escape to clear search, live result count, empty state, skip link and visible focus styles.
- Responsive card layout for narrow and wide screens; reduced-motion support.
- No runtime dependencies, external APIs, analytics, tracking, or external fonts.

Project summaries are concise paraphrases of public GitHub descriptions/README material. Read each linked README for full setup instructions, test details, synthetic-data notes, and project-specific limitations. The Power BI entry is explicitly an implementation kit, not a completed PBIX/PBIP. Some projects are local demos, not hosted services.

## Tests

Run the included data checks with:

```sh
node --test tests/*.test.mjs
```

Browser interaction checks were also run against Chromium during packaging; see `docs/validation.md` for the exact workflows. The site itself needs only a modern browser.

## Scope

This is a browsing index, not an endorsement or quality guarantee. It contains no star counts, testimonials, personal bio, inferred employment claims, analytics, or external project images. Repository visibility and links can change independently after this snapshot.

Built with Wabi AI assistance for Raj's GitHub portfolio.
