import { useCommunity } from "../context/CommunityContext";

export function CommunityGlance() {
  const { profile } = useCommunity();
  const glance = profile.insights.glance;

  return (
    <section
      id="section-glance"
      className="scroll-mt-24 -mt-4 rounded-2xl border border-slate-900 bg-slate-900 p-4 shadow-xl sm:p-6"
      aria-label="Community in one glance"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">In one glance</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
        {glance.map((g) => (
          <div
            key={g.label}
            className={`rounded-xl px-3 py-4 text-center sm:px-4 ${
              g.direction === "similar"
                ? "bg-slate-800 text-slate-300"
                : g.direction === "higher"
                  ? "bg-white text-slate-900"
                  : "bg-amber-400 text-amber-950"
            }`}
          >
            <p className="text-[10px] font-black tracking-widest sm:text-xs">{g.label}</p>
            <p className="mt-2 font-display text-2xl font-bold tabular-nums sm:text-3xl">{g.delta}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">vs {profile.stats.districtName}</p>
    </section>
  );
}
