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

export type NeighborRow = {
  emoji: string;
  count: number;
  line: string;
  human: string;
};

export type PersonalityBadge = {
  emoji: string;
  title: string;
  tagline: string;
};

export type NoticeQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  revealTitle: string;
  reveals: string[];
  humanSummary: string;
};

export type SurpriseFact = {
  emoji: string;
  headline: string;
  detail: string;
};

export type EverydayStory = {
  id: string;
  emoji: string;
  title: string;
  hook: string;
  body: string;
  districtLine: string;
};

export type CommunityTheme = {
  primary: string;
  secondary: string;
  gradient: string;
  surface: string;
  accent: string;
};

export type CommunityStats = {
  id: string;
  shortId: string;
  name: string;
  tagline: string;
  districtName: string;
  state: string;
  personEmoji: string;
  theme: CommunityTheme;
  updated: string;
  originalReportUrl?: string;
  population: number;
  districtPopulation: number;
  medianAge: number;
  districtMedianAge: number;
  pct18Plus: number;
  districtPct18Plus: number;
  pct65Plus: number;
  districtPct65Plus: number;
  pctWhiteNH: number;
  districtPctWhiteNH: number;
  pctHispanic: number;
  districtPctHispanic: number;
  pctCVAP: number;
  districtPctCVAP: number;
  pctMarried: number;
  districtPctMarried: number;
  pctCohabiting: number;
  districtPctCohabiting: number;
  pctInHouseholds: number;
  districtPctInHouseholds: number;
  pctHSGrad: number;
  districtPctHSGrad: number;
  pctBachelors: number;
  districtPctBachelors: number;
  pctLaborForce: number;
  districtPctLaborForce: number;
  pctEmployed: number;
  districtPctEmployed: number;
  pctUnemployed: number;
  districtPctUnemployed: number;
  pctNotInLF: number;
  districtPctNotInLF: number;
  medianIncome: number;
  districtMedianIncome: number;
  pctOccupied: number;
  districtPctOccupied: number;
  pctVacant: number;
  districtPctVacant: number;
  medianHomeValue: number;
  districtMedianHomeValue: number;
  medianRent: number;
  districtMedianRent: number;
  ownerOccupiedHH: number;
  totalHH: number;
  districtOwnerOccupiedHH: number;
  districtTotalHH: number;
};

export type CommunityInsights = {
  staffBrief: string[];
  glance: {
    label: string;
    delta: string;
    direction: "higher" | "lower" | "similar";
  }[];
  topDifferences: {
    emoji: string;
    stat: string;
    whyItMatters: string;
  }[];
  busRows: { emoji: string; count: number; label: string }[];
  policyAreas: { area: string; stars: number; reason: string }[];
};

export type CommunityProfile = {
  stats: CommunityStats;
  meta: {
    communityId: string;
    communityLabel: string;
    districtId: string;
    districtLabel: string;
    updated: string;
    source: string;
    originalReportUrl?: string;
  };
  headline: { title: string; summary: string };
  highlights: ComparisonMetric[];
  sections: ProfileSection[];
  ageBands: { band: string; community: number; district: number }[];
  raceBreakdown: { group: string; community: number; district: number }[];
  educationBands: { level: string; community: number; district: number }[];
  housingSnapshot: { label: string; community: number; district: number }[];
  hundredNeighbors: NeighborRow[];
  personProfile: {
    name: string;
    traits: string[];
    comparedToDistrict: string;
  };
  badges: PersonalityBadge[];
  noticeGame: NoticeQuestion;
  story: { title: string; paragraphs: string[] };
  everydayStories: EverydayStory[];
  surpriseFacts: SurpriseFact[];
  insights: CommunityInsights;
  metricPlainLanguage: Record<string, string>;
};

export const SOURCE =
  "U.S. Census Bureau ACS 2024 5-year estimates & Vintage 2025 population estimates";
