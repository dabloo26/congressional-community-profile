/** Plain-language copy. Short sentences. No jargon unless explained. */

export const designPrinciple =
  "The fastest way to understand how one community differs from its district.";

export const beforeAfterCopy = {
  before: {
    label: "Before",
    title: "Stacked charts. Hard to compare.",
    problems: [
      "Community and district each get their own chart. You flip back and forth.",
      "Long paragraphs hide the big differences.",
      "Words like CVAP or labor force come with no explanation.",
    ],
  },
  after: {
    label: "After",
    title: "Side by side. Easy to read.",
    wins: [
      "Community and district sit on the same row for every number.",
      "Big differences are called out up top.",
      "Every chart has a green 'In plain English' box.",
    ],
  },
};

export const sectionPlainLanguage: Record<
  string,
  { title: string; intro: string; soWhat: string }
> = {
  demographics: {
    title: "Who lives here?",
    intro: "Age, race, and how many people live in the area.",
    soWhat: "Older areas may need more clinics and buses. Younger areas may need more schools.",
  },
  social: {
    title: "Homes and school",
    intro: "Who lives together and how far people got in school.",
    soWhat: "More college grads often means different jobs and pay in the area.",
  },
  economy: {
    title: "Jobs and pay",
    intro: "Who works, who is retired, and typical household income.",
    soWhat: "Fewer workers can mean more retirees, not that people are lazy.",
  },
  housing: {
    title: "Homes and rent",
    intro: "Who owns, who rents, and what homes cost.",
    soWhat: "Empty homes can mean vacation houses or places between renters.",
  },
};

export const glossary: Record<string, string> = {
  "Congressional Community":
    "A small area drawn inside a congressional district. A slice of the district.",
  District: "The whole congressional district. Everyone in that U.S. House seat.",
  "Percent point (pp)":
    "Comparing percentages. +5 pp means five percentage points (30% vs 25%), not 30% bigger.",
  CVAP: "Citizens age 18+ who can vote.",
  ACS: "American Community Survey. Census Bureau estimates from surveys, updated each year.",
};
