import { buildCommunityProfile } from "./buildProfile";
import type { CommunityProfile } from "../types/community";
import type { CommunityStatsInput } from "./buildProfile";
import { acsDistricts } from "./acsDistricts";
import { placeVsDistrict } from "./fromAcs";
import { attachSimilarityInsights } from "./communityInsights";

const ACS_VINTAGE = "ACS 5-year estimates, 2020-2024 (U.S. Census Bureau)";

/** Congressional Community CA-47001: ProximityOne report, ACS 2024 5-year. */
const ca47001: CommunityStatsInput = {
  id: "CC CA 47001",
  shortId: "0647001",
  name: "Congressional Community CA-47001",
  tagline: "Older coastal community with high home prices",
  districtName: "California's 47th Congressional District",
  state: "CA",
  personEmoji: "🏖️",
  theme: {
    primary: "#0369a1",
    secondary: "#0ea5e9",
    gradient: "from-sky-600 via-blue-600 to-indigo-700",
    surface: "from-sky-50 to-blue-50",
    accent: "#0284c7",
  },
  updated: "ACS 2024 5-year (ProximityOne / Census)",
  originalReportUrl:
    "https://proximityone.com/da2/da2narrative0647001_0647_2024%205.htm",
  population: 24887,
  districtPopulation: 754999,
  medianAge: 56,
  districtMedianAge: 39,
  pct18Plus: 85.1,
  districtPct18Plus: 80.9,
  pct65Plus: 33.9,
  districtPct65Plus: 16.7,
  pctWhiteNH: 78.6,
  districtPctWhiteNH: 49.8,
  pctHispanic: 8.9,
  districtPctHispanic: 17.0,
  pctCVAP: 82.1,
  districtPctCVAP: 70.6,
  pctMarried: 50.3,
  districtPctMarried: 47.8,
  pctCohabiting: 5.6,
  districtPctCohabiting: 7.3,
  pctInHouseholds: 99.4,
  districtPctInHouseholds: 97.4,
  pctHSGrad: 97.8,
  districtPctHSGrad: 94.8,
  pctBachelors: 69.5,
  districtPctBachelors: 59.8,
  pctLaborForce: 57.1,
  districtPctLaborForce: 66.3,
  pctEmployed: 54.4,
  districtPctEmployed: 62.7,
  pctUnemployed: 2.7,
  districtPctUnemployed: 3.5,
  pctNotInLF: 42.9,
  districtPctNotInLF: 33.7,
  medianIncome: 141239,
  districtMedianIncome: 127854,
  pctOccupied: 80.0,
  districtPctOccupied: 91.8,
  pctVacant: 20.0,
  districtPctVacant: 8.2,
  medianHomeValue: 1202194,
  districtMedianHomeValue: 1190500,
  medianRent: 3429,
  districtMedianRent: 2811,
  ownerOccupiedHH: 8179,
  totalHH: 11887,
  districtOwnerOccupiedHH: 148527,
  districtTotalHH: 296904,
  headlineSummary: () =>
    "This area has many older residents, high college rates, and more empty homes than the rest of the district.",
};

const acsPlaces = [
  placeVsDistrict(
    {
      id: "ACS Laguna Beach CA",
      shortId: "Laguna Beach",
      name: "Laguna Beach, California",
      simpleName: "Laguna Beach, CA",
      tagline: "Wealthy beach town with many retirees",
      oneSentence:
        "Laguna Beach has more seniors, higher incomes, and pricier homes than the rest of CD-47.",
      state: "CA",
      districtKey: "CA-47",
      personEmoji: "🌅",
      theme: {
        primary: "#0891b2",
        secondary: "#22d3ee",
        gradient: "from-cyan-600 to-blue-700",
        surface: "from-cyan-50 to-blue-50",
        accent: "#0891b2",
      },
      acsVintage: ACS_VINTAGE,
      censusGeography: "Place (city)",
      population: 22564,
      medianAge: 51,
      pctUnder18: 15.2,
      pct65Plus: 30.1,
      pctWhiteNH: 78.8,
      pctHispanic: 9.6,
      pctBachelors: 69.3,
      pctHSGrad: 97.6,
      pctLaborForce: 61.0,
      pctOwnerOccupied: 66.1,
      medianIncome: 143843,
      medianHomeValue: 2000000,
      medianRent: 2986,
      totalHouseholds: 10839,
      pctVacant: 9,
    },
    acsDistricts["CA-47"]
  ),
  placeVsDistrict(
    {
      id: "ACS Brownsville TX",
      shortId: "Brownsville",
      name: "Brownsville, Texas",
      simpleName: "Brownsville, TX",
      tagline: "Border city, young and mostly Latino",
      oneSentence:
        "Brownsville is younger, poorer, and more Hispanic than most of CD-34, with lower college rates.",
      state: "TX",
      districtKey: "TX-34",
      personEmoji: "🌮",
      theme: {
        primary: "#c2410c",
        secondary: "#fb923c",
        gradient: "from-orange-600 to-amber-600",
        surface: "from-orange-50 to-amber-50",
        accent: "#ea580c",
      },
      acsVintage: ACS_VINTAGE,
      censusGeography: "Place (city)",
      population: 191967,
      medianAge: 33,
      pctUnder18: 28.4,
      pct65Plus: 13.0,
      pctWhiteNH: 4.4,
      pctHispanic: 94.0,
      pctBachelors: 24.5,
      pctHSGrad: 72.0,
      pctLaborForce: 59.3,
      pctOwnerOccupied: 61.7,
      medianIncome: 52130,
      medianHomeValue: 139900,
      medianRent: 923,
      totalHouseholds: 59839,
      pctVacant: 6,
    },
    acsDistricts["TX-34"]
  ),
  placeVsDistrict(
    {
      id: "ACS Scottsdale AZ",
      shortId: "Scottsdale",
      name: "Scottsdale, Arizona",
      simpleName: "Scottsdale, AZ",
      tagline: "Desert suburb with golf courses and retirees",
      oneSentence:
        "Scottsdale is older, richer, and more college-educated than the average neighborhood in CD-01.",
      state: "AZ",
      districtKey: "AZ-01",
      personEmoji: "⛳",
      theme: {
        primary: "#b45309",
        secondary: "#fbbf24",
        gradient: "from-amber-600 to-orange-600",
        surface: "from-amber-50 to-orange-50",
        accent: "#d97706",
      },
      acsVintage: ACS_VINTAGE,
      censusGeography: "Place (city)",
      population: 246170,
      medianAge: 49,
      pctUnder18: 13.9,
      pct65Plus: 26.4,
      pctWhiteNH: 77.1,
      pctHispanic: 10.6,
      pctBachelors: 61.9,
      pctHSGrad: 97.6,
      pctLaborForce: 61.2,
      pctOwnerOccupied: 67.0,
      medianIncome: 110886,
      medianHomeValue: 789800,
      medianRent: 2013,
      totalHouseholds: 118637,
      pctVacant: 11,
    },
    acsDistricts["AZ-01"]
  ),
  placeVsDistrict(
    {
      id: "ACS Flint MI",
      shortId: "Flint",
      name: "Flint, Michigan",
      simpleName: "Flint, MI",
      tagline: "Industrial city with lower incomes",
      oneSentence:
        "Flint has lower incomes, fewer college grads, and more Black residents than CD-08 overall.",
      state: "MI",
      districtKey: "MI-08",
      personEmoji: "🏭",
      theme: {
        primary: "#1d4ed8",
        secondary: "#60a5fa",
        gradient: "from-blue-700 to-slate-700",
        surface: "from-blue-50 to-slate-50",
        accent: "#2563eb",
      },
      acsVintage: ACS_VINTAGE,
      censusGeography: "Place (city)",
      population: 79735,
      medianAge: 35,
      pctUnder18: 23.6,
      pct65Plus: 14.1,
      pctWhiteNH: 33.4,
      pctHispanic: 4.5,
      pctBachelors: 14.2,
      pctHSGrad: 84.5,
      pctLaborForce: 54.5,
      pctOwnerOccupied: 53.8,
      medianIncome: 37646,
      medianHomeValue: 53500,
      medianRent: 915,
      totalHouseholds: 34572,
      pctVacant: 14,
    },
    acsDistricts["MI-08"]
  ),
  placeVsDistrict(
    {
      id: "ACS Hialeah FL",
      shortId: "Hialeah",
      name: "Hialeah, Florida",
      simpleName: "Hialeah, FL",
      tagline: "Miami-area city, mostly Cuban and Latino",
      oneSentence:
        "Hialeah is heavily Hispanic, has moderate incomes, and more renters than much of CD-27.",
      state: "FL",
      districtKey: "FL-27",
      personEmoji: "🌴",
      theme: {
        primary: "#059669",
        secondary: "#34d399",
        gradient: "from-emerald-600 to-teal-600",
        surface: "from-emerald-50 to-teal-50",
        accent: "#10b981",
      },
      acsVintage: ACS_VINTAGE,
      censusGeography: "Place (city)",
      population: 223109,
      medianAge: 46,
      pctUnder18: 19.0,
      pct65Plus: 20.0,
      pctWhiteNH: 4.0,
      pctHispanic: 96.0,
      pctBachelors: 18.0,
      pctHSGrad: 74.0,
      pctLaborForce: 60.0,
      pctOwnerOccupied: 48.0,
      medianIncome: 49200,
      medianHomeValue: 348000,
      medianRent: 1580,
      totalHouseholds: 72000,
      pctVacant: 5,
    },
    acsDistricts["FL-27"]
  ),
];

const rawCommunities: CommunityProfile[] = [
  buildCommunityProfile(ca47001),
  ...acsPlaces.map(buildCommunityProfile),
];

export const communities: CommunityProfile[] = attachSimilarityInsights(rawCommunities);

export const defaultCommunityId = communities[0].stats.id;

export function getCommunityById(id: string): CommunityProfile {
  return communities.find((c) => c.stats.id === id) ?? communities[0];
}

export function randomCommunityId(exclude?: string): string {
  const pool = communities.filter((c) => c.stats.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)].stats.id;
}

/** For dropdown labels */
export function communityOptionLabel(c: CommunityProfile): string {
  return `${c.stats.shortId} (${c.stats.state}) · ${c.headline.title}`;
}
