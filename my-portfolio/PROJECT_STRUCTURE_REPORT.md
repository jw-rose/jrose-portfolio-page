# Project Structure Report — devjrose.com (my-portfolio)

Date: 2026-10-14
Scope: Read-only review of file/folder organisation. No files were moved, renamed, deleted, or edited.

## 1. Summary

**Organisation score: 7/10.**

For a small portfolio site this is a reasonably clean, conventional App Router project: components are flat and consistently PascalCase, data is mostly centralised in `lib/*Data.ts`, types are centralised in `types/`, and there's no `src/`-vs-root ambiguity. The deductions come from a handful of leftover/duplicate files and some inconsistency between a design-token system that exists but isn't used, rather than from any deep architectural problem. Nothing here requires a rewrite.

**Top 5 improvements (highest impact, lowest risk first):**
1. Remove the duplicate build-tool configs — `next.config.js` (duplicate of `next.config.ts`) and `postcss.config.mjs` (references an uninstalled v4 package, dead/broken relative to the installed Tailwind v3 toolchain). See F1/F2.
2. Delete `app/darktest/page.tsx` — a debug page ("I AM RED IN LIGHT MODE") that is currently a live, linkable production route. See F3.
3. Delete the 5 unused `create-next-app` boilerplate SVGs in `public/` and the empty `public/icons/` directory — none are referenced anywhere in the code. See F4/F5.
4. Extract the hardcoded "Who I am" bio paragraph out of `app/page.tsx` into a data file, matching the pattern already used for projects and skills. See F7.
5. Reconcile the colour system: `tailwind.config.ts` defines a `primary` and `dark` palette that is **never used** (0 references), while components instead use 43 raw `#06B6D4` literals and a second, undeclared grey scale (`#94A3B8`, `#F1F5F9`, `#64748B`) scattered across 8 files. See F9.

## 2. Current tree (depth 4, git-tracked files; untracked-but-present items noted separately)

```
.
├── app
│   ├── api
│   │   └── send-email
│   │       └── route.ts
│   ├── contact
│   │   └── page.tsx
│   ├── darktest
│   │   └── page.tsx
│   ├── skills
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── SkillCard.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── lib
│   ├── projectsData.ts
│   ├── resend.ts
│   └── skillsData.ts
├── types
│   ├── project.ts
│   └── skill.ts
├── public
│   ├── images
│   │   └── projects
│   │       ├── mia.jpg
│   │       ├── party.jpg
│   │       ├── socialPost.jpg
│   │       └── todo.jpg
│   ├── CV-Joshua-Rose-FR.pdf
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.js
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── README.md
├── SECURITY_AUDIT.md
├── tailwind.config.ts
└── tsconfig.json
```

**Present on disk but gitignored / untracked (correctly, per `git check-ignore -v`):** `.env.local` (gitignore:34), `.vercel/` (gitignore:37), `.DS_Store` (gitignore:24), `public/icons/` (empty directory — not tracked by git because git doesn't track empty dirs, not because it's ignored).

**Framework/config facts:**
- Next.js 16.2.1, **App Router** (`app/`), no `pages/` directory exists despite `tailwind.config.ts`'s `content` globs still including `./pages/**/*` (dead glob).
- No `src/` directory — `app/`, `components/`, `lib/`, `types/` all sit at repo root.
- Path alias: `@/*` → `./*` in `tsconfig.json:21-23` (consistent with the no-`src/` layout).
- Styling: Tailwind CSS (`tailwindcss@^3.4.19`), global stylesheet is just `@tailwind` directives (`app/globals.css`), component-level styling is 100% Tailwind utility classes — no CSS Modules, no styled-components, no CSS-in-JS.
- File counts per top-level dir (tracked files): `app/` 8, `components/` 8, `lib/` 3, `types/` 2, `public/` 10. No directory is unusually large. Largest tracked binaries: `public/images/projects/mia.jpg` (623 KB) and `public/CV-Joshua-Rose-FR.pdf` (477 KB) — see F11.

## 3. Findings table

| ID | Area | Issue | Location | Impact | Recommended action |
|----|------|-------|----------|--------|---------------------|
| F1 | Top-level clutter / config | Two Next.js configs with equivalent empty content (`next.config.js` and `next.config.ts`) are both tracked, which is ambiguous — Next.js only needs one. | `next.config.js`, `next.config.ts` | Medium | Delete `next.config.js`, keep `next.config.ts` (matches the all-TS codebase). |
| F2 | Top-level clutter / config | Two PostCSS configs tracked. `postcss.config.js` uses the Tailwind v3 plugin shape (`tailwindcss: {}`) matching the installed `tailwindcss@3.4.19`; `postcss.config.mjs` uses the Tailwind v4 plugin shape (`@tailwindcss/postcss`), a package that is **not** in `package.json` at all. If `postcss.config.mjs` were ever picked up instead of the `.js` file, the build would fail on a missing module. | `postcss.config.js`, `postcss.config.mjs` | Medium | Delete `postcss.config.mjs` (dead/broken relative to the installed toolchain), keep `postcss.config.js`. |
| F3 | Routes and pages | `/darktest` is a debug/test route ("I AM RED IN LIGHT MODE / I AM BLUE IN DARK MODE") with no `noindex`, auth gate, or dev-only guard — it ships to production as a real, crawlable page. | `app/darktest/page.tsx` | Medium | Delete the route entirely (its purpose — verifying dark-mode classes — is better served by just checking `ThemeToggle` in a browser, not a permanent page). |
| F4 | Assets | 5 unused `create-next-app` boilerplate SVGs confirmed via repo-wide grep (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — zero references in `app/`, `components/`, or `lib/`). | `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | Low | Delete all five. |
| F5 | Assets | `public/icons/` is an empty directory with no contents and no code references. | `public/icons/` | Low | Delete if unused, or populate it (e.g. with real favicon/app-icon assets) if that was the intent. |
| F6 | Assets | Project screenshots are large, unoptimised JPEGs rendered via a plain `<img>` tag (not `next/image`), so no automatic resizing/format negotiation happens. `mia.jpg` is 623 KB, `todo.jpg` is 397 KB. | `public/images/projects/*.jpg`; rendered in `components/ProjectCard.tsx:12` | Medium | Compress/convert to WebP and/or switch `ProjectCard` to `next/image` (also flagged independently by `next lint`'s `no-img-element` rule). |
| F7 | Data, content & types | The "Who I am" bio paragraph is hardcoded directly in a page component, while the otherwise-equivalent content (projects, skills) is centralised in `lib/projectsData.ts` / `lib/skillsData.ts`. This is the one inconsistency in an otherwise good content-centralisation pattern. | `app/page.tsx:13-19` | Low | Extract into a small `lib/profileData.ts` (or similar) exporting the bio text, matching the existing pattern. |
| F8 | Lib/utils | `lib/` mixes pure static data (`projectsData.ts`, `skillsData.ts`) with an actual service client (`resend.ts`). Not a real problem at 3 files, but worth naming clearly if the folder grows. | `lib/projectsData.ts`, `lib/skillsData.ts`, `lib/resend.ts` | Low | Optional: split into `lib/data/` (static content) vs `lib/*` (service clients) once a 4th or 5th file is added — not worth doing for 3 files today. |
| F9 | Styles / design tokens | `tailwind.config.ts` defines a `primary` colour scale (`primary.500 = #06B6D4`) and a `dark` scale (`dark.100/200/300`), but grep confirms **zero** uses of `primary-*` or `dark-*` utility classes anywhere in `app/`/`components/`/`lib/`. Instead, the same brand colour is hardcoded as the raw arbitrary value `#06B6D4` **43 times** across 8 files, and a second, un-declared grey scale (`#94A3B8`, `#F1F5F9`, `#64748B`) is used ad hoc in at least 8 files with no entry in `tailwind.config.ts` at all. There is no single source of truth for the palette. | `tailwind.config.ts:12-29` vs. e.g. `components/ContactForm.tsx`, `components/Navbar.tsx`, `components/SkillCard.tsx`, `components/ProjectCard.tsx`, `components/Footer.tsx`, `app/skills/page.tsx` | Medium | Either (a) start using the existing `primary-500`/`dark-100` tokens and delete the raw hexes, or (b) if the design intentionally diverged from that palette, update `tailwind.config.ts` to declare the actual colours in use (including the grey scale) as named tokens and replace the raw hexes with them. Either way, pick one source of truth. |
| F10 | Dead code (needs verification — `knip`/`depcheck` not installed locally, grep-based only) | `components/ThemeToggle.tsx:22,26` contains two leftover `console.log('Current theme:'...)` / `console.log('Switching to:'...)` debug statements that ship to the browser console in production. | `components/ThemeToggle.tsx:22,26` | Low | Remove the two `console.log` calls. |
| F11 | Dead code / dependency (needs verification) | `better-auth` is declared in `package.json` but has zero imports anywhere in the source tree (repo-wide grep for `better-auth` returns no matches outside `package.json`/`package-lock.json`). Confirmed by grep, not by `depcheck` (not installed and not run, per instructions, rather than guessed). | `package.json` (dependencies) | Low | Remove if there's no near-term plan to add auth; this is a dependency hygiene item, not a file-location one, so no path change is proposed here. |
| F12 | Components | `components/ContactForm.tsx` repeats near-identical label+input markup 4 times (name/email/subject/message), and `components/Navbar.tsx` repeats an identical CV-download `<a>` block twice (desktop nav + mobile menu), each tagged with a leftover `{/* FIXED: Added <a> */}` comment. Not large enough to mandate a split, but a clear, low-risk duplication. | `components/ContactForm.tsx:49-99`; `components/Navbar.tsx:50-58,96-104` | Low | Optional: extract a small shared `FormField` component for the form inputs, and a `CvDownloadLink` component for the repeated CV button. Not required for a site this size — flagged as an optional cleanup, not part of the phased plan below. |
| F13 | Docs/tooling | `README.md` is the unmodified `create-next-app` boilerplate (mentions Geist font and generic "Getting Started" text) and doesn't describe this project, its routes, or its one env var. | `README.md` | Low | Replace with a short project-specific README (what it is, how to run it, that `RESEND_API_KEY` is required). |
| F14 | Docs/tooling | No `.env.example` exists, so a new clone has to read `lib/resend.ts` to discover that `RESEND_API_KEY` is required. | n/a (missing file) | Low | Add `.env.example` containing `RESEND_API_KEY=` (name only, no value). |
| F15 | Tests/CI | No test files or test runner config exist anywhere in the repo, and no `.github/` or other CI config exists. | n/a | Info | Acceptable for a small static portfolio with one API route; flagged for completeness only, not treated as a defect. |
| F16 | Git hygiene | `.gitignore` is otherwise complete and correctly covers `node_modules`, `.next`, `.env*`, `.vercel`, `.DS_Store`, `*.tsbuildinfo`, `next-env.d.ts`. No build artefacts, env files, or OS files are tracked (verified via `git ls-files` and `git check-ignore -v`). | `.gitignore` | Pass (no action) | None needed. |

No findings for: file/folder casing (components are consistently PascalCase, lib/data files consistently camelCase, route folders consistently lowercase — all conventional for this stack), plural/singular naming (types are consistently singular: `project.ts`, `skill.ts`), index-file usage (none used, none needed at this scale), or duplicate/near-duplicate full components (none found — `ProjectCard`/`SkillCard` are distinct enough to justify separate files).

## 4. Proposed target tree

This keeps the existing App Router conventions and does **not** introduce `src/`, feature folders, or any structure beyond what a project this size needs.

```
.
├── app
│   ├── api
│   │   └── send-email
│   │       └── route.ts
│   ├── contact
│   │   └── page.tsx
│   ├── skills
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  (darktest/ removed — F3)
├── components
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── SkillCard.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx           (debug console.logs removed — F10)
├── lib
│   ├── profileData.ts            (new — bio text extracted from app/page.tsx, F7)
│   ├── projectsData.ts
│   ├── resend.ts
│   └── skillsData.ts
├── types
│   ├── project.ts
│   └── skill.ts
├── public
│   ├── images
│   │   └── projects
│   │       ├── mia.jpg           (recommend re-compressing, F6)
│   │       ├── party.jpg
│   │       ├── socialPost.jpg
│   │       └── todo.jpg          (recommend re-compressing, F6)
│   └── CV-Joshua-Rose-FR.pdf     (default svgs + empty icons/ removed — F4/F5)
├── .env.example                  (new, names only — F14)
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts                (next.config.js removed — F1)
├── package-lock.json
├── package.json
├── postcss.config.js             (postcss.config.mjs removed — F2)
├── README.md                     (rewritten, F13)
├── SECURITY_AUDIT.md
├── tailwind.config.ts            (palette reconciled, F9)
└── tsconfig.json
```

## 5. Migration map

No existing file needs to move to a *different directory* — this project is small enough that the fixes are deletions, one content-extraction, and one new file, not a reshuffle. There is nothing here that requires `git mv` for relocation; the one "move" is really a copy-then-trim (content extraction), listed below.

| Current path | Proposed path | Action | Evidence it's safe |
|---|---|---|---|
| `app/page.tsx:13-19` (inline bio text) | `lib/profileData.ts` (new file) | Extract text into a new export, import it back into `app/page.tsx` | Matches existing pattern (`projectsData.ts`, `skillsData.ts`); not a deletion, just centralisation |

**Recommended for deletion** (with evidence each is unused):

| Path | Evidence |
|---|---|
| `next.config.js` | Duplicate of `next.config.ts`; both are empty stubs — keeping both is ambiguous, not additive (F1) |
| `postcss.config.mjs` | References `@tailwindcss/postcss`, which does not appear anywhere in `package.json` dependencies/devDependencies; the installed `tailwindcss@3.4.19` matches `postcss.config.js`'s plugin shape instead (F2) |
| `app/darktest/page.tsx` | Debug-only content ("I AM RED IN LIGHT MODE"); no other file imports or links to it except via the global `navItems` array in `Navbar.tsx` — which does **not** include it, confirming it's reachable only by direct URL (F3) |
| `public/file.svg` | Zero matches for `file.svg` across `app/`, `components/`, `lib/` (F4) |
| `public/globe.svg` | Zero matches for `globe.svg` across `app/`, `components/`, `lib/` (F4) |
| `public/next.svg` | Zero matches for `next.svg` across `app/`, `components/`, `lib/` (F4) |
| `public/vercel.svg` | Zero matches for `vercel.svg` across `app/`, `components/`, `lib/` (F4) |
| `public/window.svg` | Zero matches for `window.svg` across `app/`, `components/`, `lib/` (F4) |
| `public/icons/` | Empty directory (`ls -la` shows no contents) and zero references to `/icons` in code (F5) |

**Dependency flagged for removal (not a path change):** `better-auth` in `package.json` — zero imports found repo-wide (F11; confirmed by grep only, see §7).

## 6. Import and config impact

- **Deleting `next.config.js`:** no import impact — nothing references config files by path; Next.js resolves them by convention. No tsconfig change needed.
- **Deleting `postcss.config.mjs`:** no import impact, same reasoning. Verify the Tailwind build still works afterward (`npm run build`), since this confirms `postcss.config.js` was indeed the one actually in effect.
- **Deleting `app/darktest/`:** no imports reference it (it isn't in `Navbar.tsx`'s `navItems`, confirmed above). No config impact.
- **Deleting the 5 unused SVGs + `public/icons/`:** no imports reference them. No config impact.
- **Extracting bio text to `lib/profileData.ts`:** requires one new `import` line in `app/page.tsx` and removing the inline string there. No tsconfig path-alias change needed — `@/lib/profileData` already resolves under the existing `"@/*": ["./*"]` alias.
- **Reconciling the colour palette (F9):** this is the one change with real blast radius — it touches class names in up to 8 component files (every raw `#06B6D4`, `#94A3B8`, `#F1F5F9`, `#64748B` occurrence) plus `tailwind.config.ts` itself. No import/config-file changes are needed (Tailwind picks up `tailwind.config.ts` by convention), but it should be done as its own isolated phase with a visual check afterward, not bundled with the cheap deletions.
- **Removing `better-auth`:** would require `npm uninstall better-auth` (a dependency change, not a file move) and would update `package.json`/`package-lock.json`. No source imports to update since none exist.
- **New `.env.example` and rewritten `README.md`:** purely additive/content changes, no import or config impact.

## 7. Phased plan (ordered by risk)

**Phase 1 — safe cleanups (deletions only, zero functional risk):**
- Delete `next.config.js`
- Delete `postcss.config.mjs`
- Delete `app/darktest/page.tsx` (and the now-empty `app/darktest/` directory)
- Delete `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Delete `public/icons/` (empty)
- Remove the two debug `console.log` calls in `components/ThemeToggle.tsx:22,26`

Verify after Phase 1:
```
npm run lint
npx tsc --noEmit
npm run build
```

**Phase 2 — content/doc additions (low risk, additive):**
- Add `.env.example` with `RESEND_API_KEY=` (name only)
- Rewrite `README.md` with project-specific content
- Extract the "Who I am" bio from `app/page.tsx` into `lib/profileData.ts` and import it back

Verify after Phase 2:
```
npm run lint
npx tsc --noEmit
npm run build
```
(Manually re-check the homepage renders the bio text identically.)

**Phase 3 — restructuring (highest touch, do last, in its own commit):**
- Reconcile the colour system: decide whether to adopt the existing `primary`/`dark` Tailwind tokens (F9 option a) or update `tailwind.config.ts` to formally declare the grey scale already in use (F9 option b), then replace raw hex literals across `components/ContactForm.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `components/ProjectCard.tsx`, `components/SkillCard.tsx`, `app/skills/page.tsx`, and `app/contact/page.tsx`
- Optional, not required: extract the repeated form-field markup in `ContactForm.tsx` and the repeated CV-download link in `Navbar.tsx` into small shared components
- Optional, not required: remove the unused `better-auth` dependency

Verify after Phase 3:
```
npm run lint
npx tsc --noEmit
npm run build
```
(Manually spin up `npm run dev` and visually diff light/dark mode across `/`, `/skills`, `/contact` before and after, since this phase touches visual styling broadly.)

All phases should use `git mv` for any actual renames (none are required here beyond the content extraction in Phase 2, which is a new-file-plus-edit, not a rename) and should land as separate commits per phase so each is easy to review/revert independently.

## 8. Things that could not be verified

- **Which of `next.config.js` / `next.config.ts` Next.js actually loads when both are present**: not conclusively determined from the build output alone (it didn't name the config file loaded). The recommendation to keep `.ts` is based on codebase consistency, not a confirmed resolution order — worth confirming no behavioural difference exists between the two (they're both empty stubs here, so risk is minimal either way).
- **Dead code / unused exports beyond what grep can show**: `npx knip` and `npx depcheck` were not already installed locally, and per instructions were not installed for this review. The `better-auth` unused-dependency finding (F11) and the unused-SVG findings (F4) are grep-based and cross-checked manually; there could be other unused exports (e.g. within `types/`) that only a proper dead-code tool would catch. Flagged as needs-further-verification if you want full confidence.
- **Whether `public/icons/` was meant to hold something specific** (e.g. app icons/favicons for a PWA manifest) — no manifest or `apple-touch-icon` reference was found pointing at it, but the original intent behind creating the folder couldn't be determined from the repo alone.
- **Image optimisation savings (F6)**: flagged as oversized based on raw file size only; actual achievable compression wasn't measured (would require running an image tool, which this review didn't do).
