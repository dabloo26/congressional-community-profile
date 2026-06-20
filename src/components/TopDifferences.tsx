import { useCommunity } from "../context/CommunityContext";

export function TopDifferences() {
  const { profile } = useCommunity();
  const diffs = profile.insights.topDifferences;

  return (
    <section
      id="section-top-differences"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Top deviations</p>
      <h2 className="mt-1 font-display text-2xl text-slate-900">What makes this community different?</h2>
      <p className="mt-2 text-sm text-slate-600">Each gap includes why it matters for policy and services.</p>
      <ul className="mt-6 space-y-4">
        {diffs.map((d) => (
          <li
            key={d.stat}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>
                {d.emoji}
              </span>
              <div>
                <p className="text-lg font-bold text-slate-900">{d.stat}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Why it matters: </span>
                  {d.whyItMatters}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
