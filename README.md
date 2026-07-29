# Jung Materials Design Group — Website

<div align="center">

**[jmd-kentech.github.io](https://jmd-kentech.github.io)**

Computational materials design for energy applications
· Korea Institute of Energy Technology (KENTECH)

[![deploy](https://github.com/jmd-kentech/jmd-kentech.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/jmd-kentech/jmd-kentech.github.io/actions/workflows/deploy.yml)

</div>

Source for the Jung Materials Design Group (JMD) group website. Built with [Jekyll](https://jekyllrb.com/) on the
[al-folio](https://github.com/alshedivat/al-folio) v1 starter, deployed to GitHub Pages.

## Quick start

```bash
bundle install                 # install Ruby gems
bundle exec jekyll serve       # dev server → http://localhost:4000
```

Content changes hot-reload. Edits to `_config.yml` require restarting the server.

Optional:

```bash
npm ci                         # tooling for the lint/test scripts
npm run lint:prettier          # formatting check (CI gate)
bundle exec jekyll build       # production build into _site/
```

A Docker path is also available (`docker compose up -d`, serves on <http://127.0.0.1:8080/>).

## Editing content

| What                | Where                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Landing page + News | `_pages/about.md` — the News table is inline HTML near the bottom                          |
| Members             | `_pages/members.md` (grid) + one `_pages/members/<name>.md` per person                     |
| Publications        | `_bibliography/papers.bib` — standard BibTeX plus `abbr`, `html`, `pdf`, `selected` fields |
| Posts               | `_posts/YYYY-MM-DD-slug.md`                                                                |
| Images              | `assets/img/` (member photos, group logo, favicon)                                         |
| Site-wide settings  | `_config.yml` (title, description, navbar, feature toggles)                                |

### Adding a news item

In `_pages/about.md`, add a row to the News table — newest first:

```html
<tr>
  <th scope="row" style="width: 20%">2026.08.01.</th>
  <td>Young-Kwang Jung joined KENTECH as an Assistant Professor.</td>
</tr>
```

### Adding a member

1. Drop the photo in `assets/img/<name>_pic.jpg`.
2. Copy an existing file in `_pages/members/` (e.g. `juna.md`), then update `title`, `permalink`,
   `profile.image`, and the contact links in `more_info`.
3. Add a matching card to the grid in `_pages/members.md`.

### Adding a publication

Append an entry to `_bibliography/papers.bib`. Entries are grouped newest-first by year; `abbr`
renders the journal badge and `html` / `pdf` become links.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages at <https://jmd-kentech.github.io>. Changes to `README.md` and the files under `docs/`
don't trigger a rebuild. Other workflows run Prettier, link checks, accessibility (axe), and visual
regression tests.

## How the theme works

This repo is a **thin starter**: layouts, includes, Sass, and feature JavaScript are **not** stored
here — they live in versioned `al_*` gems pinned in the `Gemfile` (`al_folio_core` is the base theme;
`al_search`, `al_icons`, `al_citations`, `al_math`, and others add optional features). Two lists must
stay in sync when adding or removing a plugin: the `Gemfile` and the `plugins:` list in `_config.yml`.

Files under `_includes/` and `_layouts/` in this repo are **local overrides** of gem-owned files,
tracked in `.al-folio-overrides.yml`. After changing one, run:

```bash
bundle exec al-folio upgrade overrides audit   # refresh .al-folio-overrides.yml
bundle exec al-folio upgrade audit             # check the v1 config contract
```

See `AGENTS.md`, `docs/BOUNDARIES.md`, and `CLAUDE.md` for the full ownership rules.

## License

Site content © Jung Materials Design Group. Theme code is [MIT licensed](LICENSE) (al-folio).
