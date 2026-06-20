import { useCommunity } from "../context/CommunityContext";
import { formatValue } from "../lib/communityProfileFormat";

export function CommunityCompareStrip() {
  const { allCommunities, communityId, setCommunityId } = useCommunity();

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6">
        <h2 className="font-display text-lg text-slate-900">Compare all communities at a glance</h2>
        <p className="text-xs text-slate-500">Tap a row to jump to that profile</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold sm:px-6">Community</th>
              <th className="px-3 py-3 font-semibold">Median age</th>
              <th className="px-3 py-3 font-semibold">College %</th>
              <th className="px-3 py-3 font-semibold">Hispanic %</th>
              <th className="px-3 py-3 font-semibold">Income</th>
              <th className="px-3 py-3 font-semibold">Population</th>
            </tr>
          </thead>
          <tbody>
            {allCommunities.map((c) => {
              const active = c.stats.id === communityId;
              return (
                <tr
                  key={c.stats.id}
                  onClick={() => setCommunityId(c.stats.id)}
                  className={`cursor-pointer border-b border-slate-50 transition hover:bg-blue-50/50 ${
                    active ? "bg-blue-50/80" : ""
                  }`}
                >
                  <td className="px-4 py-3 sm:px-6">
                    <span className="mr-2" aria-hidden>
                      {c.stats.personEmoji}
                    </span>
                    <span className="font-medium text-slate-800">{c.stats.shortId}</span>
                    <span className="ml-2 text-xs text-slate-400">{c.stats.state}</span>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{c.stats.medianAge}</td>
                  <td className="px-3 py-3 tabular-nums">{Math.round(c.stats.pctBachelors)}%</td>
                  <td className="px-3 py-3 tabular-nums">{Math.round(c.stats.pctHispanic)}%</td>
                  <td className="px-3 py-3 tabular-nums">
                    {formatValue(c.stats.medianIncome, "currency")}
                  </td>
                  <td className="px-3 py-3 tabular-nums">
                    {c.stats.population.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
