# danielramos.dev

Personal portfolio — Astro 7, Tailwind 4, zero client frameworks.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
npm run preview
```

## How it is put together

Content is data, not markup. Roles and projects live as Markdown in
`src/content/`, validated at build time by Zod schemas in `src/content.config.ts`.
Adding a project means adding one file — if a required field is missing or a
`kind` is misspelled, the build fails instead of shipping a broken card.

```
src/
├── content.config.ts    Zod schemas — the contract for all content
├── content/
│   ├── experience/      one file per role
│   └── projects/        one file per project, body = the case study
├── data/                site profile, socials, nav, tech stack
├── lib/                 typed collection queries + date formatting
├── components/
│   ├── ui/              primitives: Button, Chip, Section, Prose…
│   ├── layout/          Header, Footer, Backdrop, CommandPalette
│   ├── project/         cards, rows, and the abstract project glyphs
│   ├── sections/        one component per page section
│   └── icons/           single-file icon set
├── layouts/Base.astro   head, SEO, JSON-LD, fonts, theme bootstrap
├── pages/
│   ├── index.astro
│   ├── work/[...id]     a static page per project
│   └── og.png.ts        social card rasterised at build time
└── styles/global.css    design tokens + base + utilities
```

## Notes on a few decisions

**Semantic colour tokens.** `src/styles/global.css` defines one set of names
(`canvas`, `surface`, `line`, `fg`, `muted`, `accent`) mapped to CSS variables.
Light and dark are two values of the same tokens, so components never branch on
theme and the palette can be changed in one place.

**Screenshots are optional.** A project shows an abstract SVG diagram
(`ProjectGlyph.astro`) keyed to its architecture until a real screenshot exists.
Drop the image next to the Markdown file and point at it:

```yaml
cover: ./finymo.png
coverAlt: Finymo loan dashboard on Android
```

`ProjectVisual.astro` picks the screenshot when it is there and the glyph when
it is not, so the two can coexist while the set fills in. Cards crop to a
uniform tile; case-study pages letterbox instead, so a portrait phone capture
and a wide dashboard both stay readable.

**Confidential work is named, not described.** `restricted: true` keeps a
project out of the case-study routes entirely — no page is generated and nothing
links to one. Those entries surface only in the "Under NDA" block, with a
tagline and a stack and nothing else.

**The OG image is generated.** `src/pages/og.png.ts` renders an SVG through
sharp at build time, reading from `src/data/site.ts`, so the social card can
never drift from the site.

**Progressive enhancement throughout.** Section reveals use CSS scroll-driven
animations behind an `@supports` guard. The command palette (<kbd>⌘K</kbd>) is a
native `<dialog>` with about a hundred lines of vanilla TypeScript. Nothing
hydrates; the site ships no framework runtime.

## Before deploying

Set your real domain in `astro.config.mjs` (`SITE`) — canonical URLs, the
sitemap and OG tags all derive from it. `dist/` is plain static output and works
on any host.
