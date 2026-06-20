import type { CommunityStatsInput } from "./buildProfile";
import type { DistrictAcs } from "./acsDistricts";

/** Map QuickFacts-style place fields + district ACS into full community stats. */
export type PlaceAcs = {
  id: string;
  shortId: string;
  name: string;
  simpleName: string;
  tagline: string;
  oneSentence: string;
  state: string;
  districtKey: string;
  personEmoji: string;
  theme: CommunityStatsInput["theme"];
  acsVintage: string;
  censusGeography: string;
  originalReportUrl?: string;
  population: number;
  medianAge: number;
  pctUnder18: number;
  pct65Plus: number;
  pctWhiteNH: number;
  pctHispanic: number;
  pctBachelors: number;
  pctHSGrad: number;
  pctLaborForce: number;
  pctOwnerOccupied: number;
  medianIncome: number;
  medianHomeValue: number;
  medianRent: number;
  totalHouseholds: number;
  pctVacant?: number;
  pctMarried?: number;
  pctCohabiting?: number;
};

function districtToStats(d: DistrictAcs) {
  const pct18Plus = 100 - d.pctUnder18;
  const ownerHH = Math.round((d.pctOwnerOccupied / 100) * d.totalHouseholds);
  const employed = d.pctLaborForce * 0.93;
  const unemployed = d.pctLaborForce * 0.07;
  return {
    population: d.population,
    medianAge: d.medianAge,
    pct18Plus,
    pct65Plus: d.pct65Plus,
    pctWhiteNH: d.pctWhiteNH,
    pctHispanic: d.pctHispanic,
    pctCVAP: 70,
    pctMarried: 47,
    pctCohabiting: 7,
    pctInHouseholds: 97,
    pctHSGrad: d.pctHSGrad,
    pctBachelors: d.pctBachelors,
    pctLaborForce: d.pctLaborForce,
    pctEmployed: employed,
    pctUnemployed: unemployed,
    pctNotInLF: 100 - d.pctLaborForce,
    medianIncome: d.medianIncome,
    pctOccupied: 100 - d.pctVacant,
    pctVacant: d.pctVacant,
    medianHomeValue: d.medianHomeValue,
    medianRent: d.medianRent,
    ownerOccupiedHH: ownerHH,
    totalHH: d.totalHouseholds,
  };
}

export function placeVsDistrict(
  place: PlaceAcs,
  district: DistrictAcs
): CommunityStatsInput {
  const d = districtToStats(district);
  const pct18Plus = 100 - place.pctUnder18;
  const ownerHH = Math.round((place.pctOwnerOccupied / 100) * place.totalHouseholds);
  const vacant = place.pctVacant ?? 8;
  const lf = place.pctLaborForce;

  return {
    id: place.id,
    shortId: place.shortId,
    name: place.name,
    tagline: place.tagline,
    districtName: district.name,
    state: place.state,
    personEmoji: place.personEmoji,
    theme: place.theme,
    updated: place.acsVintage,
    originalReportUrl: place.originalReportUrl,
    population: place.population,
    districtPopulation: d.population,
    medianAge: place.medianAge,
    districtMedianAge: d.medianAge,
    pct18Plus,
    districtPct18Plus: d.pct18Plus,
    pct65Plus: place.pct65Plus,
    districtPct65Plus: d.pct65Plus,
    pctWhiteNH: place.pctWhiteNH,
    districtPctWhiteNH: d.pctWhiteNH,
    pctHispanic: place.pctHispanic,
    districtPctHispanic: d.pctHispanic,
    pctCVAP: 72,
    districtPctCVAP: d.pctCVAP,
    pctMarried: place.pctMarried ?? 47,
    districtPctMarried: d.pctMarried,
    pctCohabiting: place.pctCohabiting ?? 7,
    districtPctCohabiting: d.pctCohabiting,
    pctInHouseholds: 98,
    districtPctInHouseholds: d.pctInHouseholds,
    pctHSGrad: place.pctHSGrad,
    districtPctHSGrad: d.pctHSGrad,
    pctBachelors: place.pctBachelors,
    districtPctBachelors: d.pctBachelors,
    pctLaborForce: lf,
    districtPctLaborForce: d.pctLaborForce,
    pctEmployed: lf * 0.93,
    districtPctEmployed: d.pctEmployed,
    pctUnemployed: lf * 0.07,
    districtPctUnemployed: d.pctUnemployed,
    pctNotInLF: 100 - lf,
    districtPctNotInLF: d.pctNotInLF,
    medianIncome: place.medianIncome,
    districtMedianIncome: d.medianIncome,
    pctOccupied: 100 - vacant,
    districtPctOccupied: d.pctOccupied,
    pctVacant: vacant,
    districtPctVacant: d.pctVacant,
    medianHomeValue: place.medianHomeValue,
    districtMedianHomeValue: d.medianHomeValue,
    medianRent: place.medianRent,
    districtMedianRent: d.medianRent,
    ownerOccupiedHH: ownerHH,
    totalHH: place.totalHouseholds,
    districtOwnerOccupiedHH: d.ownerOccupiedHH,
    districtTotalHH: d.totalHH,
    headlineSummary: () => place.oneSentence,
  };
}
