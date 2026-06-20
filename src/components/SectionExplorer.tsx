import { profileSections } from "../data/communityProfileDemo";
import { sectionPlainLanguage } from "../data/plainLanguage";
import {
  ageBands,
  educationBands,
  housingSnapshot,
  raceBreakdown,
} from "../data/chartData";
import { chartHumanTranslation } from "../data/storytelling";
import { ComparisonBarChart } from "./ComparisonBarChart";
import { HumanTranslation } from "./HumanTranslation";
import { PairedComparisonBar } from "./PairedComparisonBar";

type Props = {
  activeSection: string;
  onSectionChange: (id: string) => void;
  focusMetricId?: string | null;
};

const sectionCharts: Record<string, () => JSX.Element> = {
  demographics: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Age groups (% of population)</h3>
        <ComparisonBarChart
          data={ageBands.map((r) => ({
            band: r.band,
            community: r.community,
            district: r.district,
            tip: r.tip,
          }))}
          categoryKey="band"
          yUnit="%"
          height={220}
        />
        <HumanTranslation>{chartHumanTranslation.age}</HumanTranslation>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Race & ethnicity (approx.)</h3>
        <ComparisonBarChart
          data={raceBreakdown.map((r) => ({
            group: r.group,
            community: r.community,
            district: r.district,
          }))}
          categoryKey="group"
          yUnit="%"
          height={240}
          layout="vertical"
        />
        <HumanTranslation>{chartHumanTranslation.race}</HumanTranslation>
      </div>
    </div>
  ),
  social: () => (
    <div>
      <h3 className="text-sm font-semibold text-slate-800">Education levels (adults 25+)</h3>
      <ComparisonBarChart
        data={educationBands.map((r) => ({
          level: r.level,
          community: r.community,
          district: r.district,
        }))}
        categoryKey="level"
        yUnit="%"
        height={220}
      />
      <HumanTranslation>{chartHumanTranslation.education}</HumanTranslation>
    </div>
  ),
  economy: () => (
    <div>
      <h3 className="text-sm font-semibold text-slate-800">Work status (% of people 16+)</h3>
      <ComparisonBarChart
        data={[
          { status: "In labor force", community: 57.1, district: 66.3 },
          { status: "Employed", community: 54.4, district: 62.7 },
          { status: "Not in labor force", community: 42.9, district: 33.7 },
        ]}
        categoryKey="status"
        yUnit="%"
        height={220}
      />
      <HumanTranslation>{chartHumanTranslation.economy}</HumanTranslation>
    </div>
  ),
  housing: () => (
    <div>
      <h3 className="text-sm font-semibold text-slate-800">Occupied vs vacant homes</h3>
      <ComparisonBarChart
        data={housingSnapshot.map((r) => ({
          label: r.label,
          community: r.community,
          district: r.district,
        }))}
        categoryKey="label"
        yUnit="%"
        height={200}
      />
      <HumanTranslation>{chartHumanTranslation.housing}</HumanTranslation>
    </div>
  ),
};

export function SectionExplorer({ activeSection, onSectionChange, focusMetricId }: Props) {
  const section = profileSections.find((s) => s.id === activeSection) ?? profileSections[0];
  const meta = sectionPlainLanguage[section.id];
  const ChartBlock = sectionCharts[section.id];

  return (
    <section className="mt-10" aria-labelledby="explore-data">
      <h2 id="explore-data" className="font-display text-xl text-slate-900 sm:text-2xl">
        Explore the data
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Pick a topic — charts update below. Blue = this community, gray = whole district.
      </p>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Data topics"
      >
        {profileSections.map((s) => {
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
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        {meta && (
          <div className="mb-6 rounded-xl bg-violet-50 border border-violet-100 p-4">
            <h3 className="font-semibold text-violet-900">{meta.title}</h3>
            <p className="mt-1 text-sm text-violet-800">{meta.intro}</p>
            <p className="mt-3 text-sm font-medium text-violet-950">
              So what? {meta.soWhat}
            </p>
          </div>
        )}

        {ChartBlock && (
          <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            {ChartBlock()}
          </div>
        )}

        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          All numbers in this section
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
              <PairedComparisonBar metric={metric} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function metricSectionMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of profileSections) {
    for (const m of s.metrics) {
      map[m.id] = s.id;
      map[m.id.replace(/-full$/, "")] = s.id;
    }
  }
  return map;
}
