# Security Audit — devjrose.com (my-portfolio)

Date: 2026-10-14
Scope: Static read-only review of the repository working tree + git history. No live site or third-party service was probed.

## 1. Executive summary

**Overall risk: Low.** This is a static/mostly-static Next.js portfolio site with a single dynamic surface: a contact-form API route that sends email via Resend. There is no authentication, no database, and no user accounts in this codebase — most of the OWASP Top 10 categories are N/A by design. No committed secrets were found, and `.env.local` is correctly gitignored and untracked.

**Top 3 issues:**
1. **No security response headers** (CSP, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy, HSTS) are configured anywhere in `next.config.ts` or middleware — `next.config.ts` is an empty stub. (A02, Medium)
2. **`/api/send-email` has no rate limiting, abuse protection, or input size limits**, and reflects raw `error.message` from Resend back to the client on failure. It also interpolates unescaped user input (`name`, `email`, `subject`, `message`) directly into an HTML email body sent to the site owner, with no HTML-escaping. (A06/A05/A10, Medium)
3. **All seven `target="_blank"` external links** (LinkedIn, GitHub, project links) are missing `rel="noopener noreferrer"`, which is a reverse-tabnabbing risk. (A02/A05, Low)

No critical or high-severity application-layer findings. The highest-severity items are in third-party *dependency* advisories (see §5), none of which are currently exploitable through this app's own code paths (build-time/dev tooling only).

## 2. Architecture / stack summary

- **Framework:** Next.js 16.2.1 (App Router), Turbopack build, React 19.2.4.
- **Routing:** `app/` directory — `/`, `/contact`, `/skills`, `/darktest`, plus one API route `app/api/send-email/route.ts` (dynamic, server-rendered on demand per build output). No server actions (`'use server'`) found anywhere in the codebase.
- **Auth:** None implemented. `better-auth` is listed as a dependency in `package.json` but is **not imported or used anywhere** in the current source tree (confirmed via repo-wide grep) — it appears to be a leftover from a template/another project or planned-but-unused. No middleware, no sessions, no protected routes.
- **Database/ORM:** None. No Drizzle, Mongo driver, or Prisma present.
- **Email handling:** `resend` SDK (`lib/resend.ts`), used only by `app/api/send-email/route.ts`, called from the client component `components/ContactForm.tsx` via `fetch('/api/send-email')`.
- **Third-party scripts:** None found (no analytics, no external `<script>` tags, no CDN includes).
- **Deployment config:** No `vercel.json`, no `Dockerfile`, no `netlify.toml`, no CI workflow files (`.github/` does not exist). Build output ("Environments: .env.local") indicates local dev/build picks up `.env.local`; deployment platform config (if any) lives outside this repo.
- **Env vars used (names only):** `RESEND_API_KEY` (server-only, read in `lib/resend.ts:3,6`). No `NEXT_PUBLIC_*` variables are used anywhere in the codebase.

## 3. Findings table

| ID | OWASP Cat. | Severity | Location | Description | Fix |
|----|-----------|----------|----------|-------------|-----|
| F1 | A02 Security Misconfiguration | Medium | `next.config.ts` (entire file, stub config) | No security headers configured (CSP, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy, HSTS). | Add a `headers()` function in `next.config.ts` returning these headers for all routes (see remediation plan). |
| F2 | A06 Insecure Design | Medium | `app/api/send-email/route.ts:4-15` | No rate limiting / abuse protection on the contact-form endpoint, and no max-length validation on `name`/`subject`/`message`. An attacker can script repeated POSTs to spam the owner's inbox or exhaust Resend's send quota/cost. | Add a lightweight rate limiter (e.g. IP-based token bucket via a Vercel KV/Upstash store, or a Next.js middleware check) and enforce max field lengths (e.g. 100/200/5000 chars). |
| F3 | A05 Injection (HTML injection) | Medium | `app/api/send-email/route.ts:32-97` | `name`, `email`, `subject`, `message` are interpolated directly into an HTML string with no escaping. A submitter can inject arbitrary HTML/markup (e.g. `<img>`, styled links, or tracking pixels) into the email rendered in the owner's mail client. Not classic stored XSS (it's a one-time outbound email, not re-rendered on the site), but it is unescaped HTML injection into a message the owner will open and trust. | HTML-escape all four fields before interpolation (e.g. a small `escapeHtml()` helper), or switch to Resend's `text` field / a templating helper that escapes by default. |
| F4 | A10 Mishandling of Exceptional Conditions | Low | `app/api/send-email/route.ts:104-109` | Catch block returns `details: error.message` from the Resend SDK directly to the client, which may leak internal/provider-specific error detail (e.g. account/config state) to anyone probing the endpoint. | Log `error` server-side only (already done via `console.error`); return a generic `{ error: 'Failed to send message' }` to the client without `details`. |
| F5 | A02 Security Misconfiguration (reverse tabnabbing) | Low | `app/contact/page.tsx:47,110,117`; `components/Footer.tsx:16,23`; `components/ProjectCard.tsx:41,48` | All 7 `target="_blank"` links lack `rel="noopener noreferrer"`. The opened page can access `window.opener` and redirect the original tab (reverse tabnabbing). All targets are currently trusted static URLs (LinkedIn/GitHub/own projects), so exploitability today is low, but it's a cheap fix. | Add `rel="noopener noreferrer"` to every `target="_blank"` anchor/`Link`. |
| F6 | A03 Software Supply Chain | Low | `package.json` dependency `better-auth` (^1.5.6) | Declared as a direct dependency but unused anywhere in the source — adds unused attack surface/transitive deps and update burden with no functional benefit. | Remove `better-auth` from `package.json` if it's not planned for near-term use, or wire it up if auth is coming. |
| F7 | Info | Info | `app/api/send-email/route.ts:29` | Recipient address is hardcoded with a stale comment `// ← CHANGE THIS to your actual email` even though the address (`josh89rose@icloud.com`) appears to already be filled in — worth double-checking it's the intended live address before relying on this in production. | Verify intended recipient; remove the leftover placeholder comment once confirmed. |

No findings for: SQL/NoSQL injection (no DB), command injection (no shell-outs), `eval`/`new Function` (none found), `dangerouslySetInnerHTML` (none found), CORS misconfiguration (no CORS headers set at all — route is same-origin only by default), SSRF (no server-side fetches to user-supplied URLs), IDOR (no per-user resources), JWT/session handling (no auth).

## 4. Per-category checklist (OWASP Top 10:2025)

| Category | Status | Notes |
|---|---|---|
| A01 Broken Access Control | N/A | No protected routes, no auth, no per-user resources, no SSRF-capable server fetches, no CORS headers configured (default same-origin). |
| A02 Security Misconfiguration | **Issue** | Missing security headers (F1); reverse-tabnabbing links (F5). No debug mode left on; build produces no exposed source maps by default for production (`next build` output not inspected for `.map` files — see §7). |
| A03 Software Supply Chain Failures | **Issue** | See dependency audit below; unused `better-auth` dependency (F6); lockfile (`package-lock.json`) present and committed, which is good for reproducibility. No postinstall scripts of concern found in root `package.json`. No CI workflows exist to assess permissions on. |
| A04 Cryptographic Failures | Pass | No passwords stored, no custom crypto, no hardcoded keys found in source or git history (grepped for key/secret/password/mongodb+srv/BEGIN PRIVATE KEY patterns — none matched outside the expected `process.env.RESEND_API_KEY` reference). All hrefs use `https://`. |
| A05 Injection | **Issue** | Unescaped HTML interpolation in outbound contact-form email (F3). No SQL/NoSQL, no `eval`, no `dangerouslySetInnerHTML`. Email/subject header injection into Resend's structured API fields is unlikely (Resend takes structured JSON, not raw SMTP text) but not independently verified against Resend's server-side handling — marked needs verification below. |
| A06 Insecure Design | **Issue** | No rate limiting or input length caps on the contact form (F2). Client-side `required` validation on form fields is enforced again server-side (good — the API route re-checks required fields and email format), so business logic doesn't rely solely on client validation. |
| A07 Authentication Failures | N/A | Site is static/no accounts; marked N/A per instructions. `better-auth` present but unused (see F6) — if/when wired up, revisit this category. |
| A08 Software or Data Integrity Failures | Pass | No SRI needed (no third-party `<script>`/CDN assets found). No deserialization of untrusted data. No CI pipeline exists to assess for untrusted build inputs. |
| A09 Security Logging and Alerting Failures | **Issue** (Low/Info) | Only logging is `console.error('Email send error:', error)` in the API route — no PII/secrets logged, which is good, but there is no structured logging or alerting path for abuse (e.g. spam bursts) given F2. Acceptable for a static portfolio; call out if traffic/abuse becomes a concern. |
| A10 Mishandling of Exceptional Conditions | **Issue** | API route returns provider error detail to the client (F4). All other routes are static pages with no server I/O to fail. Next.js's built-in `app/_not-found` route handles 404s. |

## 5. Dependency audit results

**`npm audit` summary:** 25 vulnerabilities — 1 low, 6 moderate, 16 high, 2 critical. All are in transitive dependencies of dev/build tooling or the `resend` SDK's transitive chain, not in application code directly:
- `resend` → `svix` → `uuid` (<11.1.1): moderate, buffer bounds check issue in `uuid` v3/v5/v6 generation — exploitable only if your code path generates those UUID versions with attacker-controlled buffers, which this app's usage does not do directly (used internally by `svix`/`resend` SDK internals).
- `source-map-js` (1.0.0–1.2.1): high — event-loop DoS via crafted source maps; this is a build-tool/dev dependency, not shipped to the production runtime of this app.
- `@next/eslint-plugin-next` → `fast-glob`: high, lint-tooling only.
- `sharp` → librsvg CVE-2026-96889: flagged by `npm audit fix --force` path (would bump Next.js to 16.4.0 outside the stated range) — `sharp` here is a transitive image-optimization dependency of Next.js itself, not directly invoked by app code.
- `@babel/core` (≤7.29.0): low, arbitrary file read via `sourceMappingURL` — build-time only.
- `@humanfs/node` (<0.16.8): moderate, symlink-following issue in a recursive-copy helper — build tooling, not used by runtime app code.

None of these are reachable via the live request path of this app (contact form → Resend API). They do represent general supply-chain hygiene debt. Recommend running `npm audit fix` (non-breaking fixes) and tracking the `--force` (breaking) fixes separately since one would bump Next.js's minor version.

**`npm outdated` highlights (security-relevant):**
- `resend` 6.9.4 → latest 6.32.1 (23 minor versions behind) — given F3/F4 touch this package's call site, worth updating and re-testing.
- `better-auth` 1.5.6 → 1.7.7 — moot if F6 (remove unused dep) is applied.
- `next` 16.2.1 → 16.4.0 — minor version behind; review Next.js security advisories for the gap before upgrading.
- `eslint` 9.39.4 → latest major 10.12.0 — not security-critical, dev tooling only.
- `tailwindcss` 3.4.19 → latest major 4.3.3 — not security-critical.

**Lint:** `npm run lint` passes with 8 errors / 2 warnings, all code-quality/style issues (unescaped apostrophes, `any` type, a React effect anti-pattern in `ThemeToggle.tsx:12`, an `<img>` vs `next/image` suggestion) — **none are security-relevant**.

**Build:** `npm run build` completes successfully (Turbopack, Next.js 16.2.1) with no errors; TypeScript check passes.

**Secrets scan:** Grepped full `git log -p --all` and working tree for `api[_-]?key|secret|password|mongodb+srv|BEGIN PRIVATE KEY` — no hits besides the expected `process.env.RESEND_API_KEY` reference in `lib/resend.ts`. No `.env*` files are tracked by git (`git ls-files | grep -i env` returns empty); `.env.local` exists on disk only, confirmed ignored via `git check-ignore -v .env.local` → matched by `.gitignore:34`.

## 6. Prioritised remediation plan

**Quick wins (minutes, no functional risk):**
1. Add `rel="noopener noreferrer"` to all 7 `target="_blank"` links (F5).
2. Stop returning `error.message`/`details` to the client in `app/api/send-email/route.ts`; keep `console.error` server-side only (F4).
3. Remove the unused `better-auth` dependency from `package.json` if there's no near-term plan to use it (F6), or note intent to wire it up.
4. Run `npm audit fix` (non-breaking) to clear the low/moderate advisories that have safe fixes.

**Small, targeted changes (under an hour):**
5. Add a `headers()` block to `next.config.ts` for CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or `frame-ancestors 'none'` in CSP), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and `Strict-Transport-Security` (F1).
6. HTML-escape `name`, `email`, `subject`, `message` before interpolating into the email template in `app/api/send-email/route.ts` (F3). Also enforce max lengths (e.g. name ≤100, subject ≤200, message ≤5000 chars) server-side (part of F2).
7. Add basic rate limiting to `/api/send-email` (F2) — e.g. an in-memory or edge-config token bucket keyed by IP, acceptable for a low-traffic portfolio site; or a hosted option (Upstash Ratelimit) if deploying on Vercel.

**No secrets require rotation** — none were found committed in the working tree or git history. The only secret in use (`RESEND_API_KEY`, referenced in `lib/resend.ts:6`) lives solely in the untracked `.env.local`; no action needed unless this key has been shared/pasted outside the repo.

## 7. Things that could not be verified

- **Whether production source maps are publicly exposed**: this requires inspecting the actual deployed build output/CDN response, which is out of scope (no live-site probing permitted). The repo's `next.config.ts` does not explicitly disable `productionBrowserSourceMaps`, so Next's default (disabled) should apply, but this should be confirmed against the actual deployment.
- **Deployment-layer security headers**: if headers are set at the hosting platform (e.g. Vercel project settings, a CDN config) rather than in this repo, the "missing security headers" finding (F1) could already be mitigated outside the codebase — this repo has no visibility into that config.
- **Resend's own handling of header-injection characters** (CRLF) in `subject`/`replyTo` fields passed through their API — not independently verified against Resend's server-side sanitisation; flagged in F3/A05 as "needs verification" rather than a confirmed exploit.
- **CI/CD pipeline permissions** (A03/A08): no `.github/` or other CI config exists in this repo, so there is nothing to assess; if CI exists on the hosting side, it wasn't visible here.
- **Whether `josh89rose@icloud.com` (route.ts:29) is the intended final recipient** — flagged only because of the leftover placeholder comment; this is a functional question for you, not a security finding per se.
