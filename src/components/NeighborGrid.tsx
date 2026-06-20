import { useMemo, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { seededShuffle } from "../lib/seededShuffle";
import { HumanTranslation } from "./HumanTranslation";

type DotKind = "senior" | "college" | "worker" | "hispanic" | "other";

const KIND_STYLE: Record<DotKind, { bg: string; label: string; emoji: string }> = {
  senior: { bg: "bg-amber-400 ring-amber-500/30", label: "65+", emoji: "👵" },
  college: { bg: "bg-blue-500 ring-blue-600/30", label: "College grad", emoji: "🎓" },
  worker: { bg: "bg-emerald-500 ring-emerald-600/30", label: "Has a job", emoji: "💼" },
  hispanic: { bg: "bg-rose-400 ring-rose-500/30", label: "Hispanic/Latino", emoji: "🌎" },
  other: { bg: "bg-slate-300 ring-slate-400/30", label: "Everyone else", emoji: "🙂" },
};

function buildDots(counts: {
  senior: number;
  college: number;
  worker: number;
  hispanic: number;
}, seed: string): DotKind[] {
  const dots: DotKind[] = [];

  const add = (kind: DotKind, n: number) => {
    for (let i = 0; i < n && dots.length < 100; i++) dots.push(kind);
  };

  add("senior", counts.senior);
  add("college", Math.max(0, counts.college - counts.senior));
  add("worker", Math.max(0, counts.worker - dots.length));
  add("hispanic", Math.max(0, Math.min(counts.hispanic, 100 - dots.length)));

  while (dots.length < 100) dots.push("other");

  return seededShuffle(dots, seed).slice(0, 100);
}

export function NeighborGrid() {
  const { profile } = useCommunity();
  const s = profile.stats;
  const [hoverKind, setHoverKind] = useState<DotKind | null>(null);
  const [filter, setFilter] = useState<DotKind | "all">("all");

  const dots = useMemo(
    () =>
      buildDots(
        {
          senior: Math.round(s.pct65Plus),
          college: Math.round(s.pctBachelors),
          worker: Math.round(s.pctEmployed),
          hispanic: Math.round(s.pctHispanic),
        },
        s.id
      ),
    [s]
  );

  const counts = useMemo(() => {
    const c: Record<DotKind, number> = {
      senior: 0,
      college: 0,
      worker: 0,
      hispanic: 0,
      other: 0,
    };
    dots.forEach((d) => {
      c[d]++;
    });
    return c;
  }, [dots]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">100 neighbors · live grid</p>
      <h2 className="mt-2 font-display text-2xl text-slate-900">Meet your block — 100 dots, 100 stories</h2>
      <p className="mt-2 text-sm text-slate-600">
        Each dot is one person. Hover to highlight groups. Tap a legend chip to filter.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "senior", "college", "worker", "hispanic", "other"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              filter === k
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {k === "all" ? "Everyone" : `${KIND_STYLE[k].emoji} ${KIND_STYLE[k].label}`}
          </button>
        ))}
      </div>

      <div
        className="mt-5 grid grid-cols-10 gap-1.5 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-4 sm:gap-2 sm:p-6"
        role="img"
        aria-label="Grid of 100 neighbor dots"
      >
        {dots.map((kind, i) => {
          const style = KIND_STYLE[kind];
          const dim =
            filter !== "all" && filter !== kind && hoverKind !== kind;
          const pop = hoverKind === kind || filter === kind;
          return (
            <button
              key={i}
              type="button"
              title={`Neighbor ${i + 1}: ${style.label}`}
              onMouseEnter={() => setHoverKind(kind)}
              onMouseLeave={() => setHoverKind(null)}
              className={`aspect-square rounded-full ring-2 transition-all duration-200 ${style.bg} ${
                dim ? "scale-90 opacity-20" : pop ? "scale-110 opacity-100 shadow-md" : "opacity-90"
              }`}
            />
          );
        })}
      </div>

      {hoverKind && (
        <p className="mt-3 text-center text-sm font-medium text-slate-700">
          {KIND_STYLE[hoverKind].emoji} ~{counts[hoverKind]} of 100 — {KIND_STYLE[hoverKind].label}
        </p>
      )}

      <HumanTranslation>
        This grid turns percentages into faces. {Math.round(s.pct65Plus)} seniors,{" "}
        {Math.round(s.pctBachelors)} college grads (among adults), {Math.round(s.pctHispanic)} Latino
        neighbors — same numbers as the report, easier to feel.
      </HumanTranslation>
    </section>
  );
}
