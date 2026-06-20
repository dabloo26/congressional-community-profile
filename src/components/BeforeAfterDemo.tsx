import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCommunity } from "../context/CommunityContext";
import { beforeAfterCopy as copy } from "../data/plainLanguage";
import { HumanTranslation } from "./HumanTranslation";

type Mode = "before" | "after";

const COMMUNITY = "#1d4ed8";
const DISTRICT = "#94a3b8";

export function BeforeAfterDemo() {
  const { profile } = useCommunity();
  const [mode, setMode] = useState<Mode>("after");
  const pct65 = profile.stats.pct65Plus;
  const dPct65 = profile.stats.districtPct65Plus;

  const separateCommunity = [{ name: "Community", value: pct65 }];
  const separateDistrict = [{ name: "District", value: dPct65 }];
  const grouped = [{ name: "65+ share", Community: pct65, District: dPct65 }];

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-7"
      aria-labelledby="before-after-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            The design problem
          </p>
          <h2 id="before-after-title" className="mt-1 font-display text-xl text-slate-900 sm:text-2xl">
            Before vs after — same data, easier to read
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Toggle to see how {profile.stats.shortId} fixes the stacked-chart problem from the
            original ProximityOne-style reports.
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1" role="tablist">
          {(["before", "after"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === key
                  ? key === "before"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => setMode(key)}
            >
              {copy[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div
          className={`rounded-xl border p-4 transition ${
            mode === "before"
              ? "border-rose-200 bg-rose-50/80 ring-2 ring-rose-200"
              : "border-slate-100 bg-slate-50 opacity-60"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
            {copy.before.label} · {copy.before.title}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {copy.before.problems.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-rose-500">✕</span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-4 rounded-lg border border-slate-200 bg-white p-3">
            <p className="font-mono text-[11px] leading-relaxed text-slate-500">
              .. the population 65 years and over was ({pct65}%) for this community compared to (
              {dPct65}%) for the district.
            </p>
            <MiniChart data={separateCommunity} color={COMMUNITY} height={100} label="Community only" />
            <MiniChart data={separateDistrict} color={DISTRICT} height={100} label="District only" />
          </div>
        </div>

        <div
          className={`rounded-xl border p-4 transition ${
            mode === "after"
              ? "border-blue-200 bg-blue-50/80 ring-2 ring-blue-200"
              : "border-slate-100 bg-slate-50 opacity-60"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
            {copy.after.label} · {copy.after.title}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {copy.after.wins.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-blue-100 bg-white p-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <strong>Key insight:</strong> About <strong>1 in {Math.round(100 / pct65)}</strong> people
              here are 65+, vs <strong>1 in {Math.round(100 / dPct65)}</strong> in the district.
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={grouped} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="%" tick={{ fontSize: 11 }} domain={[0, Math.max(pct65, dPct65) + 8]} />
                <Tooltip formatter={(v) => [`${Number(v)}%`, ""]} />
                <Bar dataKey="Community" fill={COMMUNITY} radius={[6, 6, 0, 0]} />
                <Bar dataKey="District" fill={DISTRICT} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <HumanTranslation>
        Same fact, two layouts: split charts make you guess; side-by-side bars show instantly that this
        community is {pct65 > dPct65 ? "much older" : "different"} on seniors.
      </HumanTranslation>
    </section>
  );
}

function MiniChart({
  data,
  color,
  height,
  label,
}: {
  data: { name: string; value: number }[];
  color: string;
  height: number;
  label: string;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
          <XAxis type="number" domain={[0, 45]} unit="%" hide />
          <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 11 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((_, i) => (
              <Cell key={i} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
