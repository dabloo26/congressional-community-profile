import { useCommunity } from "../context/CommunityContext";
import { HumanTranslation } from "./HumanTranslation";

export function HundredNeighbors() {
  const { profile } = useCommunity();

  return (
    <section
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-8"
      aria-labelledby="neighbors-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">100 neighbors</p>
      <h2 id="neighbors-title" className="mt-2 font-display text-2xl text-slate-900">
        Out of your next 100 neighbors…
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        People beat percentages. Here's the guest list for {profile.stats.name}.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {profile.hundredNeighbors.map((row) => (
          <li
            key={row.line}
            className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:scale-110">
                {row.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-4xl leading-none text-blue-700">{row.count}</p>
                <p className="text-xs font-medium text-slate-400">out of 100</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{row.line}</p>
                <HumanTranslation className="!mt-2 !text-[11px] !py-2">{row.human}</HumanTranslation>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
