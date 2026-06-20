import type { CommunityStats, CommunityInsights } from "../types/community";

function homeownershipPct(owner: number, total: number): number {
  return total > 0 ? Math.round((owner / total) * 100) : 0;
}

function incomeLift(community: number, district: number): number {
  if (district === 0) return 0;
  return Math.round(((community - district) / district) * 100);
}

function starsFromScore(score: number): number {
  if (score >= 14) return 5;
  if (score >= 9) return 4;
  if (score >= 5) return 3;
  if (score >= 2) return 2;
  return 1;
}

function fmtDelta(n: number, suffix = ""): string {
  const sign = n > 0 ? "+" : n < 0 ? "" : "";
  return `${sign}${n}${suffix}`;
}

function buildGlance(s: CommunityStats, ho: number, dHo: number) {
  const ageGap = s.medianAge - s.districtMedianAge;
  const incPct = incomeLift(s.medianIncome, s.districtMedianIncome);
  const eduGap = Math.round(s.pctBachelors - s.districtPctBachelors);
  const hoGap = ho - dHo;
  const hisGap = Math.round(s.pctHispanic - s.districtPctHispanic);

  return [
    {
      label: ageGap >= 0 ? "OLDER" : "YOUNGER",
      delta: `${ageGap >= 0 ? "+" : ""}${ageGap} years`,
      direction: Math.abs(ageGap) < 2 ? ("similar" as const) : ageGap > 0 ? ("higher" as const) : ("lower" as const),
    },
    {
      label: incPct >= 0 ? "RICHER" : "LOWER INCOME",
      delta: `${incPct >= 0 ? "+" : ""}${incPct}%`,
      direction: Math.abs(incPct) < 5 ? ("similar" as const) : incPct > 0 ? ("higher" as const) : ("lower" as const),
    },
    {
      label: eduGap >= 0 ? "EDUCATED" : "LESS EDUCATED",
      delta: `${eduGap >= 0 ? "+" : ""}${eduGap}%`,
      direction: Math.abs(eduGap) < 3 ? ("similar" as const) : eduGap > 0 ? ("higher" as const) : ("lower" as const),
    },
    {
      label: hoGap >= 0 ? "HOMEOWNERS" : "RENTERS",
      delta: `${hoGap >= 0 ? "+" : ""}${hoGap}%`,
      direction: Math.abs(hoGap) < 3 ? ("similar" as const) : hoGap > 0 ? ("higher" as const) : ("lower" as const),
    },
    {
      label: hisGap >= 0 ? "LATINO" : "LESS LATINO",
      delta: `${hisGap >= 0 ? "+" : ""}${hisGap}%`,
      direction: Math.abs(hisGap) < 4 ? ("similar" as const) : hisGap > 0 ? ("higher" as const) : ("lower" as const),
    },
  ];
}

function whyAge(_s: CommunityStats, ageGap: number): string {
  if (ageGap >= 5)
    return "More demand for healthcare, senior services, and accessible transportation.";
  if (ageGap >= 2)
    return "Aging population may shift clinic hours, bus routes, and Medicare casework.";
  if (ageGap <= -5)
    return "More demand for schools, childcare, and youth recreation programs.";
  if (ageGap <= -2)
    return "Younger mix may need stronger school funding and family support services.";
  return "Age profile is close to the district. Fewer age-driven service gaps.";
}

function whyIncome(_s: CommunityStats, incPct: number): string {
  if (incPct >= 15)
    return "Higher tax base potential, but also pressure on affordable housing and cost of living.";
  if (incPct >= 5)
    return "Households may have more spending power than district norms.";
  if (incPct <= -15)
    return "Higher need for workforce training, wage support, and safety-net referrals.";
  if (incPct <= -5)
    return "Residents may feel cost-of-living pressure despite district-wide averages.";
  return "Income levels track the district. Economic policy priorities look similar.";
}

function whyEducation(_s: CommunityStats, eduGap: number): string {
  if (eduGap >= 8)
    return "Stronger pipeline for professional jobs; libraries and adult education may be well used.";
  if (eduGap >= 3)
    return "College access and job training programs may resonate more here than district-wide.";
  if (eduGap <= -8)
    return "Higher need for vocational training, ESL, and adult literacy programs.";
  if (eduGap <= -3)
    return "Workforce programs and GED support may matter more than four-year college pitches.";
  return "Education levels mirror the district average.";
}

function whyHomeownership(s: CommunityStats, hoGap: number, _ho: number): string {
  if (hoGap >= 10)
    return "Stable property tax base, but renters may need stronger tenant protections elsewhere in the district.";
  if (hoGap >= 4)
    return "Home repair, property tax, and mortgage relief programs may be relevant.";
  if (hoGap <= -10)
    return "Rent stabilization, eviction prevention, and affordable housing are likely top concerns.";
  if (hoGap <= -4)
    return "More residents face lease renewals and rent hikes than the district average.";
  if (s.pctVacant > s.districtPctVacant + 6)
    return "Empty homes may signal second homes or seasonal use, not just a weak market.";
  return "Ownership and rental mix is close to the district norm.";
}

function whyHispanic(_s: CommunityStats, hisGap: number): string {
  if (hisGap >= 20)
    return "Bilingual staff, Spanish-language outreach, and immigration services may be essential.";
  if (hisGap >= 8)
    return "Outreach in Spanish and culturally specific services may outperform one-size-fits-all messaging.";
  if (hisGap <= -15)
    return "This pocket is less Latino than much of the district. Targeted outreach may need adjustment.";
  if (hisGap <= -5)
    return "Demographic mix differs from Latino-heavy parts of the same district.";
  return "Latino share is near the district average.";
}

function whyChildren(under18Gap: number): string {
  if (under18Gap >= 5)
    return "School capacity, after-school programs, and pediatric care may need extra attention.";
  if (under18Gap <= -5)
    return "Fewer children may mean declining school enrollment and less demand for youth programs.";
  return "Child population share is similar to the district.";
}

function whyVacancy(_s: CommunityStats, vacGap: number): string {
  if (vacGap >= 8)
    return "Vacant units may reflect vacation homes or seasonal patterns. Code enforcement and blight differ from urban vacancy.";
  if (vacGap >= 4)
    return "More empty homes than district norms. Watch for maintenance, security, and neighborhood vitality.";
  if (vacGap <= -4)
    return "Tighter housing supply than the district. Gentrification and displacement may be live issues.";
  return "Vacancy rates are in line with the district.";
}

function whySeniors(_s: CommunityStats, seniorGap: number): string {
  if (seniorGap >= 10)
    return "Senior centers, home health, and Medicare navigation may see heavy use.";
  if (seniorGap >= 5)
    return "More seniors than district average. Fall prevention and transit to clinics matter.";
  if (seniorGap <= -5)
    return "Fewer seniors than district norms. Youth and working-age services may dominate.";
  return "Senior share tracks the district.";
}

function buildTopDifferences(s: CommunityStats, ho: number, dHo: number) {
  const under18 = 100 - s.pct18Plus;
  const dUnder18 = 100 - s.districtPct18Plus;
  const items: {
    emoji: string;
    stat: string;
    whyItMatters: string;
    sortKey: number;
  }[] = [];

  const ageGap = s.medianAge - s.districtMedianAge;
  if (Math.abs(ageGap) >= 2) {
    items.push({
      emoji: "👴",
      stat: ageGap >= 0 ? `Median age +${ageGap} years` : `Median age ${ageGap} years`,
      whyItMatters: whyAge(s, ageGap),
      sortKey: Math.abs(ageGap) * 3,
    });
  }

  const incPct = incomeLift(s.medianIncome, s.districtMedianIncome);
  if (Math.abs(incPct) >= 8) {
    items.push({
      emoji: "💰",
      stat: `${incPct > 0 ? "+" : ""}${incPct}% median household income`,
      whyItMatters: whyIncome(s, incPct),
      sortKey: Math.abs(incPct),
    });
  }

  const eduGap = s.pctBachelors - s.districtPctBachelors;
  if (Math.abs(eduGap) >= 3) {
    items.push({
      emoji: "🎓",
      stat: `${fmtDelta(Math.round(eduGap), "%")} college graduates`,
      whyItMatters: whyEducation(s, eduGap),
      sortKey: Math.abs(eduGap) * 2,
    });
  }

  const hoGap = ho - dHo;
  if (Math.abs(hoGap) >= 4) {
    items.push({
      emoji: "🏠",
      stat: `${fmtDelta(hoGap, "%")} homeowners`,
      whyItMatters: whyHomeownership(s, hoGap, ho),
      sortKey: Math.abs(hoGap) * 2,
    });
  }

  const kidGap = under18 - dUnder18;
  if (Math.abs(kidGap) >= 3) {
    items.push({
      emoji: "👶",
      stat: `${fmtDelta(Math.round(kidGap), "%")} children under 18`,
      whyItMatters: whyChildren(kidGap),
      sortKey: Math.abs(kidGap) * 2,
    });
  }

  const hisGap = s.pctHispanic - s.districtPctHispanic;
  if (Math.abs(hisGap) >= 5) {
    items.push({
      emoji: "🌎",
      stat: `${fmtDelta(Math.round(hisGap), "%")} Hispanic/Latino residents`,
      whyItMatters: whyHispanic(s, hisGap),
      sortKey: Math.abs(hisGap),
    });
  }

  const vacGap = s.pctVacant - s.districtPctVacant;
  if (Math.abs(vacGap) >= 4) {
    items.push({
      emoji: "🏚️",
      stat: `${fmtDelta(Math.round(vacGap), "%")} vacant homes`,
      whyItMatters: whyVacancy(s, vacGap),
      sortKey: Math.abs(vacGap) * 1.5,
    });
  }

  const seniorGap = s.pct65Plus - s.districtPct65Plus;
  if (Math.abs(seniorGap) >= 5 && Math.abs(ageGap) < 4) {
    items.push({
      emoji: "👵",
      stat: `${fmtDelta(Math.round(seniorGap), "%")} residents age 65+`,
      whyItMatters: whySeniors(s, seniorGap),
      sortKey: Math.abs(seniorGap),
    });
  }

  return items.sort((a, b) => b.sortKey - a.sortKey).slice(0, 5);
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
      text: `Homeownership (${ho}%) is well above district norms (${dHo}%).`,
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
          ? `Median household income exceeds the district by a wide margin.`
          : `Median household income lags the district significantly.`,
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

  if (points.length === 0)
    return [
      "This community tracks close to its district on most headline measures.",
      "Differences are subtle. Use the glance strip and top deviations below.",
      "Open Explore the data for full ACS tables when you need exact numbers.",
    ];

  return points.sort((a, b) => b.weight - a.weight).slice(0, 3).map((p) => p.text);
}

function buildBusRows(s: CommunityStats, ho: number) {
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

function buildPolicyAreas(s: CommunityStats, ho: number, dHo: number) {
  const ageGap = s.medianAge - s.districtMedianAge;
  const seniorGap = s.pct65Plus - s.districtPct65Plus;
  const eduGap = s.pctBachelors - s.districtPctBachelors;
  const incPct = incomeLift(s.medianIncome, s.districtMedianIncome);
  const hoGap = ho - dHo;
  const vacGap = s.pctVacant - s.districtPctVacant;
  const rentBurden = (s.medianRent * 12) / s.medianIncome;
  const under18Gap = 100 - s.pct18Plus - (100 - s.districtPct18Plus);

  const healthcareScore = Math.abs(seniorGap) + Math.abs(ageGap) * 2;
  const housingScore = Math.abs(hoGap) + Math.abs(vacGap) * 1.5 + (rentBurden > 0.32 ? 8 : rentBurden > 0.25 ? 4 : 0);
  const educationScore = Math.abs(eduGap) + Math.abs(under18Gap) * 0.8;
  const transitScore = Math.abs(seniorGap) * 0.8 + Math.abs(ageGap) + (s.pctEmployed < s.districtPctEmployed - 5 ? 4 : 0);
  const econScore = Math.abs(incPct) + Math.abs(s.pctLaborForce - s.districtPctLaborForce);

  return [
    {
      area: "Healthcare",
      stars: starsFromScore(healthcareScore),
      reason:
        seniorGap >= 8 || ageGap >= 6
          ? "Older population drives clinic, Medicare, and home-health demand."
          : ageGap <= -5
            ? "Younger mix means pediatrics and maternal health over senior care."
            : "Age-driven health needs are moderate for this district slice.",
    },
    {
      area: "Housing",
      stars: starsFromScore(housingScore),
      reason:
        hoGap <= -8 || rentBurden > 0.32
          ? "Renters and cost-burdened households need housing stability focus."
          : vacGap >= 6
            ? "Vacancy and second-home patterns shape local housing policy."
            : hoGap >= 8
              ? "Owner-heavy area. Property tax and home repair programs matter."
              : "Housing mix is close to district norms.",
    },
    {
      area: "Education",
      stars: starsFromScore(educationScore),
      reason:
        under18Gap >= 5
          ? "School capacity and youth programs are a top local priority."
          : Math.abs(eduGap) >= 8
            ? "College and workforce training gaps stand out vs the district."
            : "Education needs track district averages.",
    },
    {
      area: "Transit",
      stars: starsFromScore(transitScore),
      reason:
        seniorGap >= 10 || ageGap >= 8
          ? "Seniors need reliable paratransit and clinic access."
          : s.pctEmployed < s.districtPctEmployed - 6
            ? "Lower employment may reflect retirees, not transit gaps."
            : "Commute patterns are similar to the district.",
    },
    {
      area: "Economic development",
      stars: starsFromScore(econScore),
      reason:
        incPct <= -15
          ? "Job quality and wage growth may need targeted investment."
          : incPct >= 15
            ? "Strong incomes, but watch affordability for lower-wage workers."
            : eduGap >= 10
              ? "Educated workforce may attract knowledge-economy employers."
              : "Economic profile mirrors the district.",
    },
  ].sort((a, b) => b.stars - a.stars);
}

export function buildCommunityInsights(s: CommunityStats): CommunityInsights {
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  const dHo = homeownershipPct(s.districtOwnerOccupiedHH, s.districtTotalHH);

  return {
    staffBrief: buildStaffBrief(s, ho, dHo),
    glance: buildGlance(s, ho, dHo),
    topDifferences: buildTopDifferences(s, ho, dHo),
    busRows: buildBusRows(s, ho),
    policyAreas: buildPolicyAreas(s, ho, dHo),
  };
}
