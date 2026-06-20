import type { ComparisonMetric, MetricFormat } from "../types/community";

export function formatValue(value: number, format: MetricFormat): string {
  switch (format) {
    case "percent":
      return `${value.toFixed(1)}%`;
    case "currency":
      return value >= 1_000_000
        ? `$${(value / 1_000_000).toFixed(2)}M`
        : `$${Math.round(value).toLocaleString("en-US")}`;
    case "years":
      return `${Math.round(value)} yrs`;
    case "number":
      return value.toLocaleString("en-US");
    default:
      return String(value);
  }
}

export function formatDelta(metric: ComparisonMetric): string {
  const { community, district, format } = metric;
  const diff = community - district;

  if (format === "percent") {
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${diff.toFixed(1)} pp`;
  }
  if (format === "years") {
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${Math.round(diff)} yrs vs district`;
  }
  if (format === "currency") {
    const sign = diff >= 0 ? "+" : "−";
    return `${sign}$${Math.abs(Math.round(diff)).toLocaleString("en-US")}`;
  }
  if (format === "number") {
    return `${((community / district) * 100).toFixed(1)}% of district size`;
  }
  return "";
}

export function barPercent(value: number, metric: ComparisonMetric): number {
  if (metric.format === "percent") {
    return Math.min(100, Math.max(0, value));
  }
  const max = Math.max(metric.community, metric.district);
  if (max === 0) return 0;
  return (value / max) * 100;
}

export function deltaDirection(
  metric: ComparisonMetric
): "higher" | "lower" | "similar" {
  const diff = metric.community - metric.district;
  if (metric.format === "percent" || metric.format === "years") {
    if (Math.abs(diff) < 1) return "similar";
    return diff > 0 ? "higher" : "lower";
  }
  if (metric.format === "currency" || metric.format === "number") {
    const pctDiff = Math.abs(diff) / Math.max(metric.district, 1);
    if (pctDiff < 0.05) return "similar";
    return diff > 0 ? "higher" : "lower";
  }
  return "similar";
}
