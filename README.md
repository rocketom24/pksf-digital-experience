# PKSF Digital Experience

An independent, unofficial editorial concept exploring the story, reach and
digital transformation of Palli Karma-Sahayak Foundation (PKSF), Bangladesh.

**This project is not affiliated with, endorsed by, or representative of
PKSF.** It is a portfolio concept inspired by premium editorial/motion-driven
sites (e.g. [Spector](https://spector.framer.website/)) in *style only* —
composition, typography, motion and interaction quality — never in content,
branding or visual identity.

See [`docs/art-direction.md`](docs/art-direction.md) for the visual source of truth.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `docs/art-direction.md` — design system source of truth
- `data/` — typed content (organization, impact, interventions, programs, projects, digital, stories, news, publications, journey). Real, officially-sourced PKSF information only; every item carries the PKSF page it came from and every statistic carries its reporting date
- `components/editorial` — Ground, Frame, SectionHead, StatementSequence, StrategicExplorer, IndexRow
- `components/home` — Hero, DeltaRelay, ImpactLedger, HumanStory, DigitalTimeline, DigitalDirection, Plate, ProvenanceMark
- `components/layout` — Navbar, Footer, Container
- `components/motion` — MotionProvider, Reveal, Stagger, tokens, scrollRange
- `components/navigation` — SiteMenu, links
- `components/ui` — Button, CustomCursor, ScrollProgress

## Content rules

No statistic, programme, project, date or human story may be added unless it
is published by PKSF. Statistics keep their reporting date. Quotations are
reproduced verbatim or not used — no sentence is ever attributed to a named
person unless the source carries it. See the `source` field on every data
item.
