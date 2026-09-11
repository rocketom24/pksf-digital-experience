# PKSF Digital Experience

An independent, unofficial concept project. Not affiliated with or endorsed
by Palli Karma-Sahayak Foundation (PKSF).

## Creative Direction

Premium editorial digital experience telling the story of PKSF.

## Reference Philosophy

[Spector](https://spector.framer.website/) is an inspiration for:

- editorial composition
- oversized typography
- immersive scrolling
- strong visual hierarchy
- motion
- interaction
- large statements
- counters
- storytelling

Do not copy its layout, branding, text, assets or visual identity.

## Design Principles

1. Story before navigation
2. Information should be easy to discover
3. Motion should communicate hierarchy
4. Large typography creates emphasis
5. Whitespace creates premium feeling
6. Data should become visual storytelling
7. Institutional credibility must remain intact
8. Modern does not mean excessive
9. Mobile must be intentionally designed
10. Accessibility is part of the design

## Color System

Tailwind tokens defined in [`app/globals.css`](../app/globals.css) via `@theme`.

Five grounds, each a closed set of a background plus the ink levels and the
one accent that clear WCAG AA on it. See
[`components/editorial/grounds.ts`](../components/editorial/grounds.ts) —
components pick a ground, never a raw colour.

| Ground | Hex | Token | Text | Muted | Accent |
|---|---|---|---|---|---|
| Soft cream | `#F5EEDC` | `bg-parchment` | 10.88 | 6.34 | clay 5.57 |
| Warm paper | `#FFF8E8` | `bg-paper` | 11.90 | 6.93 | clay 6.09 |
| Charcoal | `#10231C` | `bg-ink` | 15.51 | 8.26 | ember 7.33 |
| PKSF green | `#006A4E` | `bg-forest` | 6.26 | 4.59 | gold 4.70 |
| Leaf green | `#3F7030` | `bg-moss` | 5.56 | 4.54 | mist 4.91 |

| Supporting | Hex | Token | Use |
|---|---|---|---|
| Deep forest | `#073B2A` | `text-on-light` | Ink on the two light grounds |
| Deep terracotta | `#9E4222` | `text-clay` | Small-text accent on light |
| Terracotta | `#D95D39` | `text-terracotta` | Large text / UI on light only |
| Golden mustard | `#D6A63A` | `text-ember` | Accent on ink |
| Pale mustard | `#EDD98C` | `text-gold` | Accent on forest |
| Pale mint | `#DDEFE5` | `text-mist` | Accent on moss |
| Silt | `#B49A72` | `text-silt` | Channels and hairlines. Never text |

Do not use green for every section. Verify every new pairing numerically
before shipping it — the ratios above are measured, not estimated.

## Typography

- Display / UI: **Bricolage Grotesque** (`font-display`, `font-sans`)
- Prose: **Newsreader** (`font-prose`) — the default `body` face
- Data, metadata, provenance: **IBM Plex Mono** (`font-mono`)

All three loaded in `app/layout.tsx`. Responsive clamp-based type scale,
defined as Tailwind `@theme` tokens in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `text-colossal` | `clamp(4rem, 13vw, 13rem)` | Short words holding the viewport |
| `text-statement` | `clamp(2.6rem, 11.5vw, 11.5rem)` | The same job for a long word |
| `text-display` | `clamp(2.5rem, 7.5vw, 6.5rem)` | Section headings |
| `text-headline` | `clamp(2rem, 4.4vw, 3.75rem)` | Sub-sections, menu items |
| `text-title` | `clamp(1.5rem, 2.6vw, 2.25rem)` | Names in a list, ledger rows |
| `text-lead` | `clamp(1.125rem, 1.25vw, 1.375rem)` | Lead prose, in the serif |
| `text-body` | `1.0625rem` | Body prose |
| `text-meta` | `0.6875rem` | Mono metadata, uppercase, 0.22em |

Do not make every heading huge.

## Grid

- **Desktop:** 12-column grid, `max-width` ~1440px, 32–48px horizontal padding
- **Tablet:** 8-column grid, 24px padding
- **Mobile:** 4-column grid, 18–20px padding

Implemented by [`components/layout/Container.tsx`](../components/layout/Container.tsx).
Use CSS grid utilities (`grid-cols-4 md:grid-cols-8 lg:grid-cols-12`) directly
inside a `Container` for page composition — no dedicated `Grid` component.

## Spacing

Tailwind's default spacing scale already matches the required scale 1:1
(spacing key × 4px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192 map to
`1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48`. No custom spacing scale needed.

Large storytelling sections may use `py-32 lg:py-48` (128–192px) vertical
spacing on desktop. See [`components/layout/Section.tsx`](../components/layout/Section.tsx).

## Motion

Motion must be systematic. Implemented with the `motion` package
(`components/motion/*`).

| Use | Duration |
|---|---|
| Fast interactions | 150–250ms |
| Standard reveals | 500–800ms |
| Hero | 800–1200ms |
| Large storytelling transitions | 1000–1500ms |

Use smooth easing and spring where appropriate. Every motion primitive
respects `prefers-reduced-motion` via `useReducedMotion()` and falls back to
an instant, fully accessible state. Animation never blocks access to
content — no scroll-jacking.

## Image Direction

Images should communicate:

- Bangladesh
- communities
- rural development
- entrepreneurship
- agriculture
- people
- climate resilience
- financial inclusion
- technology
- PKSF institutional activity

Avoid random generic corporate stock imagery or AI-looking generic imagery.

## What To Avoid

- generic NGO templates
- excessive cards
- excessive green
- random gradients
- glassmorphism everywhere
- neon colors
- excessive 3D
- random animations
- scroll-jacking
- tiny typography
- overcrowded sections
- AI-looking generic imagery
- unnecessary WebGL
