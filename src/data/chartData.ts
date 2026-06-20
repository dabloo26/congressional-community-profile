/** Chart-ready datasets derived from ACS report figures. */

export type AgeBand = { band: string; community: number; district: number; tip: string };

export const ageBands: AgeBand[] = [
  {
    band: "Under 18",
    community: 14.9,
    district: 19.1,
    tip: "Kids and teens — roughly 100% minus the “18 and over” share.",
  },
  {
    band: "18–64",
    community: 51.2,
    district: 64.2,
    tip: "Working-age adults — everyone 18+ who isn't 65+.",
  },
  {
    band: "65+",
    community: 33.9,
    district: 16.7,
    tip: "Seniors — the biggest gap between community and district.",
  },
];

export type RaceSlice = { group: string; community: number; district: number; tip: string };

export const raceBreakdown: RaceSlice[] = [
  {
    group: "White (non-Hispanic)",
    community: 78.6,
    district: 49.8,
    tip: "Largest group here — much more than district average.",
  },
  {
    group: "Hispanic (any race)",
    community: 8.9,
    district: 17.0,
    tip: "Smaller Hispanic share than the district.",
  },
  {
    group: "Other / multiracial",
    community: 12.5,
    district: 33.2,
    tip: "Everyone else — includes Asian, Black, multiracial, etc. (approximate remainder).",
  },
];

export type EducationBand = { level: string; community: number; district: number; tip: string };

export const educationBands: EducationBand[] = [
  {
    level: "Bachelor's+",
    community: 69.5,
    district: 59.8,
    tip: "Finished a 4-year college degree or more.",
  },
  {
    level: "HS, no bachelor's",
    community: 28.3,
    district: 35.0,
    tip: "High school diploma or some college, but no bachelor's.",
  },
  {
    level: "Less than HS",
    community: 2.2,
    district: 5.2,
    tip: "Did not finish high school — small shares in both areas.",
  },
];

export type HousingMetric = { label: string; community: number; district: number; tip: string };

export const housingSnapshot: HousingMetric[] = [
  {
    label: "Occupied",
    community: 80.0,
    district: 91.8,
    tip: "Homes people live in.",
  },
  {
    label: "Vacant",
    community: 20.0,
    district: 8.2,
    tip: "Empty units — second homes, seasonal, or between renters.",
  },
];

/** Sample metric for before/after demo — population 65+ */
export const demoCompareMetric = {
  label: "Share of people 65+",
  community: 33.9,
  district: 16.7,
  unit: "%",
};
