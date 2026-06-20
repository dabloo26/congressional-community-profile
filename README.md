# Congressional Community Profile

Concept redesign of a demographic comparison report — **Congressional Community CA-47001** vs **California CD-47**, using ACS 2024 data from the [ProximityOne sample report](https://proximityone.com/da2/da2narrative0647001_0647_2024%205.htm).

Built as a portfolio sample for the [Congressional Communities](https://www.congressionalcommunities.org/) Data Visualization Developer contract role.

## What this shows

- **At-a-glance headline** — plain-language story up front
- **Paired comparisons** — community and district on the same row (not stacked charts)
- **JSON-driven template** — swap `src/data/communityProfileDemo.ts` to render any geography

## Stack

React · TypeScript · Vite · Tailwind CSS

## Local dev

```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)

```bash
# If repo is github.com/you/congressional-community-profile
VITE_BASE=/congressional-community-profile/ npm run build
```

Push `dist/` to GitHub Pages, or add a GitHub Actions workflow.

## Application note

**Tools:** React + TypeScript + Tailwind with a JSON schema — embeds in an Azure/React site with no per-report hosting cost.

**Approach:** Parse structured output from the data partner into a schema; one component scales to 7,407 sub-districts. Power BI/Figma for design iteration only.
