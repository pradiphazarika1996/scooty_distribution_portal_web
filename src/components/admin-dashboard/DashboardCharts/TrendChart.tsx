"use client";

import { useChartColors } from "@/hooks/useChartColor";
import { useGetTrendDataQuery } from "@/redux/features/adminDashboard/dashboardApi";
import type { TrendDataItem } from "@/types/dashboard/dashboard";
import { Spin } from "antd";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./DashboardCharts.module.scss";

// ── Helpers ────────────────────────────────────────────────

function buildYTicks(data: TrendDataItem[]): number[] {
  if (!data.length) return [0, 50, 100, 150, 200];
  const max = Math.max(...data.map((d) => d.applications));
  if (max === 0) return [0, 50, 100, 150, 200];
  const ceiling = Math.ceil(max / 50) * 50;
  const step = Math.max(50, Math.ceil(ceiling / 4 / 50) * 50);
  return Array.from(
    { length: Math.floor(ceiling / step) + 1 },
    (_, i) => i * step,
  );
}

// ── Custom tooltip ─────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
  chartBlue,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  chartBlue: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipMonth}>{label}</p>
      <p className={styles.tooltipRow} style={{ color: chartBlue }}>
        {payload[0]?.value?.toLocaleString()} applications
      </p>
    </div>
  );
};

// ── Custom dot — visible on every data point ───────────────

const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;
  return (
    <circle cx={cx} cy={cy} r={4} fill="#fff" stroke={stroke} strokeWidth={2} />
  );
};

// ── Weekly summary row ─────────────────────────────────────

const WeeklySummary: React.FC<{
  data: TrendDataItem[];
  chartBlue: string;
}> = ({ data, chartBlue }) => {
  const total = data.reduce((s, d) => s + d.applications, 0);
  return (
    <div className={styles.weeklySummary}>
      {data.map((d) => {
        const pct = total > 0 ? Math.round((d.applications / total) * 100) : 0;
        return (
          <div key={d.month} className={styles.weekItem}>
            <span className={styles.weekLabel}>{d.month}</span>
            <span className={styles.weekCount} style={{ color: chartBlue }}>
              {d.applications.toLocaleString()}
            </span>
            <span className={styles.weekPct}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Component ──────────────────────────────────────────────

const TrendChart: React.FC = () => {
  const { chartBlue } = useChartColors();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetTrendDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const trendData = response?.data ?? [];
  const yTicks = useMemo(() => buildYTicks(trendData), [trendData]);
  const isEmpty = trendData.every((d) => d.applications === 0);
  const total = trendData.reduce((s, d) => s + d.applications, 0);

  return (
    <div className={styles.chartCard}>
      <div className={styles.trendHeader}>
        <div>
          <p className={styles.chartTitle}>Applications trend</p>
          <p className={styles.chartSubtitle}>
            Weekly submissions · May 25 – Jun 25
          </p>
        </div>
        {!isLoading && !isError && !isEmpty && (
          <div className={styles.trendTotal}>
            <span className={styles.trendTotalCount}>
              {total.toLocaleString()}
            </span>
            <span className={styles.trendTotalLabel}>total</span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className={styles.chartStateWrapper}>
          <Spin size="default" />
        </div>
      )}

      {!isLoading && isError && (
        <div className={styles.chartStateWrapper}>
          <span className={styles.chartStateText}>
            Failed to load trend data
          </span>
        </div>
      )}

      {!isLoading && !isError && isEmpty && (
        <div className={styles.chartStateWrapper}>
          <span className={styles.chartStateText}>No applications yet</span>
        </div>
      )}

      {!isLoading && !isError && !isEmpty && (
        <>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={trendData}
              margin={{ top: 16, right: 8, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartBlue} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={chartBlue} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                horizontal
                vertical={false}
                strokeDasharray="4 4"
                stroke="var(--outline-variant)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "var(--on-surface-variant)",
                  fontFamily: "var(--font-family)",
                }}
                dy={6}
              />
              <YAxis
                ticks={yTicks}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--on-surface-variant)",
                  fontFamily: "var(--font-family)",
                }}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                }
              />
              <Tooltip
                content={<CustomTooltip chartBlue={chartBlue} />}
                cursor={{
                  stroke: "var(--outline-variant)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="monotone"
                dataKey="applications"
                stroke={chartBlue}
                strokeWidth={2.5}
                fill="url(#blueGrad)"
                dot={<CustomDot stroke={chartBlue} />}
                activeDot={{
                  r: 6,
                  fill: chartBlue,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Weekly breakdown summary */}
          <WeeklySummary data={trendData} chartBlue={chartBlue} />
        </>
      )}
    </div>
  );
};

export default TrendChart;
