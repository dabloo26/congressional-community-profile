import { useCommunity } from "../context/CommunityContext";

export function StaffBrief() {
  const { profile } = useCommunity();

  return (
    <section
      id="section-staff-brief"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Congressional staff brief</p>
      <h2 className="mt-1 font-display text-xl sm:text-2xl">If you only remember three things</h2>
      <ol className="mt-5 space-y-4">
        {profile.insights.staffBrief.map((line, i) => (
          <li key={line} className="flex gap-3 text-sm leading-relaxed text-slate-100 sm:text-base">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
              {i + 1}
            </span>
            {line}
          </li>
        ))}
      </ol>
    </section>
  );
}
