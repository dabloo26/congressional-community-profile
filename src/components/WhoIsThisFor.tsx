import { whoIsThisFor } from "../data/plainLanguage";

export function WhoIsThisFor() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-lg text-slate-900">Who is this for?</h2>
      <p className="mt-1 text-sm text-slate-600">Pick your path. Same data, different starting points.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {whoIsThisFor.map((row) => (
          <li
            key={row.who}
            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
          >
            <p className="font-semibold text-slate-800">{row.who}</p>
            <p className="mt-1 leading-relaxed text-slate-600">{row.tip}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
