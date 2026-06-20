/**
 * Human-first storytelling derived from ACS figures.
 * Every stat here maps to communityProfileDemo / chartData — no invented numbers.
 */

export const communityPersonId = "0647001";

/** Homeownership: owner-occupied households / total households */
export const homeownership = {
  community: Math.round((8179 / 11887) * 100), // 69
  district: Math.round((148527 / 296904) * 100), // 50
};

export const personProfile = {
  name: `Community ${communityPersonId}`,
  traits: [
    "They'd be about 56 years old — more than a decade older than the typical person in the wider district.",
    "They'd probably own their home, not rent — homeownership here is well above the district norm.",
    "They'd likely have a college degree — most adults in this area finished four-year school.",
    "Their household would earn a bit more than the typical district family — both are affluent, but this pocket is ahead.",
    "They might be retired or not looking for work — common when a neighborhood skews older.",
  ],
  comparedToDistrict:
    "Compared to the typical district resident, they'd be older, wealthier, more likely to own their home, and more likely to hold a degree.",
};

export type NeighborRow = {
  emoji: string;
  count: number;
  line: string;
  human: string;
};

/** Out of 100 people (or adults where noted) in this community */
export const hundredNeighbors: NeighborRow[] = [
  {
    emoji: "👵",
    count: 34,
    line: "are 65 or older",
    human: "About a third of the people you'd meet are seniors — in the district it's closer to 1 in 6.",
  },
  {
    emoji: "🎓",
    count: 70,
    line: "adults (25+) have a bachelor's degree",
    human: "Walk into a coffee shop of grown-ups — 7 in 10 likely went to college.",
  },
  {
    emoji: "🏠",
    count: homeownership.community,
    line: "households own their home",
    human: "Most families here are owners, not renters — flip that in the wider district.",
  },
  {
    emoji: "💼",
    count: 54,
    line: "people 16+ have a job",
    human: "Fewer people are clocking in here — not because it's lazy, but because more folks are retired.",
  },
  {
    emoji: "💑",
    count: 50,
    line: "households are married couples",
    human: "About half of homes are married pairs — roughly similar to the district.",
  },
  {
    emoji: "🏚️",
    count: 20,
    line: "homes sit empty",
    human: "1 in 5 addresses has nobody living there — often second homes or seasonal places.",
  },
];

export type PersonalityBadge = {
  emoji: string;
  title: string;
  tagline: string;
};

export const communityBadges: PersonalityBadge[] = [
  {
    emoji: "👴",
    title: "Older Population",
    tagline: "Median age 56 — the district feels much younger at 39.",
  },
  {
    emoji: "🎓",
    title: "Highly Educated",
    tagline: "College grads everywhere — a diploma is the norm, not the exception.",
  },
  {
    emoji: "🏡",
    title: "Homeowner Community",
    tagline: "Owning beats renting here more than in the district overall.",
  },
  {
    emoji: "💰",
    title: "Higher Income",
    tagline: "Typical household brings home more than the district median.",
  },
  {
    emoji: "🌊",
    title: "Coastal & Affluent",
    tagline: "Million-dollar homes and pricey rent — this is an expensive address.",
  },
  {
    emoji: "🏘️",
    title: "Small & Distinct",
    tagline: "~25,000 people — a tight pocket inside a huge district.",
  },
];

export type NoticeQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  revealTitle: string;
  reveals: string[];
  humanSummary: string;
};

export const noticeGame: NoticeQuestion = {
  id: "room-100",
  prompt:
    "You walk into a room with 100 people from this community, then a room with 100 from the whole district. What would you notice first?",
  options: [
    "More gray hair and retirees",
    "More renters and apartment buildings",
    "A much younger crowd",
    "Hardly any college graduates",
  ],
  correctOption: 0,
  revealTitle: "You'd notice the age gap first.",
  reveals: [
    "The community is much older — typical resident age 56 vs 39 in the district (+17 years).",
    "More people finished college here — about 7 in 10 adults vs 6 in 10 district-wide.",
    "Homeownership runs higher — most families own; the district is closer to half-and-half.",
    "Household income is higher on average — both areas are wealthy, but this pocket leads.",
    "More empty homes — seasonal and second homes are common here.",
  ],
  humanSummary:
    "It's not subtle: this room feels like a retirement-adjacent, college-educated homeowners' association. The district room feels younger and more mixed.",
};

export const communityStory = {
  title: "The story behind the numbers",
  paragraphs: [
    "Imagine two neighboring towns in the same congressional district.",
    "In one, the person you meet at the grocery store is usually around 39 years old — students, young families, people mid-career.",
    "In the other, that typical person is 56. You're more likely to bump into retirees on a morning walk, long-term homeowners who've been here for decades, and neighbors who finished college before many of today's renters were born.",
    "That's exactly what we see in Community 0647001. It's not worse or better — it's different. Smaller, older, more settled, more expensive, with more empty houses waiting for weekend visitors.",
    "That's the kind of story congressional staffers, journalists, and neighbors actually remember — not a wall of percentages.",
  ],
};

export const designPrinciple =
  "Every number on this page has a human translation. If a 12-year-old wouldn't get it, we rewrite it until they would.";

/** Human lines for chart blocks (required alongside every visualization) */
export const chartHumanTranslation: Record<string, string> = {
  age: "Picture two blocks of 100 people: on this community's block, 34 are seniors. On the district block, only 17 are.",
  race: "This block looks less mixed than the district — fewer Hispanic neighbors and fewer people from other racial groups.",
  education: "On this block, most grown-ups went to college. On the average district block, it's still common but not the default.",
  economy: "Fewer people here are rushing off to work — many are already done with their careers.",
  housing: "Every fifth house here might have the lights off — someone's vacation home or empty between tenants.",
  beforeAfter:
    "Same fact, two ways to show it: split charts make you guess; side-by-side bars let you see it instantly.",
};
