import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = Record<string, string | number>;

type Props = {
  data: Row[];
  categoryKey: string;
  communityKey?: string;
  districtKey?: string;
  /** Single-series rows use `valueKey` + `seriesKey for color */
  valueKey?: string;
  yUnit?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
};

const COMMUNITY = "#1d4ed8";
const DISTRICT = "#94a3b8";

export function ComparisonBarChart({
  data,
  categoryKey,
  communityKey = "community",
  districtKey = "district",
  valueKey,
  yUnit = "",
  height = 260,
  layout = "horizontal",
}: Props) {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={isVertical ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 12, left: isVertical ? 8 : 0, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        {isVertical ? (
          <>
            <XAxis type="number" unit={yUnit} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey={categoryKey}
              width={110}
              tick={{ fontSize: 11 }}
            />
          </>
        ) : (
          <>
            <XAxis dataKey={categoryKey} tick={{ fontSize: 11 }} />
            <YAxis unit={yUnit} tick={{ fontSize: 11 }} />
          </>
        )}
        <Tooltip
          contentStyle={{ borderRadius: 10, fontSize: 13, maxWidth: 280 }}
          formatter={(value, name) => {
            const label =
              name === communityKey || name === "Community" ? "Community" : "District";
            return [`${Number(value)}${yUnit}`, label];
          }}
          labelFormatter={(label) => `${label}. Hover for numbers. Read the green box below for meaning.`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {valueKey ? (
          <Bar
            dataKey={valueKey}
            fill={COMMUNITY}
            radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            name="Value"
          />
        ) : (
          <>
            <Bar
              dataKey={communityKey}
              fill={COMMUNITY}
              radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              name="Community"
            />
            <Bar
              dataKey={districtKey}
              fill={DISTRICT}
              radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              name="District"
            />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChartTip({ text }: { text: string }) {
  return (
    <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
      💡 {text}
    </p>
  );
}
