import { HighlightCard } from "./components/HighlightCard";
import { PairedComparisonBar } from "./components/PairedComparisonBar";
import {
  communityProfileMeta,
  profileHeadline,
  profileHighlights,
  profileSections,
} from "./data/communityProfileDemo";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 print:bg-white">
      <header className="border-b border-slate-200 bg-white print:border-slate-300">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
            Community profile · concept redesign
          </p>
          <h1 className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
            {communityProfileMeta.communityLabel}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Compared to {communityProfileMeta.districtLabel}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8">
          <h2 className="font-display text-2xl text-slate-900 sm:text-3xl">
            {profileHeadline.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
            {profileHeadline.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Updated {communityProfileMeta.updated}</span>
            <span aria-hidden>·</span>
            <span>{communityProfileMeta.source}</span>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-700" aria-hidden />
            Congressional Community
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-400" aria-hidden />
            Parent Congressional District
          </span>
        </div>

        <section className="mt-8" aria-labelledby="at-a-glance">
          <h2
            id="at-a-glance"
            className="text-sm font-semibold uppercase tracking-wider text-slate-500"
          >
            At a glance
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Largest differences between the community and its parent district.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profileHighlights.map((metric) => (
              <li key={metric.id}>
                <HighlightCard metric={metric} />
              </li>
            ))}
          </ul>
        </section>

        {profileSections.map((section) => (
          <section
            key={section.id}
            className="mt-10"
            aria-labelledby={`section-${section.id}`}
          >
            <h2
              id={`section-${section.id}`}
              className="border-b border-slate-200 pb-2 font-display text-xl text-slate-900"
            >
              {section.title}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.metrics.map((metric) => (
                <li key={metric.id}>
                  <PairedComparisonBar metric={metric} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <aside className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600 print:hidden">
          <p className="font-medium text-slate-800">About this concept</p>
          <p className="mt-2 leading-relaxed">
            Redesign of the{" "}
            <a
              href={communityProfileMeta.originalReportUrl}
              className="text-blue-700 underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              ProximityOne demographic report
            </a>{" "}
            for Congressional Communities. The original stacks separate charts per
            geography; this layout pairs community and district on every metric so
            staffers and residents can compare at a glance. Built as a JSON-driven
            React template — the same component renders any of 7,400+ communities.
          </p>
        </aside>
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
        <p>Data: {communityProfileMeta.source}.</p>
      </footer>
    </div>
  );
}
