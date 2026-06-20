import { useCommunity } from "../context/CommunityContext";
import { sectionPlainLanguage } from "../data/plainLanguage";
import { plainLanguageForProfile } from "../data/buildProfile";
import { ComparisonBarChart } from "./ComparisonBarChart";
import { HumanTranslation } from "./HumanTranslation";
import { PairedComparisonBar } from "./PairedComparisonBar";

type Props = {
  activeSection: string;
  onSectionChange: (id: string) => void;
  focusMetricId?: string | null;
};

const chartHuman = {
  demographics: {
    age: "Picture two blocks of 100 people. Count how many seniors you see on each.",
    race: "Look at the mix of faces on each block. One may feel much less diverse.",
  },
  social: {
    education: "On one block, most grown-ups went to college. On the other, it's common but not the default.",
  },
  economy: {
    work: "Fewer people rushing to work often means more retirees. Not laziness, just life stage.",
  },
  housing: {
    homes: "Empty houses on a block usually mean vacation homes or between tenants. Not a ghost town.",
  },
} as const;

export function SectionExplorer({ activeSection, onSectionChange, focusMetricId }: Props) {
  const { profile } = useCommunity();
  const section = profile.sections.find((s) => s.id === activeSection) ?? profile.sections[0];
  const meta = sectionPlainLanguage[section.id];

  return (
    <section className="mt-10" aria-labelledby="explore-data">
      <h2 id="explore-data" className="font-display text-xl text-slate-900 sm:text-2xl">
        Explore the data
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Charts for {profile.stats.name}. Blue = community, gray = district. Green box = human
        translation (always).
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Data topics">
        {profile.sections.map((s) => {
          const label = sectionPlainLanguage[s.id]?.title ?? s.title;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeSection === s.id}
              onClick={() => onSectionChange(s.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeSection === s.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        {meta && (
          <div className="mb-6 rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4">
            <h3 className="font-semibold text-violet-900">{meta.title}</h3>
            <p className="mt-1 text-sm text-violet-800">{meta.intro}</p>
            <p className="mt-3 text-sm font-medium text-violet-950">So what? {meta.soWhat}</p>
          </div>
        )}

        <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
          {section.id === "demographics" && (
            <>
              <h3 className="text-sm font-semibold text-slate-800">Age groups (% of population)</h3>
              <ComparisonBarChart
                data={profile.ageBands.map((r) => ({ band: r.band, community: r.community, district: r.district }))}
                categoryKey="band"
                yUnit="%"
                height={220}
              />
              <HumanTranslation>{chartHuman.demographics.age}</HumanTranslation>
              <h3 className="mt-6 text-sm font-semibold text-slate-800">Race & ethnicity</h3>
              <ComparisonBarChart
                data={profile.raceBreakdown.map((r) => ({ group: r.group, community: r.community, district: r.district }))}
                categoryKey="group"
                yUnit="%"
                height={240}
                layout="vertical"
              />
              <HumanTranslation>{chartHuman.demographics.race}</HumanTranslation>
            </>
          )}
          {section.id === "social" && (
            <>
              <h3 className="text-sm font-semibold text-slate-800">Education (adults 25+)</h3>
              <ComparisonBarChart
                data={profile.educationBands.map((r) => ({ level: r.level, community: r.community, district: r.district }))}
                categoryKey="level"
                yUnit="%"
                height={220}
              />
              <HumanTranslation>{chartHuman.social.education}</HumanTranslation>
            </>
          )}
          {section.id === "economy" && (
            <>
              <h3 className="text-sm font-semibold text-slate-800">Work status (16+)</h3>
              <ComparisonBarChart
                data={[
                  { status: "In labor force", community: profile.stats.pctLaborForce, district: profile.stats.districtPctLaborForce },
                  { status: "Employed", community: profile.stats.pctEmployed, district: profile.stats.districtPctEmployed },
                  { status: "Not in labor force", community: profile.stats.pctNotInLF, district: profile.stats.districtPctNotInLF },
                ]}
                categoryKey="status"
                yUnit="%"
                height={220}
              />
              <HumanTranslation>{chartHuman.economy.work}</HumanTranslation>
            </>
          )}
          {section.id === "housing" && (
            <>
              <h3 className="text-sm font-semibold text-slate-800">Occupied vs vacant</h3>
              <ComparisonBarChart
                data={profile.housingSnapshot.map((r) => ({ label: r.label, community: r.community, district: r.district }))}
                categoryKey="label"
                yUnit="%"
                height={200}
              />
              <HumanTranslation>{chartHuman.housing.homes}</HumanTranslation>
            </>
          )}
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          All numbers · each with human translation
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {section.metrics.map((metric) => (
            <li
              key={metric.id}
              id={`metric-${metric.id}`}
              className={
                focusMetricId === metric.id || focusMetricId === metric.id.replace(/-full$/, "")
                  ? "rounded-lg ring-2 ring-blue-400 ring-offset-2"
                  : undefined
              }
            >
              <PairedComparisonBar
                metric={metric}
                humanText={plainLanguageForProfile(profile, metric.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function buildMetricSectionMap(sections: { id: string; metrics: { id: string }[] }[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of sections) {
    for (const m of s.metrics) {
      map[m.id] = s.id;
      map[m.id.replace(/-full$/, "")] = s.id;
    }
  }
  return map;
}
