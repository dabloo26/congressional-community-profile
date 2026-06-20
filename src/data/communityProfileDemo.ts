/** ACS 2024 5-year estimates — CC CA 47001 vs CD119 CA 47 (ProximityOne sample). */

export type MetricFormat = "number" | "percent" | "currency" | "years";

export type ComparisonMetric = {
  id: string;
  label: string;
  community: number;
  district: number;
  format: MetricFormat;
  highlight?: boolean;
};

export type ProfileSection = {
  id: string;
  title: string;
  metrics: ComparisonMetric[];
};

export const communityProfileMeta = {
  communityId: "CC CA 47001",
  communityLabel: "Congressional Community CA-47001",
  districtId: "CD119 CA 47",
  districtLabel: "California's 47th Congressional District",
  updated: "June 2, 2026",
  source: "U.S. Census Bureau ACS 2024 5-year estimates & Vintage 2025 population estimates",
  originalReportUrl:
    "https://proximityone.com/da2/da2narrative0647001_0647_2024%205.htm",
};

export const profileHeadline = {
  title: "An older, more educated coastal community",
  summary:
    "Compared to its parent district, this community skews significantly older, has a higher share of college graduates, and is less diverse — with notably more vacant housing.",
};

export const profileHighlights: ComparisonMetric[] = [
  {
    id: "median-age",
    label: "Median age",
    community: 56,
    district: 39,
    format: "years",
    highlight: true,
  },
  {
    id: "age-65",
    label: "Population 65+",
    community: 33.9,
    district: 16.7,
    format: "percent",
    highlight: true,
  },
  {
    id: "bachelors",
    label: "Bachelor's degree or higher",
    community: 69.5,
    district: 59.8,
    format: "percent",
    highlight: true,
  },
  {
    id: "white-nh",
    label: "White alone (non-Hispanic)",
    community: 78.6,
    district: 49.8,
    format: "percent",
    highlight: true,
  },
  {
    id: "labor-force",
    label: "In labor force (16+)",
    community: 57.1,
    district: 66.3,
    format: "percent",
    highlight: true,
  },
  {
    id: "vacant",
    label: "Vacant housing units",
    community: 20.0,
    district: 8.2,
    format: "percent",
    highlight: true,
  },
];

export const profileSections: ProfileSection[] = [
  {
    id: "demographics",
    title: "General demographics",
    metrics: [
      {
        id: "population",
        label: "Total population",
        community: 24887,
        district: 754999,
        format: "number",
      },
      {
        id: "median-age-full",
        label: "Median age",
        community: 56,
        district: 39,
        format: "years",
        highlight: true,
      },
      {
        id: "age-18",
        label: "Population 18 and over",
        community: 85.1,
        district: 80.9,
        format: "percent",
      },
      {
        id: "age-65-full",
        label: "Population 65 and over",
        community: 33.9,
        district: 16.7,
        format: "percent",
        highlight: true,
      },
      {
        id: "white-nh-full",
        label: "White alone (non-Hispanic)",
        community: 78.6,
        district: 49.8,
        format: "percent",
        highlight: true,
      },
      {
        id: "hispanic",
        label: "Hispanic or Latino (any race)",
        community: 8.9,
        district: 17.0,
        format: "percent",
      },
      {
        id: "cvap",
        label: "Citizen voting-age population",
        community: 82.1,
        district: 70.6,
        format: "percent",
      },
    ],
  },
  {
    id: "social",
    title: "Social characteristics",
    metrics: [
      {
        id: "married",
        label: "Married-couple households",
        community: 50.3,
        district: 47.8,
        format: "percent",
      },
      {
        id: "cohabiting",
        label: "Cohabiting households",
        community: 5.6,
        district: 7.3,
        format: "percent",
      },
      {
        id: "in-households",
        label: "Population in households",
        community: 99.4,
        district: 97.4,
        format: "percent",
      },
      {
        id: "hs-grad",
        label: "High school graduate or higher (25+)",
        community: 97.8,
        district: 94.8,
        format: "percent",
      },
      {
        id: "bachelors-full",
        label: "Bachelor's degree or higher (25+)",
        community: 69.5,
        district: 59.8,
        format: "percent",
        highlight: true,
      },
    ],
  },
  {
    id: "economy",
    title: "Economic characteristics",
    metrics: [
      {
        id: "labor-force-full",
        label: "In labor force (16+)",
        community: 57.1,
        district: 66.3,
        format: "percent",
        highlight: true,
      },
      {
        id: "employed",
        label: "Employed (16+)",
        community: 54.4,
        district: 62.7,
        format: "percent",
      },
      {
        id: "unemployed",
        label: "Unemployed (16+)",
        community: 2.7,
        district: 3.5,
        format: "percent",
      },
      {
        id: "not-in-lf",
        label: "Not in labor force (16+)",
        community: 42.9,
        district: 33.7,
        format: "percent",
        highlight: true,
      },
      {
        id: "median-income",
        label: "Median household income",
        community: 141239,
        district: 127854,
        format: "currency",
      },
    ],
  },
  {
    id: "housing",
    title: "Housing characteristics",
    metrics: [
      {
        id: "occupied",
        label: "Occupied housing units",
        community: 80.0,
        district: 91.8,
        format: "percent",
      },
      {
        id: "vacant-full",
        label: "Vacant housing units",
        community: 20.0,
        district: 8.2,
        format: "percent",
        highlight: true,
      },
      {
        id: "home-value",
        label: "Median owner-occupied home value",
        community: 1202194,
        district: 1190500,
        format: "currency",
      },
      {
        id: "median-rent",
        label: "Median gross rent",
        community: 3429,
        district: 2811,
        format: "currency",
      },
    ],
  },
];
