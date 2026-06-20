import type {
  CommunityProfile,
  CommunityStats,
  ComparisonMetric,
  MetricFormat,
  PersonalityBadge,
} from "../types/community";
import { SOURCE } from "../types/community";
import {
  buildEverydayStories,
  buildSurpriseFacts,
  buildVividStoryParagraphsWithSummary,
} from "./storyScenarios";
import { buildCommunityInsights } from "./communityInsights";

function m(
  id: string,
  label: string,
  community: number,
  district: number,
  format: MetricFormat,
  highlight?: boolean
): ComparisonMetric {
  return { id, label, community, district, format, highlight };
}

function pctDiff(a: number, b: number) {
  return Math.round((a - b) * 10) / 10;
}

function roundPct(n: number) {
  return Math.round(n * 10) / 10;
}

function homeownershipPct(owner: number, total: number) {
  return total > 0 ? Math.round((owner / total) * 100) : 0;
}

function otherRacePct(white: number, hispanic: number) {
  return roundPct(Math.max(0, 100 - white - hispanic));
}

function buildPlainLanguage(s: CommunityStats): Record<string, string> {
  return {
    "median-age": `Half the people here are older than ${s.medianAge}, half younger. The district typical is ${s.districtMedianAge}.`,
    "age-65": `About ${Math.round(s.pct65Plus)} in 100 people are seniors here vs ${Math.round(s.districtPct65Plus)} in the district.`,
    bachelors: `${Math.round(s.pctBachelors)}% of adults finished college here vs ${Math.round(s.districtPctBachelors)}% district-wide.`,
    "white-nh": `This pocket is ${s.pctWhiteNH > s.districtPctWhiteNH ? "less" : "more"} mixed than the district on average.`,
    "labor-force": `${Math.round(s.pctEmployed)} in 100 working-age people have a job here.`,
    vacant: `${Math.round(s.pctVacant)}% of homes sit empty here. That is ${s.pctVacant > s.districtPctVacant ? "more" : "fewer"} than the district.`,
    population: `About ${s.population.toLocaleString()} people live here inside a district of about ${s.districtPopulation.toLocaleString()}.`,
    hispanic: `${Math.round(s.pctHispanic)}% identify as Hispanic or Latino (any race).`,
    cvap: `Most adults can vote. Citizens 18+ are the majority.`,
    "median-income": `Typical household earns $${Math.round(s.medianIncome / 1000)}k vs $${Math.round(s.districtMedianIncome / 1000)}k in the district.`,
    "median-rent": `Renters typically pay $${s.medianRent.toLocaleString()}/mo vs $${s.districtMedianRent.toLocaleString()} district-wide.`,
    "home-value": `Owners' homes are worth about $${(s.medianHomeValue / 1_000_000).toFixed(1)}M on median.`,
  };
}

function buildBadges(s: CommunityStats): PersonalityBadge[] {
  const badges: PersonalityBadge[] = [];
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const dHo = homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH);

  if (s.medianAge >= s.districtMedianAge + 5)
    badges.push({
      emoji: "👴",
      title: "Older Population",
      tagline: `Median age ${s.medianAge}. Feels older than the district (${s.districtMedianAge}).`,
    });
  if (s.medianAge <= s.districtMedianAge - 4)
    badges.push({
      emoji: "🧒",
      title: "Younger Crowd",
      tagline: `Median age ${s.medianAge}. More kids and young workers than the district norm.`,
    });
  if (s.pctBachelors >= s.districtPctBachelors + 5)
    badges.push({
      emoji: "🎓",
      title: "Highly Educated",
      tagline: "College degrees are common. Diplomas are not unusual here.",
    });
  if (s.pctBachelors <= s.districtPctBachelors - 8)
    badges.push({
      emoji: "🛠️",
      title: "Trade & High School",
      tagline: "Fewer bachelor's degrees. Work experience often beats formal college.",
    });
  if (ho >= dHo + 8)
    badges.push({
      emoji: "🏡",
      title: "Homeowner Haven",
      tagline: "Most families own. Lawns and mailboxes, not landlord letters.",
    });
  if (ho <= dHo - 12)
    badges.push({
      emoji: "🏢",
      title: "Renter Town",
      tagline: "Apartments and leases outnumber deed holders.",
    });
  if (s.medianIncome >= s.districtMedianIncome + 8000)
    badges.push({
      emoji: "💰",
      title: "Higher Income",
      tagline: "Paychecks run above the district middle.",
    });
  if (s.medianIncome <= s.districtMedianIncome - 8000)
    badges.push({
      emoji: "💸",
      title: "Tighter Budgets",
      tagline: "Typical earnings trail the district. Costs still bite.",
    });
  if (s.pctHispanic >= s.districtPctHispanic + 12)
    badges.push({
      emoji: "🌮",
      title: "Latino Heart",
      tagline: "Hispanic neighbors are the plurality. Culture shows up daily.",
    });
  if (s.pctVacant >= s.districtPctVacant + 6)
    badges.push({
      emoji: "🏚️",
      title: "Seasonal Homes",
      tagline: "Empty houses are not rare. Vacations and second homes.",
    });
  if (s.population < 40000)
    badges.push({
      emoji: "🏘️",
      title: "Small & Local",
      tagline: `${s.population.toLocaleString()} people. Everyone knows the same grocery aisle.`,
    });
  if (s.population > 120000)
    badges.push({
      emoji: "🌆",
      title: "Busy & Dense",
      tagline: `${s.population.toLocaleString()} neighbors. Urban energy inside one district slice.`,
    });

  return badges.slice(0, 6);
}

function biggestDeltaMetric(s: CommunityStats): {
  correctIndex: number;
  reveals: string[];
} {
  const deltas = [
    {
      label: "More gray hair and retirees",
      score: s.pct65Plus - s.districtPct65Plus,
      reveal: `Age gap. Typical resident is ${s.medianAge} vs ${s.districtMedianAge} in the district.`,
    },
    {
      label: "More renters and apartments",
      score:
        homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH) -
        homeownershipPct(s.ownerOccupiedHH, s.totalHH),
      reveal: `Homeownership ${homeownershipPct(s.ownerOccupiedHH, s.totalHH)}% here vs ${homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH)}% district-wide.`,
    },
    {
      label: "A much younger crowd",
      score: s.districtMedianAge - s.medianAge,
      reveal: `Median age ${s.medianAge}. ${s.medianAge < s.districtMedianAge ? "Younger" : "Not younger"} than the district.`,
    },
    {
      label: "Hardly any college graduates",
      score: s.districtPctBachelors - s.pctBachelors,
      reveal: `${Math.round(s.pctBachelors)}% college grads vs ${Math.round(s.districtPctBachelors)}% in the district.`,
    },
  ];
  const sorted = [...deltas].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const correctIndex = deltas.findIndex((d) => d.label === winner.label);

  return {
    correctIndex,
    reveals: [
      winner.reveal,
      `${Math.round(s.pctBachelors)}% college grads here vs ${Math.round(s.districtPctBachelors)}% district-wide.`,
      `Typical income $${s.medianIncome.toLocaleString()} vs $${s.districtMedianIncome.toLocaleString()}.`,
      `${Math.round(s.pctHispanic)}% Hispanic vs ${Math.round(s.districtPctHispanic)}% district.`,
      `${Math.round(s.pctVacant)}% vacant housing vs ${Math.round(s.districtPctVacant)}% district-wide.`,
    ],
  };
}

function buildPerson(s: CommunityStats) {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const dHo = homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH);
  const traits: string[] = [
    `They'd be about ${s.medianAge} years old. That is ${s.medianAge > s.districtMedianAge ? "noticeably older" : s.medianAge < s.districtMedianAge ? "noticeably younger" : "about the same age"} as the typical district resident (${s.districtMedianAge}).`,
    ho > 55
      ? "They'd probably own their home. Ownership is the norm here."
      : "They'd likely rent. Apartments and leases are common.",
    s.pctBachelors > 50
      ? "They'd likely have a college degree. Most adults here finished four-year school."
      : s.pctBachelors > 30
        ? "They might have some college or a degree. It is mixed."
        : "They might have learned on the job. College is less common here.",
    s.medianIncome >= s.districtMedianIncome
      ? "Their household would earn at or above the district middle."
      : "Their household might earn less than the district average. Budgets can be tighter.",
  ];

  const parts: string[] = [];
  if (s.medianAge > s.districtMedianAge + 3) parts.push("older");
  if (s.medianAge < s.districtMedianAge - 3) parts.push("younger");
  if (s.pctBachelors > s.districtPctBachelors + 5) parts.push("more educated");
  if (s.pctBachelors < s.districtPctBachelors - 5) parts.push("less college-heavy");
  if (s.medianIncome > s.districtMedianIncome + 5000) parts.push("wealthier");
  if (s.medianIncome < s.districtMedianIncome - 5000) parts.push("lower-income");
  if (s.pctHispanic > s.districtPctHispanic + 10) parts.push("more Latino");
  if (ho > dHo + 8) parts.push("more likely to own");

  return {
    name: `Community ${s.shortId}`,
    traits,
    comparedToDistrict:
      parts.length > 0
        ? `Compared to the typical district resident, they'd be ${parts.slice(0, 4).join(", ")}.`
        : "They are fairly close to the district average. Differences are subtle.",
  };
}

export type CommunityStatsInput = CommunityStats & {
  headlineSummary: () => string;
};

export function buildCommunityProfile(s: CommunityStatsInput): CommunityProfile {
  const under18 = roundPct(100 - s.pct18Plus);
  const dUnder18 = roundPct(100 - s.districtPct18Plus);
  const age18to64 = roundPct(s.pct18Plus - s.pct65Plus);
  const dAge18to64 = roundPct(s.districtPct18Plus - s.districtPct65Plus);
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const hsNoBa = roundPct(s.pctHSGrad - s.pctBachelors);
  const dHsNoBa = roundPct(s.districtPctHSGrad - s.districtPctBachelors);

  const highlights: ComparisonMetric[] = [
    m("median-age", "Median age", s.medianAge, s.districtMedianAge, "years", true),
    m("age-65", "Population 65+", s.pct65Plus, s.districtPct65Plus, "percent", true),
    m("bachelors", "Bachelor's degree or higher", s.pctBachelors, s.districtPctBachelors, "percent", true),
    m("white-nh", "White alone (non-Hispanic)", s.pctWhiteNH, s.districtPctWhiteNH, "percent", true),
    m("labor-force", "In labor force (16+)", s.pctLaborForce, s.districtPctLaborForce, "percent", true),
    m("vacant", "Vacant housing units", s.pctVacant, s.districtPctVacant, "percent", true),
  ].sort(
    (a, b) =>
      Math.abs(pctDiff(b.community, b.district)) - Math.abs(pctDiff(a.community, a.district))
  );

  const game = biggestDeltaMetric(s);

  return {
    stats: s,
    meta: {
      communityId: s.id,
      communityLabel: s.name,
      districtId: `CD ${s.state}`,
      districtLabel: s.districtName,
      updated: s.updated,
      source: SOURCE,
      originalReportUrl: s.originalReportUrl,
    },
    headline: {
      title: s.tagline,
      summary: s.headlineSummary(),
    },
    highlights,
    sections: [
      {
        id: "demographics",
        title: "General demographics",
        metrics: [
          m("population", "Total population", s.population, s.districtPopulation, "number"),
          m("median-age-full", "Median age", s.medianAge, s.districtMedianAge, "years", true),
          m("age-18", "Population 18 and over", s.pct18Plus, s.districtPct18Plus, "percent"),
          m("age-65-full", "Population 65 and over", s.pct65Plus, s.districtPct65Plus, "percent", true),
          m("white-nh-full", "White alone (non-Hispanic)", s.pctWhiteNH, s.districtPctWhiteNH, "percent", true),
          m("hispanic", "Hispanic or Latino (any race)", s.pctHispanic, s.districtPctHispanic, "percent"),
          m("cvap", "Citizen voting-age population", s.pctCVAP, s.districtPctCVAP, "percent"),
        ],
      },
      {
        id: "social",
        title: "Social characteristics",
        metrics: [
          m("married", "Married-couple households", s.pctMarried, s.districtPctMarried, "percent"),
          m("cohabiting", "Cohabiting households", s.pctCohabiting, s.districtPctCohabiting, "percent"),
          m("in-households", "Population in households", s.pctInHouseholds, s.districtPctInHouseholds, "percent"),
          m("hs-grad", "High school graduate or higher (25+)", s.pctHSGrad, s.districtPctHSGrad, "percent"),
          m("bachelors-full", "Bachelor's degree or higher (25+)", s.pctBachelors, s.districtPctBachelors, "percent", true),
        ],
      },
      {
        id: "economy",
        title: "Economic characteristics",
        metrics: [
          m("labor-force-full", "In labor force (16+)", s.pctLaborForce, s.districtPctLaborForce, "percent", true),
          m("employed", "Employed (16+)", s.pctEmployed, s.districtPctEmployed, "percent"),
          m("unemployed", "Unemployed (16+)", s.pctUnemployed, s.districtPctUnemployed, "percent"),
          m("not-in-lf", "Not in labor force (16+)", s.pctNotInLF, s.districtPctNotInLF, "percent", true),
          m("median-income", "Median household income", s.medianIncome, s.districtMedianIncome, "currency"),
        ],
      },
      {
        id: "housing",
        title: "Housing characteristics",
        metrics: [
          m("occupied", "Occupied housing units", s.pctOccupied, s.districtPctOccupied, "percent"),
          m("vacant-full", "Vacant housing units", s.pctVacant, s.districtPctVacant, "percent", true),
          m("home-value", "Median owner-occupied home value", s.medianHomeValue, s.districtMedianHomeValue, "currency"),
          m("median-rent", "Median gross rent", s.medianRent, s.districtMedianRent, "currency"),
        ],
      },
    ],
    ageBands: [
      { band: "Under 18", community: under18, district: dUnder18 },
      { band: "18-64", community: age18to64, district: dAge18to64 },
      { band: "65+", community: s.pct65Plus, district: s.districtPct65Plus },
    ],
    raceBreakdown: [
      { group: "White (non-Hispanic)", community: s.pctWhiteNH, district: s.districtPctWhiteNH },
      { group: "Hispanic (any race)", community: s.pctHispanic, district: s.districtPctHispanic },
      {
        group: "Other / multiracial",
        community: otherRacePct(s.pctWhiteNH, s.pctHispanic),
        district: otherRacePct(s.districtPctWhiteNH, s.districtPctHispanic),
      },
    ],
    educationBands: [
      { level: "Bachelor's+", community: s.pctBachelors, district: s.districtPctBachelors },
      { level: "HS, no bachelor's", community: hsNoBa, district: dHsNoBa },
      {
        level: "Less than HS",
        community: roundPct(100 - s.pctHSGrad),
        district: roundPct(100 - s.districtPctHSGrad),
      },
    ],
    housingSnapshot: [
      { label: "Occupied", community: s.pctOccupied, district: s.districtPctOccupied },
      { label: "Vacant", community: s.pctVacant, district: s.districtPctVacant },
    ],
    hundredNeighbors: [
      {
        emoji: "👵",
        count: Math.round(s.pct65Plus),
        line: "are 65 or older",
        human: `Seniors: ${Math.round(s.pct65Plus)} here vs ${Math.round(s.districtPct65Plus)} in the district.`,
      },
      {
        emoji: "🎓",
        count: Math.round(s.pctBachelors),
        line: "adults (25+) have a bachelor's degree",
        human: `College grads: ${Math.round(s.pctBachelors)} here vs ${Math.round(s.districtPctBachelors)} district-wide.`,
      },
      {
        emoji: "🏠",
        count: ho,
        line: "households own their home",
        human: `Ownership ${ho}% vs ${homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH)}% district.`,
      },
      {
        emoji: "💼",
        count: Math.round(s.pctEmployed),
        line: "people 16+ have a job",
        human: `${Math.round(s.pctEmployed)}% employed. Retirees and workers both shape this number.`,
      },
      {
        emoji: "🌎",
        count: Math.round(s.pctHispanic),
        line: "identify as Hispanic or Latino",
        human: `Latino neighbors ${Math.round(s.pctHispanic)}% vs ${Math.round(s.districtPctHispanic)}% district.`,
      },
      {
        emoji: "🏚️",
        count: Math.round(s.pctVacant),
        line: "homes sit empty",
        human: `Empty homes ${Math.round(s.pctVacant)}% vs ${Math.round(s.districtPctVacant)}% district-wide.`,
      },
    ],
    personProfile: buildPerson(s),
    badges: buildBadges(s),
    noticeGame: {
      id: "room-100",
      prompt: `You walk into a room of 100 people from ${s.name}, then 100 from the whole district. What jumps out first?`,
      options: [
        "More gray hair and retirees",
        "More renters and apartments",
        "A much younger crowd",
        "Hardly any college graduates",
      ],
      correctOption: game.correctIndex,
      revealTitle: "Here's what the data says:",
      reveals: game.reveals,
      humanSummary: s.headlineSummary(),
    },
    story: {
      title: `The story of ${s.name}`,
      paragraphs: buildVividStoryParagraphsWithSummary(s, s.headlineSummary()),
    },
    everydayStories: buildEverydayStories(s),
    surpriseFacts: buildSurpriseFacts(s),
    insights: buildCommunityInsights(s),
    metricPlainLanguage: buildPlainLanguage(s),
  };
}

export function plainLanguageForProfile(
  profile: CommunityProfile,
  metricId: string
): string {
  const base = metricId.replace(/-full$/, "");
  return (
    profile.metricPlainLanguage[metricId] ??
    profile.metricPlainLanguage[base] ??
    `Compare ${metricId} between community and district.`
  );
}
