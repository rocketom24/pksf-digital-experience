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
- `data/` — typed content (organization, interventions, journey, digital timeline, …); real, verified PKSF information only, `TODO`-marked where unverified
- `components/layout` — Navbar, Footer, Container, Section
- `components/motion` — Reveal, Stagger, TextReveal, ImageReveal, AnimatedNumber, Parallax
- `components/navigation` — MegaMenu, MobileMenu, SearchOverlay
- `components/ui` — Button, MagneticButton, SectionLabel
