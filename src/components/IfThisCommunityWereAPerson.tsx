import { useCommunity } from "../context/CommunityContext";

export function IfThisCommunityWereAPerson() {
  const { profile } = useCommunity();
  const { personProfile, stats } = profile;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-white/50 shadow-xl"
      aria-labelledby="person-title"
      style={{
        background: `linear-gradient(135deg, ${stats.theme.primary}12, white 40%, ${stats.theme.secondary}08)`,
      }}
    >
      <div className="border-b border-amber-100/80 bg-gradient-to-r from-amber-50/90 to-orange-50/50 px-6 py-4 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
          If this community were a person
        </p>
        <h2 id="person-title" className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
          Meet {personProfile.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          No jargon. No percentages. A picture you can remember and share.
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
        <div
          className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl text-6xl shadow-inner ring-4 ring-white"
          style={{ background: `linear-gradient(145deg, ${stats.theme.primary}22, ${stats.theme.secondary}33)` }}
          aria-hidden
        >
          {stats.personEmoji}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">
            If this community were one person, they would be:
          </p>
          <ul className="mt-4 space-y-3">
            {personProfile.traits.map((trait) => (
              <li
                key={trait}
                className="flex gap-3 rounded-xl bg-white/80 px-4 py-3 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100"
              >
                <span className="text-lg" aria-hidden>
                  ✦
                </span>
                {trait}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-amber-100/60 px-4 py-3 text-base font-medium leading-relaxed text-amber-950 ring-1 ring-amber-200/80">
            {personProfile.comparedToDistrict}
          </p>
        </div>
      </div>
    </section>
  );
}
