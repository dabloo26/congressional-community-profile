import { hundredNeighbors } from "../data/storytelling";
import { HumanTranslation } from "./HumanTranslation";

export function HundredNeighbors() {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="neighbors-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
        100 neighbors
      </p>
      <h2 id="neighbors-title" className="mt-2 font-display text-2xl text-slate-900">
        Out of your next 100 neighbors…
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        People understand people better than percentages. Here's the same data as a block party guest
        list.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {hundredNeighbors.map((row) => (
          <li
            key={row.line}
            className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden>
                {row.emoji}
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  <span className="font-display text-3xl text-blue-700">{row.count}</span>
                  <span className="ml-1 text-base font-normal text-slate-600">/ 100</span>
                </p>
                <p className="text-sm font-medium text-slate-800">{row.line}</p>
                <HumanTranslation className="mt-2 !text-xs">{row.human}</HumanTranslation>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
