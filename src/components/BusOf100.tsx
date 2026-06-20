import { useCommunity } from "../context/CommunityContext";
import { HumanTranslation } from "./HumanTranslation";

function BusRow({ emoji, count, label }: { emoji: string; count: number; label: string }) {
  const shown = Math.min(count, 14);
  const rest = count - shown;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
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

export function BusOf100() {
  const { profile } = useCommunity();

  return (
    <section
      id="section-bus"
      className="scroll-mt-24 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-blue-700">100 people on a bus</p>
      <h2 className="mt-1 font-display text-2xl text-slate-900">Everyone on board lives here</h2>
      <p className="mt-2 text-sm text-slate-600">Census percentages as people you can picture.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {profile.insights.busRows.map((row) => (
          <BusRow key={row.label} emoji={row.emoji} count={row.count} label={row.label} />
        ))}
      </div>
      <HumanTranslation>
        Each row scales ACS shares to 100 riders. Groups overlap in real life. This is a teaching
        picture, not a census count.
      </HumanTranslation>
    </section>
  );
}
