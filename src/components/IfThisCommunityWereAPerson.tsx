import { communityPersonId, personProfile } from "../data/storytelling";

export function IfThisCommunityWereAPerson() {
  return (
    <section
      className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-8"
      aria-labelledby="person-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
        If this community were a person
      </p>
      <h2 id="person-title" className="mt-2 font-display text-2xl text-slate-900 sm:text-3xl">
        Meet Community {communityPersonId}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        No jargon. No percentages. Just a picture you can remember and share.
      </p>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-amber-100 text-5xl ring-4 ring-amber-200/80"
          aria-hidden
        >
          🧑‍🦳
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">
            If this community were a single person, they would be:
          </p>
          <ul className="mt-3 space-y-2.5">
            {personProfile.traits.map((trait) => (
              <li
                key={trait}
                className="flex gap-3 text-base leading-relaxed text-slate-700"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden />
                {trait}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-white/80 px-4 py-3 text-base font-medium leading-relaxed text-amber-950 ring-1 ring-amber-200">
            {personProfile.comparedToDistrict}
          </p>
        </div>
      </div>
    </section>
  );
}
