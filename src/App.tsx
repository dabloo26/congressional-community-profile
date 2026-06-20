import { useCallback, useState } from "react";
import { BeforeAfterDemo } from "./components/BeforeAfterDemo";
import { GlossaryTip } from "./components/GlossaryTip";
import { InteractiveHighlightCard } from "./components/InteractiveHighlightCard";
import { metricSectionMap, SectionExplorer } from "./components/SectionExplorer";
import {
  communityProfileMeta,
  profileHeadline,
  profileHighlights,
} from "./data/communityProfileDemo";
import { friendlyIntro } from "./data/plainLanguage";

export default function App() {
  const [activeSection, setActiveSection] = useState("demographics");
  const [focusMetricId, setFocusMetricId] = useState<string | null>(null);

  const sectionForMetric = metricSectionMap();

  const handleHighlightSelect = useCallback((id: string) => {
    const section = sectionForMetric[id];
    if (section) setActiveSection(section);
    setFocusMetricId(id);
    window.setTimeout(() => {
      const el =
        document.getElementById(`metric-${id}`) ??
        document.getElementById(`metric-${id}-full`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, [sectionForMetric]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-slate-50 to-blue-50/30 text-slate-900 print:bg-white">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur print:border-slate-300">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
            Community profile · interactive concept
          </p>
          <h1 className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
            {communityProfileMeta.communityLabel}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            vs {communityProfileMeta.districtLabel}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Friendly intro */}
        <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl text-slate-900">{friendlyIntro.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-700">{friendlyIntro.body}</p>
          <p className="mt-3 rounded-lg bg-violet-50 px-4 py-3 text-sm leading-relaxed text-violet-900">
            Think of the <strong>district</strong> as the whole school. The{" "}
            <strong>community</strong> is one homeroom inside it. We're asking: how is this
            homeroom different from the school average?
          </p>
        </section>

        {/* Before / After — the JD problem statement */}
        <div className="mt-8">
          <BeforeAfterDemo />
        </div>

        {/* Headline story */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            The short version
          </p>
          <h2 className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
            {profileHeadline.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
            {profileHeadline.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Updated {communityProfileMeta.updated}</span>
            <span aria-hidden>·</span>
            <span>
              Source:{" "}
              <GlossaryTip term="ACS">U.S. Census ACS 2024</GlossaryTip>
            </span>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-700" aria-hidden />
            <GlossaryTip term="Congressional Community">This community</GlossaryTip>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-400" aria-hidden />
            <GlossaryTip term="District">Whole district</GlossaryTip>
          </span>
        </div>

        {/* Interactive highlights */}
        <section className="mt-8" aria-labelledby="at-a-glance">
          <h2 id="at-a-glance" className="font-display text-xl text-slate-900">
            Biggest differences — tap any card
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Each card jumps you to the full section with charts. Plain English, no jargon required.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profileHighlights.map((metric) => (
              <li key={metric.id}>
                <InteractiveHighlightCard
                  metric={metric}
                  active={focusMetricId === metric.id}
                  onSelect={handleHighlightSelect}
                />
              </li>
            ))}
          </ul>
        </section>

        <SectionExplorer
          activeSection={activeSection}
          onSectionChange={(id) => {
            setActiveSection(id);
            setFocusMetricId(null);
          }}
          focusMetricId={focusMetricId}
        />

        <aside className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600 print:hidden">
          <p className="font-medium text-slate-800">Built for Congressional Communities</p>
          <p className="mt-2 leading-relaxed">
            Concept redesign of the{" "}
            <a
              href={communityProfileMeta.originalReportUrl}
              className="text-blue-700 underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              ProximityOne sample report
            </a>
            . Same JSON-driven template idea — swap data, render any of 7,400+ communities. React +
            TypeScript for embed on an Azure site.
          </p>
        </aside>
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
        <p>Data: {communityProfileMeta.source}.</p>
      </footer>
    </div>
  );
}
