# Site spec — Grid Day (internal name) / "Grand Jour" (site name, French)

## Language

**The site ships entirely in French.** Every label, button, and message a visitor sees is French — see `content.md` for the actual copy. This doc keeps English field names/notes for the build spec itself, but any copy example below is illustrative only; `content.md` is the source of truth for what's actually on the page.

## Overview

Two stages, one page flow. Stage 1 collects a karting RSVP under a neutral cover story. Stage 2, which every visitor reaches regardless of their stage-1 answer, is the real groomsman proposal.

Single shared URL. No per-person links — each visitor types their own name.

## Stage 1 — Grid Day RSVP

**Purpose:** collect a karting headcount, give zero indication of the real occasion.

**Content:**
- Event name / framing: a plain "guys' karting day" — see `content.md` for exact copy and the two cover-story angles (Neat sends it directly vs. Michael fronts it).
- Venue: Indoorkarting Antwerpen, Noorderlaan 95a, 2030 Antwerpen.
- Date: one confirmed date needed before build. Options on the table: Sat 20 Feb 2027 (currently favored), Sat 6 Mar 2027, Sat 13 Mar 2027. Avoid Valentine's weekend (14 Feb) — done deliberately in the original planning pass.
- Format: Grand Prix, group of 11 (10 groomsmen/witness + Neat). Venue requires 10+ for a group formula and quotes group pricing directly — no confirmed price yet.

**Fields (French labels, see `content.md`):**
- Prénom (free text, required)
- Partant ? (Oui / Non)

**On submit:** regardless of yes/no, advance to stage 2. Write the response to the Google Sheet (see "Data" below) before advancing.

## Stage 2 — the ask

**Purpose:** the actual groomsman proposal.

**Trigger:** immediately after stage-1 submit, same session, no separate visit required.

**Visual change:** the page drops the stage-1 look entirely and shifts into the wedding's visual language. Exact tokens TBD (see Open items in `CLAUDE.md`) — until then, treat this as "warmer, more intimate, distinct from the dark motorsport shell of stage 1," not a hard spec.

**Content:**
- One line of copy, unique per name — see `content.md` for the placeholder set. Same layout for all ten; only the line changes.
- Big, obvious "yes" button.
- A "no" button that is a joke: on hover/pointer-approach it dodges or shrinks away, so it can't actually be clicked in a normal way. No real decline path on this page — if someone is genuinely unable to be a groomsman, that's a conversation Neat has directly, not a website state to design for.

**On "yes":** reveal the actual event details in place — confirmed date, venue address, what to bring/wear, add-to-calendar action. Write the "yes" response to the Google Sheet.

**Open question — Michael:** Michael already knows he's the witness (he's the one fronting the stage-1 invite in one of the cover-story options). Decide before build whether he:
(a) still goes through stage 2 with his own witness-specific line, giving him a moment on-site too, or
(b) skips stage 2 entirely since it's already settled with him — his stage-1 RSVP submit could just go straight to a normal thank-you/confirmation instead of the ask.

## Data — Google Sheet

Every submission (stage 1 and stage 2) should land as a row. Suggested columns:

| column | notes |
|---|---|
| name | as typed in stage 1 (French field label: "Prénom") |
| karting_rsvp | oui / non |
| karting_submitted_at | timestamp |
| groomsman_answer | oui / (no answer expected in practice) |
| groomsman_submitted_at | timestamp |

Column headers themselves can stay in English (internal schema) — it's the values coming from the French-language form that will read "oui"/"non".

Integration approach not chosen yet — simplest is a Google Apps Script Web App bound to the sheet, which the site POSTs to directly with no backend required. Sheets API + service account is the alternative if the build ends up with a server component anyway.

## Out of scope for this pass
- Payment/logistics collection (dietary needs, race-suit sizes) — not requested, add only if Neat asks.
- Photos/video during the actual event — separate from the website.
- Post-event content on the site (a "you said yes" archive page) — not requested, worth asking about later if the site is meant to live on after the event.
