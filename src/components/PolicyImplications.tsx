import { useCommunity } from "../context/CommunityContext";

function StarRow({ count }: { count: number }) {
  return (
    <span className="text-amber-500" aria-label={`${count} out of 5`}>
      {"★".repeat(count)}
      <span className="text-slate-200">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function PolicyImplications() {
  const { profile } = useCommunity();

  return (
    <section
      id="section-policy"
      className="scroll-mt-24 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-indigo-800">For policymakers</p>
      <h2 className="mt-1 font-display text-2xl text-slate-900">What should staff care about?</h2>
      <p className="mt-2 text-sm text-slate-600">
        Priority areas derived from how this community differs from {profile.stats.districtName}.
      </p>
      <ul className="mt-5 space-y-3">
        {profile.insights.policyAreas.map((p) => (
          <li
            key={p.area}
            className="rounded-xl border border-white/80 bg-white/90 px-4 py-3.5 shadow-sm ring-1 ring-indigo-100"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-slate-900">{p.area}</span>
              <StarRow count={p.stars} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
