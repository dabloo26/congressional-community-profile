import { useState } from "react";
import type { ComparisonMetric } from "../data/communityProfileDemo";
import { plainLanguageForMetric } from "../data/plainLanguage";
import {
  barPercent,
  deltaDirection,
  formatDelta,
  formatValue,
} from "../lib/communityProfileFormat";

type Props = {
  metric: ComparisonMetric;
  compact?: boolean;
  explain?: boolean;
};

const COMMUNITY = "#1d4ed8";
const DISTRICT = "#94a3b8";

export function PairedComparisonBar({ metric, compact = false, explain = false }: Props) {
  const [showTip, setShowTip] = useState(false);
  const communityPct = barPercent(metric.community, metric);
  const districtPct = barPercent(metric.district, metric);
  const direction = deltaDirection(metric);
  const delta = formatDelta(metric);

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white ${compact ? "p-3" : "p-4"}`}
      role="group"
      aria-label={`${metric.label}: community ${formatValue(metric.community, metric.format)}, district ${formatValue(metric.district, metric.format)}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-800">{metric.label}</p>
        <div className="flex items-center gap-2">
          {delta && direction !== "similar" && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                direction === "higher"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-amber-50 text-amber-800"
              }`}
            >
              {delta}
            </span>
          )}
          {explain && (
            <button
              type="button"
              onClick={() => setShowTip((v) => !v)}
              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
              aria-expanded={showTip}
            >
              {showTip ? "Hide" : "What's this?"}
            </button>
          )}
        </div>
      </div>

      <div className={`mt-3 space-y-2 ${compact ? "text-xs" : "text-sm"}`}>
        <BarRow
          label="Community"
          value={formatValue(metric.community, metric.format)}
          pct={communityPct}
          color={COMMUNITY}
        />
        <BarRow
          label="District"
          value={formatValue(metric.district, metric.format)}
          pct={districtPct}
          color={DISTRICT}
        />
      </div>

      {explain && showTip && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950">
          {plainLanguageForMetric(metric)}
        </p>
      )}
    </div>
  );
}

function BarRow({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 sm:grid-cols-[5.5rem_1fr_auto]">
      <span className="text-slate-500">{label}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="min-w-[4.5rem] text-right font-mono text-slate-700 tabular-nums">
        {value}
      </span>
    </div>
  );
}
