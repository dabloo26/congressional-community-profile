import { useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { plainLanguageForProfile } from "../data/buildProfile";
import type { ComparisonMetric } from "../types/community";
import { deltaDirection, formatDelta, formatValue } from "../lib/communityProfileFormat";

type Props = {
  metric: ComparisonMetric;
  active?: boolean;
  onSelect?: (id: string) => void;
};

export function InteractiveHighlightCard({ metric, active, onSelect }: Props) {
  const { profile } = useCommunity();
  const [expanded, setExpanded] = useState(false);
  const direction = deltaDirection(metric);
  const explanation = plainLanguageForProfile(profile, metric.id);

  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.(metric.id);
        setExpanded((v) => !v);
      }}
      className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        active ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {metric.label}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-display text-3xl" style={{ color: profile.stats.theme.primary }}>
          {formatValue(metric.community, metric.format)}
        </span>
        <span className="text-sm text-slate-400">vs district</span>
        <span className="text-lg text-slate-600">
          {formatValue(metric.district, metric.format)}
        </span>
      </div>
      {direction !== "similar" && (
        <p
          className={`mt-2 text-sm font-semibold ${
            direction === "higher" ? "text-blue-700" : "text-amber-700"
          }`}
        >
          {formatDelta(metric)}
        </p>
      )}
      <p
        className={`mt-3 text-sm leading-relaxed text-slate-600 ${
          expanded ? "block" : "line-clamp-2"
        }`}
      >
        {explanation}
      </p>
      <span className="mt-2 inline-block text-xs font-medium text-blue-600">
        {expanded ? "Show less ↑" : "Tap to read more ↓"}
      </span>
    </button>
  );
}
