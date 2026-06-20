# Congressional Community Profile Studio

Interactive concept for [Congressional Communities](https://www.congressionalcommunities.org/). Compare **Congressional Communities** to their parent districts with plain-language storytelling, not stacked Census walls.

**Live demo:** https://dabloo26.github.io/congressional-community-profile/

## Features

- **6 communities** to explore (CA coastal, AZ desert, TX Latino, NY urban, KS rural, GA suburb)
- CA-47001 uses **real ProximityOne / ACS 2024** figures; others are realistic ACS-style contrasts
- **If This Community Were a Person**, **100 Neighbors**, **Community Wrapped** badges, guessing game
- **Community insights hub**: you just moved here, staff brief, DNA, bus of 100, top 5 differences, weather, report card, twins, surprises
- **Everyday scenes**: coffee line, bus ride, block party, and more. Stats turned into stories you can picture
- **Before / After** design problem from the job description
- Every chart ships with a **human translation** (12-year-old test)

## Stack

React · TypeScript · Vite · Tailwind CSS · Recharts

## Local dev

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` deploy via GitHub Actions to GitHub Pages.

```bash
VITE_BASE=/congressional-community-profile/ npm run build
```

## Adding communities

Edit `src/data/communities.ts`. Each entry is raw ACS-style stats; `buildProfile.ts` generates charts, badges, stories, and games automatically.
