import type { ComparisonMetric } from "../data/communityProfileDemo";
import { deltaDirection, formatDelta, formatValue } from "../lib/communityProfileFormat";

type Props = {
  metric: ComparisonMetric;
};

export function HighlightCard({ metric }: Props) {
  const direction = deltaDirection(metric);

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {metric.label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-3xl text-slate-900">
          {formatValue(metric.community, metric.format)}
        </span>
        <span className="text-sm text-slate-400">vs</span>
        <span className="text-lg text-slate-600">
          {formatValue(metric.district, metric.format)}
        </span>
      </div>
      {direction !== "similar" && (
        <p
          className={`mt-2 text-sm font-medium ${
            direction === "higher" ? "text-blue-700" : "text-amber-700"
          }`}
        >
          {formatDelta(metric)} in this community
        </p>
      )}
    </div>
  );
}
