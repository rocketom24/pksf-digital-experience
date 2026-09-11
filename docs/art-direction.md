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

| Role | Hex | Tailwind token |
|---|---|---|
| Background | `#F5F4EF` | `bg-background` / `text-background` |
| Primary dark | `#111312` | `bg-ink` / `text-ink` |
| Muted | `#6F756F` | `text-muted` |
| White | `#FFFFFF` | `bg-white` / `text-white` |
| Primary PKSF-inspired green | `#1F6B4F` | `bg-green` / `text-green` |
| Deep green | `#123F31` | `bg-green-deep` |
| Soft green | `#DCE9E1` | `bg-green-soft` |
| Supporting — sand | `#D9C8A4` | `bg-sand` |
| Supporting — clay | `#9B7653` | `bg-clay` |
| Supporting — sky | `#B7CCD0` | `bg-sky` |

Do not use green for every section.

## Typography

- Display: **Instrument Serif** (`font-display`) — loaded in `app/layout.tsx`
- UI / body: **Manrope** (`font-sans`, default) — loaded in `app/layout.tsx`

Responsive clamp-based type scale, defined as Tailwind `@theme` tokens:

| Token | Class | Value |
|---|---|---|
| Hero | `text-hero` | `clamp(4rem, 9vw, 9rem)` |
| Large editorial statement | `text-editorial` | `clamp(3rem, 7vw, 7rem)` |

Do not make every heading huge. Use the standard Tailwind text scale
(`text-base`, `text-lg`, `text-2xl`, `text-4xl`, …) for everything else.

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
