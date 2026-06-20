import { communities } from "../src/data/communities";

function homeownershipPct(owner: number, total: number): number {
  return total > 0 ? Math.round((owner / total) * 100) : 0;
}

const errors: string[] = [];

for (const c of communities) {
  const s = c.stats;
  const id = s.shortId;
  const ins = c.insights;

  if (!ins) errors.push(`${id}: missing insights`);
  if (!ins?.glance?.length) errors.push(`${id}: missing glance`);
  if (!ins?.staffBrief?.length) errors.push(`${id}: missing staffBrief`);
  if (!ins?.topDifferences?.length) errors.push(`${id}: missing topDifferences`);
  if (!ins?.policyAreas?.length) errors.push(`${id}: missing policyAreas`);
  if (!ins?.busRows?.length) errors.push(`${id}: missing busRows`);
  if (s.ownerOccupiedHH > s.totalHH) errors.push(`${id}: owner HH exceeds total HH`);

  for (const d of ins?.topDifferences ?? []) {
    if (!d.whyItMatters?.length) errors.push(`${id}: missing whyItMatters for ${d.stat}`);
  }

  const busHo = ins?.busRows.find((b) => b.label.includes("own"));
  const ho = homeownershipPct(s.ownerOccupiedHH, s.totalHH);
  if (busHo && busHo.count !== ho) errors.push(`${id}: bus homeownership mismatch`);
}

console.log(`Checked ${communities.length} communities\n`);

if (errors.length) {
  console.error("ERRORS:");
  errors.forEach((e) => console.error("  -", e));
  process.exit(1);
}

console.log("All sanity checks passed.");
