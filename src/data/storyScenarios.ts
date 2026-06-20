import type { CommunityStats, EverydayStory, SurpriseFact } from "../types/community";

function outOf(total: number, pct: number): number {
  return Math.max(0, Math.min(total, Math.round((total * pct) / 100)));
}

function homeownershipPct(owner: number, total: number): number {
  return total > 0 ? Math.round((owner / total) * 100) : 0;
}

function money(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n.toLocaleString()}`;
}

function ageWord(community: number, district: number): string {
  const diff = community - district;
  if (diff >= 8) return "much older";
  if (diff >= 3) return "a bit older";
  if (diff <= -8) return "much younger";
  if (diff <= -3) return "a bit younger";
  return "about the same age";
}

export function buildEverydayStories(s: CommunityStats): EverydayStory[] {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const dHo = homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH);
  const under18 = Math.round(100 - s.pct18Plus);
  const dUnder18 = Math.round(100 - s.districtPct18Plus);

  const coffeeSeniors = outOf(10, s.pct65Plus);
  const dCoffeeSeniors = outOf(10, s.districtPct65Plus);
  const coffeeLatino = outOf(10, s.pctHispanic);
  const dCoffeeLatino = outOf(10, s.districtPctHispanic);

  const streetVacant = outOf(20, s.pctVacant);
  const dStreetVacant = outOf(20, s.districtPctVacant);
  const streetOwners = outOf(20, ho);

  const busWorkers = outOf(40, s.pctEmployed);
  const dBusWorkers = outOf(40, s.districtPctEmployed);
  const busSeniors = outOf(40, s.pct65Plus);

  const partyKids = outOf(12, under18);
  const partySeniors = outOf(12, s.pct65Plus);
  const dPartySeniors = outOf(12, s.districtPct65Plus);

  const rentShare = Math.round((s.medianRent * 12 / s.medianIncome) * 100);
  const dRentShare = Math.round((s.districtMedianRent * 12 / s.districtMedianIncome) * 100);

  const voters = outOf(10, s.pctCVAP);
  const dVoters = outOf(10, s.districtPctCVAP);

  const stories: EverydayStory[] = [
    {
      id: "coffee",
      emoji: "☕",
      title: "The coffee line",
      hook: "Ten people ahead of you. Look around.",
      body: `About ${coffeeSeniors} look retirement age. Roughly ${coffeeLatino} might greet the barista in Spanish. Around ${outOf(10, s.pctBachelors)} probably finished college. This line feels ${ageWord(s.medianAge, s.districtMedianAge)} than a line anywhere else in ${s.districtName}.`,
      districtLine: `In the rest of the district, the same line might have only ${dCoffeeSeniors} seniors and ${dCoffeeLatino} Latino neighbors.`,
    },
    {
      id: "street",
      emoji: "🏘️",
      title: "Your block",
      hook: "Picture 20 houses on one short street.",
      body: `${streetOwners} are owner-occupied. About ${streetVacant} sit empty (second homes, between renters, or seasonal). Median home value here is ${money(s.medianHomeValue)}. That is ${s.medianHomeValue > s.districtMedianHomeValue ? "above" : "below"} the district norm of ${money(s.districtMedianHomeValue)}.`,
      districtLine: `District-wide, about ${outOf(20, dHo)} of 20 would be owned and ${dStreetVacant} might be vacant.`,
    },
    {
      id: "bus",
      emoji: "🚌",
      title: "The morning bus",
      hook: "Forty seats. Rush hour.",
      body: `${busWorkers} passengers are employed. ${busSeniors} are 65+. Median age on this bus is ${s.medianAge}, so the vibe is ${s.medianAge > s.districtMedianAge + 5 ? "quiet newspapers and crossword puzzles" : s.medianAge < s.districtMedianAge - 5 ? "backpacks and phone alarms" : "a mix of commuters and retirees"}.`,
      districtLine: `A bus sampled from the whole district might have ${dBusWorkers} workers and feel ${ageWord(s.districtMedianAge, s.medianAge)}.`,
    },
    {
      id: "party",
      emoji: "🎂",
      title: "A birthday party",
      hook: "Twelve guests. One cake.",
      body: `About ${partyKids} are under 18. ${partySeniors} are grandparents age. ${outOf(12, s.pctBachelors)} adults likely have a bachelor's degree. Someone's probably talking about ${s.medianIncome > s.districtMedianIncome ? "vacation plans" : "rent, bills, or overtime"}.`,
      districtLine: `Same party in the district average neighborhood: ${outOf(12, dUnder18)} kids, ${dPartySeniors} seniors.`,
    },
    {
      id: "paycheck",
      emoji: "💵",
      title: "Paycheck week",
      hook: "Typical household income, real life math.",
      body: `Median household earns ${money(s.medianIncome)} a year. Median rent is ${money(s.medianRent)}/mo (${rentShare}% of that income if you rent). ${ho > 55 ? "Most families own, so mortgage and equity matter more than rent." : "Many rent, so that monthly payment hits hard."}`,
      districtLine: `District median income is ${money(s.districtMedianIncome)} with rent around ${money(s.districtMedianRent)}/mo (${dRentShare}% of income).`,
    },
    {
      id: "ballot",
      emoji: "🗳️",
      title: "Election day",
      hook: "Ten adults at the polling place.",
      body: `About ${voters} are citizens old enough to vote (CVAP). ${outOf(10, s.pctMarried)} households are married couples. The community is ${s.pctHispanic > 30 ? "heavily Latino" : s.pctHispanic > 15 ? "fairly Latino" : "less Latino"} than many U.S. suburbs (${Math.round(s.pctHispanic)}% Hispanic here).`,
      districtLine: `Across ${s.districtName}, about ${dVoters} of 10 adults could vote.`,
    },
  ];

  if (s.pctHispanic >= s.districtPctHispanic + 15) {
    stories.push({
      id: "friday",
      emoji: "🌮",
      title: "Friday night",
      hook: "Where does the block go for dinner?",
      body: `${Math.round(s.pctHispanic)}% of neighbors identify as Hispanic or Latino. Walk down a busy strip and you might overhear Spanish more than English. Food, music, and family gatherings are part of daily life, not a special occasion.`,
      districtLine: `The district average is ${Math.round(s.districtPctHispanic)}% Hispanic. This place stands out.`,
    });
  }

  if (s.pctVacant >= s.districtPctVacant + 8) {
    stories.push({
      id: "seasonal",
      emoji: "🏖️",
      title: "Off-season quiet",
      hook: "Some blocks feel half asleep.",
      body: `${Math.round(s.pctVacant)}% of homes are vacant. On some streets that means second homes, snowbirds, or Airbnbs between guests. Mail piles up. Lights flip on for weekends, not weekdays.`,
      districtLine: `District vacancy is ${Math.round(s.districtPctVacant)}%. This pocket has more empty doors.`,
    });
  }

  return stories;
}

export function buildSurpriseFacts(s: CommunityStats): SurpriseFact[] {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const facts: SurpriseFact[] = [];

  const ageGap = s.medianAge - s.districtMedianAge;
  if (Math.abs(ageGap) >= 5) {
    facts.push({
      emoji: "🎂",
      headline: `${Math.abs(ageGap)}-year age gap`,
      detail: `Median resident is ${s.medianAge} here vs ${s.districtMedianAge} district-wide. That is like mixing two different graduating classes in one room.`,
    });
  }

  if (s.medianHomeValue > s.districtMedianHomeValue * 1.3) {
    facts.push({
      emoji: "🏠",
      headline: "Pricier roofs",
      detail: `Typical home value ${money(s.medianHomeValue)} beats the district ${money(s.districtMedianHomeValue)} by a wide margin.`,
    });
  }

  if (s.pctBachelors >= s.districtPctBachelors + 10) {
    facts.push({
      emoji: "📚",
      headline: "Diploma country",
      detail: `${Math.round(s.pctBachelors)}% have a bachelor's degree vs ${Math.round(s.districtPctBachelors)}% in the district. Book clubs might outnumber bowling leagues.`,
    });
  }

  if (s.pctHispanic >= 70) {
    facts.push({
      emoji: "🗣️",
      headline: "Spanish is default",
      detail: `${Math.round(s.pctHispanic)}% Hispanic. English-only signs would feel out of place on many blocks.`,
    });
  }

  if (s.medianIncome <= s.districtMedianIncome * 0.7) {
    facts.push({
      emoji: "💸",
      headline: "Tighter wallets",
      detail: `Median income ${money(s.medianIncome)} trails the district ${money(s.districtMedianIncome)}. Same grocery prices, smaller paychecks.`,
    });
  }

  if (ho <= homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH) - 15) {
    facts.push({
      emoji: "🔑",
      headline: "Renter town",
      detail: `${ho}% own their home vs ${homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH)}% district-wide. Leases outnumber deeds.`,
    });
  }

  if (facts.length < 3 && s.population < 50000) {
    facts.push({
      emoji: "🏘️",
      headline: "Small-town scale",
      detail: `${s.population.toLocaleString()} people total. You could know half the faces at the farmers market.`,
    });
  }

  if (facts.length < 3) {
    facts.push({
      emoji: "📊",
      headline: "Same country, different vibe",
      detail: `${s.shortId} sits inside ${s.districtName} but age, income, and housing tell a different story than the district average.`,
    });
  }

  return facts.slice(0, 4);
}

export function buildVividStoryParagraphs(s: CommunityStats): string[] {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const ageTone =
    s.medianAge > s.districtMedianAge + 5
      ? "quieter sidewalks and more gray hair"
      : s.medianAge < s.districtMedianAge - 5
        ? "strollers, school bells, and younger faces"
        : "a familiar suburban mix of ages";

  return [
    `Imagine two rooms inside ${s.districtName}.`,
    `Room A holds 100 people picked randomly from the whole district. Room B holds 100 from ${s.name} only.`,
    `Walk into Room B and you notice ${ageTone}. About ${Math.round(s.pct65Plus)} people are 65+. Roughly ${Math.round(s.pctHispanic)} speak Spanish at home or identify as Latino. ${ho > 60 ? "Most own their home." : "Renters are common."}`,
    `Room A feels different: median age ${s.districtMedianAge}, ${Math.round(s.districtPct65Plus)} seniors, ${Math.round(s.districtPctHispanic)}% Hispanic, incomes closer to ${money(s.districtMedianIncome)}.`,
    `That is the story Census tables are trying to tell.`,
    `That is not a spreadsheet. That is what you would feel at a block party, on a bus, or in a checkout line.`,
  ];
}

export function buildVividStoryParagraphsWithSummary(
  s: CommunityStats,
  summary: string
): string[] {
  const paras = buildVividStoryParagraphs(s);
  paras[4] = summary;
  return paras;
}