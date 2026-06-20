import type { CommunityProfile, CommunityStats, CommunityInsights } from "../types/community";

export type DnaDimension = { label: string; score: number };

export type TopDifference = {
  text: string;
  emoji: string;
  sortKey: number;
};

export type BusRow = {
  emoji: string;
  count: number;
  label: string;
};

export type WeatherLine = {
  emoji: string;
  label: string;
  level: string;
};

export type ReportGrade = {
  subject: string;
  grade: string;
  note: string;
};

export type SimilarCommunity = {
  id: string;
  name: string;
  shortId: string;
  emoji: string;
  pctMatch: number;
};

function homeownershipPct(owner: number, total: number): number {
  return total > 0 ? Math.round((owner / total) * 100) : 0;
}

function pctLift(community: number, district: number): number {
  if (district === 0) return 0;
  return Math.round(((community - district) / district) * 100);
}

function incomeLift(community: number, district: number): number {
  return pctLift(community, district);
}

function clampScore(n: number): number {
  return Math.max(1, Math.min(10, Math.round(n)));
}

function gradeFromDelta(delta: number, thresholds: [string, number][]): string {
  for (const [grade, min] of thresholds) {
    if (delta >= min) return grade;
  }
  return "C";
}

function money(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1000)}k`;
}

function derivePersonality(s: CommunityStats, ho: number, dHo: number): CommunityInsights["personalityType"] {
  const under18 = 100 - s.pct18Plus;

  if (s.pct65Plus >= 28 && s.medianAge >= s.districtMedianAge + 6)
    return {
      emoji: "🌴",
      label: "Retirement Community",
      blurb: "Older residents, slower pace, and housing shaped by owners and seasonal homes.",
    };
  if (s.pctBachelors >= s.districtPctBachelors + 12 && s.medianIncome >= s.districtMedianIncome + 15000)
    return {
      emoji: "🎓",
      label: "Education Corridor",
      blurb: "Degrees are common and paychecks tend to reflect white-collar work.",
    };
  if (s.pctHispanic >= 70)
    return {
      emoji: "🌎",
      label: "Diverse Urban Center",
      blurb: "Latino culture is the default, not the exception, in daily life.",
    };
  if (under18 >= 24 && s.medianAge <= s.districtMedianAge - 3)
    return {
      emoji: "👨‍👩‍👧",
      label: "Family-Oriented Community",
      blurb: "Kids, schools, and young households define the rhythm here.",
    };
  if (s.medianIncome >= s.districtMedianIncome + 25000 && ho >= dHo + 5)
    return {
      emoji: "🏡",
      label: "Established Affluent Suburb",
      blurb: "Owners, higher incomes, and a settled suburban feel.",
    };
  if (s.medianAge <= s.districtMedianAge - 4 && s.pctBachelors >= 35)
    return {
      emoji: "🚀",
      label: "Emerging Innovation Hub",
      blurb: "Younger workers and college grads suggest a changing, upward-moving pocket.",
    };
  if (s.medianIncome <= s.districtMedianIncome * 0.75)
    return {
      emoji: "🏭",
      label: "Working-Class City",
      blurb: "Incomes trail the district. Grit and community ties over glossy stats.",
    };
  return {
    emoji: "🏘️",
    label: "Mixed Middle Community",
    blurb: "Close to district averages on most measures. Differences show up in the details.",
  };
}

function buildDna(s: CommunityStats, ho: number, dHo: number): DnaDimension[] {
  const ageScore = clampScore(5 + (s.medianAge - s.districtMedianAge) / 3);
  const incomeScore = clampScore(5 + (s.medianIncome - s.districtMedianIncome) / 25000);
  const eduScore = clampScore(4 + (s.pctBachelors - s.districtPctBachelors) / 5);
  const housingScore = clampScore(4 + (ho - dHo) / 8 + (s.medianHomeValue > s.districtMedianHomeValue ? 1 : -1));
  const diversityScore = clampScore(4 + Math.abs(s.pctHispanic - s.districtPctHispanic) / 8);

  return [
    { label: "Age", score: ageScore },
    { label: "Income", score: incomeScore },
    { label: "Education", score: eduScore },
    { label: "Housing", score: housingScore },
    { label: "Diversity", score: diversityScore },
  ];
}

function buildJustMovedHere(s: CommunityStats, ho: number, dHo: number): string[] {
  const lines: string[] = [
    `Your average neighbor is about ${s.medianAge} years old (district typical: ${s.districtMedianAge}).`,
  ];

  const eduLift = s.pctBachelors - s.districtPctBachelors;
  if (eduLift >= 5)
    lines.push(
      `They are ${Math.round(eduLift)} percentage points more likely to have a college degree than the typical district resident (${Math.round(s.pctBachelors)}% vs ${Math.round(s.districtPctBachelors)}%).`
    );
  else if (eduLift <= -5)
    lines.push(
      `College degrees are less common here than district-wide (${Math.round(s.pctBachelors)}% vs ${Math.round(s.districtPctBachelors)}%).`
    );
  else
    lines.push(`College rates are close to the district average (${Math.round(s.pctBachelors)}%).`);

  if (ho >= dHo + 8) lines.push("Most people own their homes. Renters are the minority.");
  else if (ho <= dHo - 8) lines.push("Renters are common. Leases outnumber deeds in many blocks.");
  else lines.push(`Homeownership (${ho}%) is close to the district (${dHo}%).`);

  const incDiff = s.medianIncome - s.districtMedianIncome;
  if (incDiff >= 15000)
    lines.push(`Household incomes run higher than the district norm (about ${money(s.medianIncome)} vs ${money(s.districtMedianIncome)}).`);
  else if (incDiff <= -15000)
    lines.push(`Household incomes trail the district (about ${money(s.medianIncome)} vs ${money(s.districtMedianIncome)}).`);
  else lines.push(`Typical household income is near the district middle (${money(s.medianIncome)}).`);

  if (s.pctHispanic >= s.districtPctHispanic + 20)
    lines.push(`${Math.round(s.pctHispanic)}% of neighbors identify as Hispanic or Latino. Spanish is part of daily life.`);
  if (s.pct65Plus >= s.districtPct65Plus + 10)
    lines.push(`Seniors are easy to spot: ${Math.round(s.pct65Plus)} of every 100 people are 65+.`);

  return lines;
}

function buildStaffBrief(s: CommunityStats, ho: number, dHo: number): string[] {
  const points: { text: string; weight: number }[] = [];

  const ageGap = s.medianAge - s.districtMedianAge;
  if (Math.abs(ageGap) >= 4)
    points.push({
      text:
        ageGap > 0
          ? `Residents are significantly older than the district average (median age ${s.medianAge} vs ${s.districtMedianAge}).`
          : `Residents skew younger than the district average (median age ${s.medianAge} vs ${s.districtMedianAge}).`,
      weight: Math.abs(ageGap),
    });

  const eduGap = s.pctBachelors - s.districtPctBachelors;
  if (Math.abs(eduGap) >= 6)
    points.push({
      text:
        eduGap > 0
          ? `Educational attainment is substantially higher (${Math.round(s.pctBachelors)}% bachelor's vs ${Math.round(s.districtPctBachelors)}% district).`
          : `Educational attainment trails the district (${Math.round(s.pctBachelors)}% vs ${Math.round(s.districtPctBachelors)}%).`,
      weight: Math.abs(eduGap),
    });

  if (ho >= dHo + 10)
    points.push({
      text: `Homeownership (${ho}%) and owner wealth signals are well above district norms (${dHo}%).`,
      weight: ho - dHo,
    });
  else if (ho <= dHo - 10)
    points.push({
      text: `Renter-heavy housing (${100 - ho}% rent) distinguishes this pocket from the district (${100 - dHo}% rent).`,
      weight: dHo - ho,
    });

  const incGap = s.medianIncome - s.districtMedianIncome;
  if (Math.abs(incGap) >= 12000)
    points.push({
      text:
        incGap > 0
          ? `Median household income (${money(s.medianIncome)}) exceeds the district (${money(s.districtMedianIncome)}).`
          : `Median household income (${money(s.medianIncome)}) lags the district (${money(s.districtMedianIncome)}).`,
      weight: Math.abs(incGap) / 2000,
    });

  const hisGap = s.pctHispanic - s.districtPctHispanic;
  if (Math.abs(hisGap) >= 15)
    points.push({
      text:
        hisGap > 0
          ? `Latino population share (${Math.round(s.pctHispanic)}%) is far above the district (${Math.round(s.districtPctHispanic)}%).`
          : `Latino population share (${Math.round(s.pctHispanic)}%) is below the district (${Math.round(s.districtPctHispanic)}%).`,
      weight: Math.abs(hisGap),
    });

  if (s.pctVacant >= s.districtPctVacant + 8)
    points.push({
      text: `Vacancy (${Math.round(s.pctVacant)}%) suggests second homes or seasonal patterns above district levels.`,
      weight: s.pctVacant - s.districtPctVacant,
    });

  if (points.length === 0)
    return [
      "This community tracks close to its district on most headline measures.",
      "Differences are subtle but show up in age, housing, and education details below.",
      "Use the top differences list for the fastest briefing.",
    ];

  return points
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((p) => p.text);
}

function buildTopDifferences(s: CommunityStats, ho: number, dHo: number): TopDifference[] {
  const under18 = 100 - s.pct18Plus;
  const dUnder18 = 100 - s.districtPct18Plus;
  const diffs: TopDifference[] = [];

  const ageGap = s.medianAge - s.districtMedianAge;
  if (Math.abs(ageGap) >= 2)
    diffs.push({
      emoji: "👴",
      text: `${ageGap > 0 ? "+" : ""}${ageGap} years older (median age)`,
      sortKey: Math.abs(ageGap) * 3,
    });

  const incPct = incomeLift(s.medianIncome, s.districtMedianIncome);
  if (Math.abs(incPct) >= 8)
    diffs.push({
      emoji: "💰",
      text: `${incPct > 0 ? "+" : ""}${incPct}% ${incPct > 0 ? "higher" : "lower"} income`,
      sortKey: Math.abs(incPct),
    });

  const eduGap = s.pctBachelors - s.districtPctBachelors;
  if (Math.abs(eduGap) >= 3)
    diffs.push({
      emoji: "🎓",
      text: `${eduGap > 0 ? "+" : ""}${Math.round(eduGap)}% more college graduates`,
      sortKey: Math.abs(eduGap) * 2,
    });

  const hoGap = ho - dHo;
  if (Math.abs(hoGap) >= 4)
    diffs.push({
      emoji: "🏠",
      text: `${hoGap > 0 ? "+" : ""}${hoGap}% ${hoGap > 0 ? "more" : "fewer"} homeowners`,
      sortKey: Math.abs(hoGap) * 2,
    });

  const kidGap = under18 - dUnder18;
  if (Math.abs(kidGap) >= 3)
    diffs.push({
      emoji: "👶",
      text: `${kidGap > 0 ? "+" : ""}${Math.round(kidGap)}% ${kidGap > 0 ? "more" : "fewer"} children under 18`,
      sortKey: Math.abs(kidGap) * 2,
    });

  const hisGap = s.pctHispanic - s.districtPctHispanic;
  if (Math.abs(hisGap) >= 5)
    diffs.push({
      emoji: "🌎",
      text: `${hisGap > 0 ? "+" : ""}${Math.round(hisGap)}% more Hispanic/Latino residents`,
      sortKey: Math.abs(hisGap),
    });

  const vacGap = s.pctVacant - s.districtPctVacant;
  if (Math.abs(vacGap) >= 4)
    diffs.push({
      emoji: "🏚️",
      text: `${vacGap > 0 ? "+" : ""}${Math.round(vacGap)}% more vacant homes`,
      sortKey: Math.abs(vacGap) * 1.5,
    });

  const seniorGap = s.pct65Plus - s.districtPct65Plus;
  if (Math.abs(seniorGap) >= 5 && Math.abs(ageGap) < 4)
    diffs.push({
      emoji: "👵",
      text: `${seniorGap > 0 ? "+" : ""}${Math.round(seniorGap)}% more seniors (65+)`,
      sortKey: Math.abs(seniorGap),
    });

  return diffs.sort((a, b) => b.sortKey - a.sortKey).slice(0, 5);
}

function buildBusRows(s: CommunityStats, ho: number): BusRow[] {
  const under18 = Math.round(100 - s.pct18Plus);
  return [
    { emoji: "🎓", count: Math.round(s.pctBachelors), label: "college graduates (25+)" },
    { emoji: "🏠", count: ho, label: "households that own their home" },
    { emoji: "👴", count: Math.round(s.pct65Plus), label: "seniors (65+)" },
    { emoji: "💼", count: Math.round(s.pctEmployed), label: "employed (16+)" },
    { emoji: "👶", count: under18, label: "children under 18" },
    { emoji: "🌎", count: Math.round(s.pctHispanic), label: "Hispanic or Latino" },
  ].filter((r) => r.count > 0);
}

function levelWord(delta: number, labels: [string, string, string]): string {
  if (delta >= 8) return labels[0];
  if (delta <= -8) return labels[2];
  return labels[1];
}

function buildWeather(s: CommunityStats, ho: number, dHo: number): WeatherLine[] {
  const under18 = 100 - s.pct18Plus;
  const dUnder18 = 100 - s.districtPct18Plus;

  return [
    {
      emoji: "🎓",
      label: "Education",
      level: levelWord(s.pctBachelors - s.districtPctBachelors, ["High", "Average", "Low"]),
    },
    {
      emoji: "💰",
      label: "Income",
      level: levelWord(incomeLift(s.medianIncome, s.districtMedianIncome), ["Above average", "Average", "Below average"]),
    },
    {
      emoji: "🏡",
      label: "Homeownership",
      level: levelWord(ho - dHo, ["Strong", "Moderate", "Weak"]),
    },
    {
      emoji: "👶",
      label: "Youth population",
      level: levelWord(under18 - dUnder18, ["High", "Moderate", "Low"]),
    },
    {
      emoji: "📈",
      label: "Affordability pressure",
      level:
        s.medianRent * 12 > s.medianIncome * 0.35
          ? "High"
          : s.medianRent * 12 > s.medianIncome * 0.28
            ? "Moderate"
            : "Lower",
    },
  ];
}

function buildReportCard(s: CommunityStats, ho: number, dHo: number): ReportGrade[] {
  const eduDelta = s.pctBachelors - s.districtPctBachelors;
  const incDelta = incomeLift(s.medianIncome, s.districtMedianIncome);
  const diversity = Math.max(s.pctHispanic, 100 - s.pctWhiteNH);

  return [
    {
      subject: "Education",
      grade: gradeFromDelta(eduDelta, [["A", 15], ["A-", 10], ["B+", 5], ["B", 0], ["B-", -5], ["C+", -10]]),
      note: `${Math.round(s.pctBachelors)}% bachelor's vs ${Math.round(s.districtPctBachelors)}% district`,
    },
    {
      subject: "Income",
      grade: gradeFromDelta(incDelta, [["A", 25], ["A-", 15], ["B+", 8], ["B", 0], ["B-", -8], ["C+", -15]]),
      note: `${money(s.medianIncome)} median household`,
    },
    {
      subject: "Housing stability",
      grade: gradeFromDelta(ho - dHo - s.pctVacant + s.districtPctVacant, [["A", 12], ["A-", 8], ["B+", 4], ["B", 0], ["B-", -4], ["C+", -8]]),
      note: `${ho}% own, ${Math.round(s.pctVacant)}% vacant`,
    },
    {
      subject: "Diversity",
      grade: gradeFromDelta(diversity - 30, [["A", 40], ["A-", 30], ["B+", 20], ["B", 10], ["B-", 0], ["C+", -10]]),
      note: `${Math.round(s.pctHispanic)}% Hispanic, mixed backgrounds`,
    },
    {
      subject: "Age balance",
      grade: gradeFromDelta(10 - Math.abs(s.medianAge - s.districtMedianAge), [["A", 8], ["A-", 6], ["B+", 4], ["B", 2], ["B-", 0], ["C+", -2]]),
      note: `Median age ${s.medianAge} (district ${s.districtMedianAge})`,
    },
  ];
}

function buildSurprise(s: CommunityStats, ho: number, dHo: number): CommunityInsights["surprise"] {
  const candidates: { headline: string; detail: string; score: number }[] = [];

  if (s.medianAge > s.districtMedianAge + 8 && s.medianHomeValue < s.districtMedianHomeValue)
    candidates.push({
      headline: "Older, but not the priciest homes",
      detail: `Median age is ${s.medianAge} (district ${s.districtMedianAge}), yet typical home value (${money(s.medianHomeValue)}) trails the district (${money(s.districtMedianHomeValue)}).`,
      score: 10,
    });

  if (s.pctBachelors > s.districtPctBachelors + 15 && s.medianIncome < s.districtMedianIncome)
    candidates.push({
      headline: "Educated, but not the richest",
      detail: `${Math.round(s.pctBachelors)}% have college degrees, yet median income (${money(s.medianIncome)}) sits below the district (${money(s.districtMedianIncome)}).`,
      score: 9,
    });

  if (s.medianIncome > s.districtMedianIncome + 20000 && ho < dHo - 10)
    candidates.push({
      headline: "High earners, lots of renters",
      detail: `Incomes are strong (${money(s.medianIncome)}), but only ${ho}% own their home vs ${dHo}% district-wide.`,
      score: 8,
    });

  if (s.pctVacant > s.districtPctVacant + 10 && s.medianIncome > s.districtMedianIncome)
    candidates.push({
      headline: "Wealthy zip, empty doors",
      detail: `${Math.round(s.pctVacant)}% of homes are vacant despite above-average incomes. Second homes or seasonal patterns may explain it.`,
      score: 8,
    });

  if (s.pctHispanic > 85 && s.pctBachelors < 25)
    candidates.push({
      headline: "Deeply Latino, fewer diplomas",
      detail: `${Math.round(s.pctHispanic)}% Hispanic, but only ${Math.round(s.pctBachelors)}% bachelor's degrees. Culture and credentials tell different stories.`,
      score: 7,
    });

  if (s.pctEmployed < s.districtPctEmployed - 8 && s.pct65Plus > s.districtPct65Plus + 10)
    candidates.push({
      headline: "Low employment, but it is mostly retirees",
      detail: `Only ${Math.round(s.pctEmployed)}% employed vs ${Math.round(s.districtPctEmployed)}% district-wide, with ${Math.round(s.pct65Plus)}% seniors. Life stage, not a broken job market.`,
      score: 7,
    });

  if (candidates.length === 0) {
    const top = buildTopDifferences(s, ho, dHo)[0];
    return {
      headline: top ? "Biggest stand-out trait" : "Close to district average",
      detail: top
        ? `${top.text}. That is the first thing staff notice when comparing to ${s.districtName}.`
        : `No single metric dominates. This community mirrors its district on most headline numbers.`,
    };
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0];
}

function similarityVector(s: CommunityStats): number[] {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  return [
    s.medianAge / 80,
    s.pctBachelors / 100,
    s.pctHispanic / 100,
    s.medianIncome / 200000,
    ho / 100,
    s.pct65Plus / 100,
  ];
}

function vectorDistance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0));
}

export function findSimilarCommunities(
  target: CommunityProfile,
  all: CommunityProfile[]
): SimilarCommunity[] {
  const tv = similarityVector(target.stats);
  return all
    .filter((c) => c.stats.id !== target.stats.id)
    .map((c) => {
      const dist = vectorDistance(tv, similarityVector(c.stats));
      const pctMatch = Math.round(Math.max(0, 100 - dist * 120));
      return {
        id: c.stats.id,
        name: c.stats.name,
        shortId: c.stats.shortId,
        emoji: c.stats.personEmoji,
        pctMatch,
      };
    })
    .sort((a, b) => b.pctMatch - a.pctMatch)
    .slice(0, 3);
}

export function buildCommunityInsights(
  s: CommunityStats,
  similarCommunities: SimilarCommunity[] = []
): CommunityInsights {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const dHo = homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH);

  return {
    justMovedHere: buildJustMovedHere(s, ho, dHo),
    staffBrief: buildStaffBrief(s, ho, dHo),
    dna: buildDna(s, ho, dHo),
    personalityType: derivePersonality(s, ho, dHo),
    topDifferences: buildTopDifferences(s, ho, dHo),
    busRows: buildBusRows(s, ho),
    weather: buildWeather(s, ho, dHo),
    reportCard: buildReportCard(s, ho, dHo),
    surprise: buildSurprise(s, ho, dHo),
    similarCommunities,
  };
}

export function attachSimilarityInsights(profiles: CommunityProfile[]): CommunityProfile[] {
  return profiles.map((p) => ({
    ...p,
    insights: {
      ...p.insights,
      similarCommunities: findSimilarCommunities(p, profiles),
    },
  }));
}
