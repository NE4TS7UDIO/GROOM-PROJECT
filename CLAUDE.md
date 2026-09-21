# Grid Day — Groomsmen Proposal Site

Context primer for whoever (human or Claude Code) picks this project up. Read this first, then `docs/site-spec.md` and `docs/design-brief.md` before writing any code.

## What this is
A two-stage website Neat is using to surprise his groomsmen. Stage 1 looks like an innocent karting-day RSVP. Only after someone submits it does stage 2 unlock — the real question: "will you be my groomsman."

## Language

**The site ships entirely in French.** Every visitor-facing piece of copy — labels, buttons, headlines, the ask itself — is French. `docs/content.md` has the actual copy to use. The on-site name is **"Grand Jour"**, not "Grid Day" — a deliberate double meaning (reads as "the big day" on stage 1, and "le grand jour," the standard French phrase for a wedding day, once stage 2 flips). This repo's own docs keep "Grid Day" as the English internal working title; don't let that leak onto the site.

## The flow, in short
1. **Stage 1 — Grid Day RSVP.** Plain karting invite, zero wedding hints. Fields: name (free text — no per-person links/accounts), attending yes/no. Event is a Grand Prix session at Indoorkarting Antwerpen, Noorderlaan 95a, Antwerp, group of 11 (10 groomsmen + Neat).
2. **Submit → always continue.** Whatever they answered on karting, everyone proceeds to stage 2. Karting attendance and the groomsman ask are intentionally decoupled — a scheduling conflict never costs a groomsman.
3. **Stage 2 — the ask.** The page visually transforms: drops the dark/racing look and shifts into the wedding's visual language (tokens TBD — see Open items). One line of copy, personalized per name. Big "yes" button. The "no" button is a joke: it dodges or shrinks away from the cursor rather than being clickable normally.
4. **Yes → reveal.** Unlocks the real event details on the same page: confirmed date, address, what to bring, add-to-calendar.
5. **Every submission (both stages) writes to a Google Sheet** so Neat has a live response list without a separate dashboard. Integration approach not yet decided — likely a Google Apps Script Web App endpoint the form POSTs to (no backend needed), or the Sheets API if the build ends up with a server component.

## Design direction
Dark, aggressive, editorial motorsport look. References in `assets/references/`: Mansory (automotive tuning brand — condensed grotesk headlines, red-bled texture on near-black) and Apex Flow (extreme sports agency — dot-grid texture, bracketed micro-labels, bold stacked type). Burgundy is the single accent color, used sparingly. Full tokens, type pairing, and layout principles are in `docs/design-brief.md` — treat that as the source of truth, not the reference images directly.

## Who's being asked
Full list, roles, and personalization placeholders in `docs/content.md` and `data/groomsmen.csv`. Michael is the witness and already knows he's in — see Open items for the one unresolved question about his stage-2 treatment.

## Folder map
- `docs/site-spec.md` — full page-by-page flow, states, decline logic, data fields
- `docs/design-brief.md` — color tokens, typography, layout principles
- `docs/content.md` — actual copy: cover story, RSVP page text, ask-page lines, reveal content
- `data/groomsmen.csv` — name list with role + response-tracking columns
- `assets/references/` — the three moodboard screenshots that set the direction
- `assets/images/` — drop sourced photography here before/while building
- `assets/logos/` — wedding monogram or other marks, once available

## Open items — resolve before or during build
- Exact event date. Three Saturday options on the table (20 Feb, 6 Mar, 13 Mar 2027) — see `docs/site-spec.md`. None confirmed yet.
- Karting price per person — venue (indoorkartingantwerpen.be) is quote-only for groups, no quote requested yet.
- Whether Michael gets his own stage-2 "ask" moment (with witness-specific copy) or skips straight past it since he already knows.
- The 9 personalized one-line messages for stage 2 — currently fill-in placeholders in `docs/content.md`, need Neat's actual inside references.
- Exact color/type tokens from the RN wedding Framer site, to make the stage-2 visual flip precise rather than approximate.
- Google Sheet structure + the actual submission integration method.
