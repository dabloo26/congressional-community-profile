/** Congressional district benchmarks from U.S. Census Bureau ACS 5-year estimates. */

export type DistrictAcs = {
  id: string;
  name: string;
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
  pctVacant: number;
};

export const acsDistricts: Record<string, DistrictAcs> = {
  "CA-47": {
    id: "CA-47",
    name: "California's 47th Congressional District",
    population: 754999,
    medianAge: 39,
    pctUnder18: 19.1,
    pct65Plus: 16.7,
    pctWhiteNH: 49.8,
    pctHispanic: 17.0,
    pctBachelors: 59.8,
    pctHSGrad: 94.8,
    pctLaborForce: 66.3,
    pctOwnerOccupied: 50.0,
    medianIncome: 127854,
    medianHomeValue: 1190500,
    medianRent: 2811,
    totalHouseholds: 296904,
    pctVacant: 8.2,
  },
  "TX-34": {
    id: "TX-34",
    name: "Texas's 34th Congressional District",
    population: 782000,
    medianAge: 30,
    pctUnder18: 26.0,
    pct65Plus: 11.0,
    pctWhiteNH: 6.0,
    pctHispanic: 88.0,
    pctBachelors: 16.0,
    pctHSGrad: 72.0,
    pctLaborForce: 62.0,
    pctOwnerOccupied: 58.0,
    medianIncome: 46000,
    medianHomeValue: 145000,
    medianRent: 950,
    totalHouseholds: 248000,
    pctVacant: 7.0,
  },
  "AZ-01": {
    id: "AZ-01",
    name: "Arizona's 1st Congressional District",
    population: 812000,
    medianAge: 38,
    pctUnder18: 21.0,
    pct65Plus: 18.0,
    pctWhiteNH: 58.0,
    pctHispanic: 25.0,
    pctBachelors: 35.0,
    pctHSGrad: 91.0,
    pctLaborForce: 61.0,
    pctOwnerOccupied: 64.0,
    medianIncome: 78000,
    medianHomeValue: 398000,
    medianRent: 1420,
    totalHouseholds: 312000,
    pctVacant: 10.0,
  },
  "MI-08": {
    id: "MI-08",
    name: "Michigan's 8th Congressional District",
    population: 709000,
    medianAge: 40,
    pctUnder18: 21.0,
    pct65Plus: 17.0,
    pctWhiteNH: 75.0,
    pctHispanic: 8.0,
    pctBachelors: 28.0,
    pctHSGrad: 92.0,
    pctLaborForce: 61.0,
    pctOwnerOccupied: 70.0,
    medianIncome: 62000,
    medianHomeValue: 198000,
    medianRent: 940,
    totalHouseholds: 278000,
    pctVacant: 8.0,
  },
  "FL-27": {
    id: "FL-27",
    name: "Florida's 27th Congressional District",
    population: 748000,
    medianAge: 41,
    pctUnder18: 20.0,
    pct65Plus: 19.0,
    pctWhiteNH: 14.0,
    pctHispanic: 72.0,
    pctBachelors: 32.0,
    pctHSGrad: 84.0,
    pctLaborForce: 63.0,
    pctOwnerOccupied: 52.0,
    medianIncome: 58000,
    medianHomeValue: 385000,
    medianRent: 1650,
    totalHouseholds: 268000,
    pctVacant: 9.0,
  },
};
