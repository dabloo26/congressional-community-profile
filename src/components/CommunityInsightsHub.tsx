import { useCommunity } from "../context/CommunityContext";
import { HumanTranslation } from "./HumanTranslation";

function DnaBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-xs font-semibold text-slate-600">{label}</span>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{ width: `${score * 10}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-4 text-xs tabular-nums text-slate-400">{score}</span>
    </div>
  );
}

function BusRow({ emoji, count, label }: { emoji: string; count: number; label: string }) {
  const shown = Math.min(count, 14);
  const rest = count - shown;
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
      <div className="flex flex-wrap gap-0.5 leading-none" aria-hidden>
        {Array.from({ length: shown }, (_, i) => (
          <span key={i} className="text-base">
            {emoji}
          </span>
        ))}
        {rest > 0 && <span className="text-xs text-slate-400">+{rest}</span>}
      </div>
      <p className="mt-2 text-sm font-bold text-slate-900">
        {count} {label}
      </p>
    </div>
  );
}

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "text-emerald-600 bg-emerald-50 ring-emerald-200";
  if (grade.startsWith("B")) return "text-blue-600 bg-blue-50 ring-blue-200";
  return "text-amber-700 bg-amber-50 ring-amber-200";
}

export function CommunityInsightsHub() {
  const { profile, setCommunityId } = useCommunity();
  const ins = profile.insights;
  const t = profile.stats.theme;

  return (
    <div className="space-y-6">
      {/* You just moved here */}
      <section className="overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-700">You just moved here</p>
        <h2 className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
          Imagine you moved to {profile.stats.shortId} tomorrow
        </h2>
        <p className="mt-2 text-sm text-slate-600">No charts yet. Just what you would notice first.</p>
        <ul className="mt-5 space-y-3">
          {ins.justMovedHere.map((line) => (
            <li
              key={line}
              className="flex gap-3 rounded-xl bg-white/90 px-4 py-3 text-base leading-relaxed text-slate-800 shadow-sm ring-1 ring-orange-100"
            >
              <span className="text-orange-500" aria-hidden>
                →
              </span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Staff brief */}
        <section className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Congressional staff brief</p>
          <h2 className="mt-1 font-display text-xl">If you only remember three things</h2>
          <ol className="mt-5 space-y-4">
            {ins.staffBrief.map((line, i) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-slate-100">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                  {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
        </section>

        {/* Community DNA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Community DNA</p>
          <div className="mt-3 flex items-start gap-4">
            <span className="text-5xl" aria-hidden>
              {ins.personalityType.emoji}
            </span>
            <div>
              <h2 className="font-display text-xl text-slate-900">{ins.personalityType.label}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{ins.personalityType.blurb}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {ins.dna.map((d) => (
              <DnaBar key={d.label} label={d.label} score={d.score} color={t.primary} />
            ))}
          </div>
        </section>
      </div>

      {/* 100 people on a bus */}
      <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">100 people on a bus</p>
        <h2 className="mt-1 font-display text-2xl text-slate-900">Everyone on board lives here</h2>
        <p className="mt-2 text-sm text-slate-600">
          Same Census numbers as percentages, shown as people you can count on one screen.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ins.busRows.map((row) => (
            <BusRow key={row.label} emoji={row.emoji} count={row.count} label={row.label} />
          ))}
        </div>
        <HumanTranslation>
          Each row scales ACS percentages to 100 bus riders. Categories overlap in real life (a senior
          can also have a degree). This is a teaching picture, not a census tabulation.
        </HumanTranslation>
      </section>

      {/* Top 5 differences */}
      <section className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">What makes this different?</p>
        <h2 className="mt-1 font-display text-2xl text-slate-900">Top {ins.topDifferences.length} deviations vs district</h2>
        <p className="mt-2 text-sm text-slate-600">The fastest briefing for busy staffers.</p>
        <ul className="mt-5 space-y-2">
          {ins.topDifferences.map((d) => (
            <li
              key={d.text}
              className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900"
            >
              <span className="text-xl" aria-hidden>
                {d.emoji}
              </span>
              {d.text}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weather report */}
        <section className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-800">Community outlook</p>
          <h2 className="mt-1 font-display text-xl text-slate-900">Demographic weather report</h2>
          <ul className="mt-4 space-y-2">
            {ins.weather.map((w) => (
              <li
                key={w.label}
                className="flex items-center justify-between rounded-lg bg-white/80 px-4 py-2.5 text-sm ring-1 ring-cyan-100"
              >
                <span>
                  {w.emoji} {w.label}
                </span>
                <span className="font-bold text-cyan-900">{w.level}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Report card */}
        <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Report card</p>
          <h2 className="mt-1 font-display text-xl text-slate-900">If this community applied to college</h2>
          <p className="mt-1 text-xs text-slate-500">Grades vs district average. Not official. Very memorable.</p>
          <ul className="mt-4 space-y-2">
            {ins.reportCard.map((g) => (
              <li
                key={g.subject}
                className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-2.5 ring-1 ring-emerald-100"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black ring-1 ${gradeColor(g.grade)}`}
                >
                  {g.grade}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{g.subject}</p>
                  <p className="truncate text-xs text-slate-500">{g.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Similar communities */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Find your twin</p>
          <h2 className="mt-1 font-display text-xl text-slate-900">Most similar demo communities</h2>
          <p className="mt-1 text-xs text-slate-500">Based on age, income, education, housing, and diversity.</p>
          <ul className="mt-4 space-y-2">
            {ins.similarCommunities.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setCommunityId(c.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <span className="text-lg font-bold text-indigo-400">{i + 1}</span>
                  <span className="text-2xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="font-semibold text-slate-900">{c.shortId}</span>
                    <span className="block text-xs text-slate-500">{c.pctMatch}% demographic match</span>
                  </span>
                  <span className="text-xs font-medium text-indigo-600">View →</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Surprise */}
        <section className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800">What would surprise you?</p>
          <h2 className="mt-1 font-display text-xl text-amber-950">{ins.surprise.headline}</h2>
          <p className="mt-4 text-base leading-relaxed text-amber-900/90">{ins.surprise.detail}</p>
        </section>
      </div>
    </div>
  );
}
