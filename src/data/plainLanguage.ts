import type { ComparisonMetric } from "./communityProfileDemo";

/** Plain-language copy for a non-technical audience (e.g. high-school readers). */

export const friendlyIntro = {
  title: "What's this page?",
  body: "This is a neighborhood snapshot. We compare one small community inside a bigger congressional district — like comparing your classroom to your whole grade. The numbers come from the U.S. Census (official population counts).",
  districtAnalogy:
    "Think of the **district** as the whole school. The **community** is one homeroom inside it. We're asking: how is this homeroom different from the school average?",
};

export const beforeAfterCopy = {
  before: {
    label: "Before",
    title: "Stacked charts · hard to compare",
    problems: [
      "Community and district each get their own chart — you have to flip back and forth.",
      "Long paragraphs bury the big differences.",
      "No plain-language summary — you need to already know what “CVAP” or “labor force” means.",
    ],
  },
  after: {
    label: "After",
    title: "Side-by-side · insights highlighted",
    wins: [
      "Every number shows community and district on the same row — compare in one glance.",
      "Biggest differences are called out up top with a simple “so what?”",
      "Hover or tap any chart for a plain-English explanation.",
    ],
  },
};

export const sectionPlainLanguage: Record<
  string,
  { title: string; intro: string; soWhat: string }
> = {
  demographics: {
    title: "Who lives here?",
    intro: "Age, population size, and racial makeup — basically a yearbook spread for the area.",
    soWhat: "If this community is much older than the district, schools, clinics, and buses may need to serve more retirees than the district average.",
  },
  social: {
    title: "Homes & schooling",
    intro: "Household types and education levels — who lives together and how far people got in school.",
    soWhat: "Higher college rates often mean different job types and income — useful if you're planning programs or advocacy.",
  },
  economy: {
    title: "Jobs & money",
    intro: "Who's working, who's retired or not looking, and typical household income.",
    soWhat: "A lower share in the labor force often goes hand-in-hand with an older population — not necessarily “people don't want to work.”",
  },
  housing: {
    title: "Homes & rent",
    intro: "How many places are empty vs lived-in, and what homes and rent typically cost.",
    soWhat: "High vacancy can mean second homes or seasonal areas — it affects whether housing feels tight or plentiful.",
  },
};

export const metricPlainLanguage: Record<string, string> = {
  "median-age":
    "Half the people here are older than this number, half are younger. 56 vs 39 means this pocket is noticeably grayer than the district overall.",
  "age-65":
    "About 1 in 3 people here are 65+. In the wider district it's closer to 1 in 6. That's a big difference for healthcare and services.",
  bachelors:
    "Roughly 7 in 10 adults here finished college. That's higher than the district — this area skews toward degree-holders.",
  "white-nh":
    "“Non-Hispanic White” is a Census category — one way the government tracks diversity. This community is less racially mixed than the district average.",
  "labor-force":
    "People 16+ who have a job or are actively looking. Retirees count as “not in labor force” — so older areas often show lower participation.",
  vacant:
    "Empty homes as a share of all housing. 20% here vs 8% district-wide — many units may be seasonal or second homes.",
  population:
    "This community is tiny compared to the whole district — about 25,000 people vs 755,000. Changes here won't move district-wide averages much.",
  hispanic:
    "People who identify as Hispanic or Latino (any race). This community has a smaller Hispanic share than the district.",
  cvap:
    "Citizens old enough to vote. Both areas are high — most adults can participate in elections.",
  "median-income":
    "The middle household — half earn more, half less. Both are high here (coastal California), with this community slightly ahead.",
  "median-rent":
    "Typical monthly rent for renters. Both are expensive; this community's median is about $600/month higher.",
  "home-value":
    "Typical value for owners. Both around $1.2M — very high-cost market.",
};

export function plainLanguageForMetric(metric: ComparisonMetric): string {
  return (
    metricPlainLanguage[metric.id] ??
    metricPlainLanguage[metric.id.replace(/-full$/, "")] ??
    `Compare ${metric.label.toLowerCase()} between the community (blue) and the full district (gray).`
  );
}

export const glossary: Record<string, string> = {
  "Congressional Community":
    "A smaller area drawn inside a congressional district — a slice of the district people can identify with locally.",
  District:
    "The whole congressional district — everyone represented by one member of Congress in that area.",
  "Percent point (pp)":
    "When comparing percentages, “+5 pp” means five percentage points — e.g. 30% vs 25%, not “30% bigger.”",
  CVAP:
    "Citizen Voting Age Population — citizens 18+ who can vote.",
  ACS:
    "American Community Survey — Census Bureau estimates based on surveys, updated every year.",
};
