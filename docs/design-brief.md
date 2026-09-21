# Design brief — Grid Day (Stage 1)

Covers stage 1 only (the karting shell). Stage 2 shifts into the wedding's visual language, which isn't specified yet — pull real tokens from the RN wedding Framer site before designing that stage rather than guessing.

## Direction

Dark, aggressive, editorial motorsport. Two references set this, both in `assets/references/`:

- **Mansory** (automotive tuning brand) — near-black ground with a blood-red bled texture at the edges, huge condensed grotesk headlines stacked tight, thin all-caps tracked-out labels, hairline double-rule dividers, muted grey caption text. Reads expensive and a little aggressive.
- **Apex Flow** (extreme sports agency) — black canvas, dot-grid graph-paper texture, a hand-drawn orange route line with waypoint dots, bracketed micro-labels like `[ UPROCK ]`, a sitemap rendered as a timed structure diagram. Technical-diagram-as-decoration.

Common thread to build from: dark-dominant ground, one saturated accent doing all the color work, monospace/technical data treated as a design element (times, counts, coordinates) rather than hidden in a footer, condensed/grotesk display type stacked large, hairline rules instead of cards or shadows.

Accent color: **burgundy**, not the bright red/orange either reference actually uses. Keep it desaturated enough to read as wine/blood rather than a stoplight — see tokens below.

This is a deliberate single-world design (committed dark aesthetic, not a light/dark togglable UI) — no need to build a light theme for stage 1.

## Color tokens

```
--bg:          #0c0a0b   /* near-black, faint warm/red undertone */
--surface:     #161113   /* lifted panel / card ground, barely distinct from bg */
--ink:         #f3eeee   /* primary text, warm off-white, not pure white */
--muted:       #9c8d8f   /* secondary text, warm grey */
--line:        #2b2224   /* hairline dividers, low-contrast on purpose */
--accent:      #7a1a2b   /* burgundy — buttons, links, small highlights */
--accent-hi:   #a3283e   /* lighter burgundy for hover states / dark-on-dark contrast */
--accent-ink:  #f7ecee   /* text/icons sitting on a burgundy fill */
```

Use burgundy sparingly: CTA fill, link color, thin accent rules, small highlighted numerals. Never as a dominant background — the ground stays near-black.

## Typography

- **Display / headlines:** a bold condensed grotesk — e.g. Big Shoulders Display at 800–900 weight. Stack lines tight (line-height ~0.95), set large, uppercase where it reads as a label rather than a sentence.
- **Data / technical labels:** a monospace — e.g. JetBrains Mono or Space Mono. Use for anything that reads as a readout: dates, times, headcounts, bracketed eyebrows (`[ GRID DAY ]`), tabular figures.
- **Body copy:** a plain grotesk distinct from the display face — e.g. Archivo or Work Sans, regular weight, generous line-height, kept short (this is a one-screen RSVP, not an essay).

## Layout principles

- Full-bleed dark canvas, generous negative space — don't fill every corner.
- Hairline rules (1px, low-opacity `--line`) to separate sections instead of card borders/shadows.
- A subtle dot-grid or grain texture behind key sections (Apex Flow's graph-paper feel) — keep it faint enough not to fight the type.
- Bracketed micro-labels as eyebrows/category tags: `[ GRID DAY ]`, `[ ANTWERP ]`.
- At least one "data readout" moment on stage 1 — e.g. a countdown to the event date, or the group headcount, rendered in the monospace face at a large size, tabular numerals. This is the one place the racing-dashboard feeling should be explicit rather than just texture.
- Asymmetric, editorial grid for content blocks rather than centered/stacked sections — pulls from how Mansory and Apex Flow both break the centered-hero convention.

## What to avoid

- Checkered-flag clip art, trophy emoji, anything that reads as a party invite rather than a motorsport brand site.
- Bright stoplight red or orange as the accent — that's what the references use; burgundy is the deliberate departure.
- Rounded, soft UI (big radii, drop shadows, pastel cards) — everything here should feel hard-edged and precise.
