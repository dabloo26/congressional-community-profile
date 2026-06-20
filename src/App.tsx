import { useCallback, useEffect, useState } from "react";
import { BeforeAfterDemo } from "./components/BeforeAfterDemo";
import { CommunityCompareStrip } from "./components/CommunityCompareStrip";
import { CommunityPersonality } from "./components/CommunityPersonality";
import { CommunityPicker } from "./components/CommunityPicker";
import { CommunityStory } from "./components/CommunityStory";
import { GlossaryTip } from "./components/GlossaryTip";
import { HundredNeighbors } from "./components/HundredNeighbors";
import { IfThisCommunityWereAPerson } from "./components/IfThisCommunityWereAPerson";
import { InteractiveHighlightCard } from "./components/InteractiveHighlightCard";
import { NeighborGrid } from "./components/NeighborGrid";
import { buildMetricSectionMap, SectionExplorer } from "./components/SectionExplorer";
import { WouldYouNoticeGame } from "./components/WouldYouNoticeGame";
import { useCommunity } from "./context/CommunityContext";
import { friendlyIntro } from "./data/plainLanguage";
import { designPrinciple } from "./data/storytelling";

function ProfileContent() {
  const { profile, transitioning } = useCommunity();
  const [activeSection, setActiveSection] = useState("demographics");
  const [focusMetricId, setFocusMetricId] = useState<string | null>(null);

  const sectionForMetric = buildMetricSectionMap(profile.sections);

  useEffect(() => {
    setActiveSection("demographics");
    setFocusMetricId(null);
  }, [profile.stats.id]);

  const handleHighlightSelect = useCallback(
    (id: string) => {
      const section = sectionForMetric[id];
      if (section) setActiveSection(section);
      setFocusMetricId(id);
      window.setTimeout(() => {
        const el =
          document.getElementById(`metric-${id}`) ??
          document.getElementById(`metric-${id}-full`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    },
    [sectionForMetric]
  );

  const t = profile.stats.theme;

  return (
    <div
      className={`transition-all duration-300 ${transitioning ? "scale-[0.99] opacity-40 blur-[1px]" : "scale-100 opacity-100 blur-0"}`}
    >
      <section
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${t.gradient} px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-12`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">
            {profile.stats.state} · Community {profile.stats.shortId}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl">
            {profile.headline.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {profile.headline.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
              {profile.stats.personEmoji} Median age {profile.stats.medianAge}
            </span>
            <span className="rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
              {profile.stats.population.toLocaleString()} residents
            </span>
            <span className="rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
              vs {profile.stats.districtName}
            </span>
          </div>
        </div>
      </section>

      <div className="mt-8 space-y-8">
        <IfThisCommunityWereAPerson />
        <CommunityStory />
        <NeighborGrid />
        <HundredNeighbors />
        <CommunityPersonality />
        <WouldYouNoticeGame />
      </div>

      <div className="mt-10">
        <BeforeAfterDemo />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/80 backdrop-blur">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600" aria-hidden />
          <GlossaryTip term="Congressional Community">This community</GlossaryTip>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-400" aria-hidden />
          <GlossaryTip term="District">Whole district</GlossaryTip>
        </span>
        <span className="text-xs text-slate-400">Updated {profile.meta.updated}</span>
      </div>

      <section className="mt-8" aria-labelledby="at-a-glance">
        <h2 id="at-a-glance" className="font-display text-2xl text-slate-900">
          Biggest differences — tap any card
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.highlights.map((metric) => (
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
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-mesh text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Congressional Communities · concept explorer
          </p>
          <h1 className="font-display text-xl text-slate-900 sm:text-2xl">
            Community Profile Studio
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-5 py-3.5 text-center text-sm font-medium text-emerald-900 shadow-sm">
          {designPrinciple}
        </p>

        <section className="mt-6 rounded-2xl border border-violet-100/80 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl text-slate-900">{friendlyIntro.title}</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{friendlyIntro.body}</p>
        </section>

        <div className="mt-8">
          <CommunityPicker />
        </div>

        <ProfileContent />

        <CommunityCompareStrip />

        <aside className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Built for Congressional Communities</p>
          <p className="mt-2 leading-relaxed">
            Six demo profiles (CA-47001 uses real ProximityOne ACS figures; others are realistic
            ACS-style contrasts). One JSON template scales to 7,400+ communities. React + TypeScript
            for embed on an Azure site.
          </p>
        </aside>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-8 text-center text-xs text-slate-500 backdrop-blur">
        <p>U.S. Census Bureau ACS 2024 5-year estimates · Concept by Abhyansh Anand</p>
      </footer>
    </div>
  );
}
