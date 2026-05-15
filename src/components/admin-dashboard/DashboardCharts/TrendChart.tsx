"use client";

import { TREND_DATA } from "@/components/data/dashboard/dashboardCharts.data";
import { useChartColors } from "@/hooks/useChartColor";
import React from "react";
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

// ── Custom tooltip ─────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
  chartBlue,
  chartGreen,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  chartBlue: string;
  chartGreen: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipMonth}>{label}</p>
      <p className={styles.tooltipRow} style={{ color: chartBlue }}>
        applications : {payload[0]?.value}
      </p>
      <p className={styles.tooltipRow} style={{ color: chartGreen }}>
        approved : {payload[1]?.value}
      </p>
    </div>
  );
};

// ── Custom bottom legend ───────────────────────────────────

const LegendMarker = ({ color }: { color: string }) => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
    <line x1="0" y1="6" x2="26" y2="6" stroke={color} strokeWidth="2" />
    <circle
      cx="13"
      cy="6"
      r="3.5"
      stroke={color}
      strokeWidth="2"
      fill="white"
    />
  </svg>
);

// ── Component ──────────────────────────────────────────────

const TrendChart: React.FC = () => {
  const { chartBlue, chartGreen } = useChartColors();

  return (
    <div className={styles.chartCard}>
      <p className={styles.chartTitle}>Applications Trend</p>
      <p className={styles.chartSubtitle}>Monthly submissions vs approvals</p>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={TREND_DATA}
          margin={{ top: 16, right: 16, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartBlue} stopOpacity={0.2} />
              <stop offset="100%" stopColor={chartBlue} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartGreen} stopOpacity={0.2} />
              <stop offset="100%" stopColor={chartGreen} stopOpacity={0} />
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
            axisLine={{ stroke: "var(--outline-variant)" }}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "var(--on-surface-variant)",
              fontFamily: "var(--font-family)",
            }}
          />
          <YAxis
            ticks={[0, 400, 800, 1200, 1600]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "var(--on-surface-variant)",
              fontFamily: "var(--font-family)",
            }}
          />
          <Tooltip
            content={
              <CustomTooltip chartBlue={chartBlue} chartGreen={chartGreen} />
            }
            cursor={{ stroke: "var(--outline-variant)", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="applications"
            stroke={chartBlue}
            strokeWidth={2}
            fill="url(#blueGrad)"
            dot={false}
            activeDot={{
              r: 5,
              fill: chartBlue,
              stroke: "white",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="approved"
            stroke={chartGreen}
            strokeWidth={2}
            fill="url(#greenGrad)"
            dot={false}
            activeDot={{
              r: 5,
              fill: chartGreen,
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* ── Legend ── */}
      <div className={styles.trendLegend}>
        <div className={styles.legendItem}>
          <LegendMarker color={chartBlue} />
          <span className={styles.legendLabel} style={{ color: chartBlue }}>
            applications
          </span>
        </div>
        <div className={styles.legendItem}>
          <LegendMarker color={chartGreen} />
          <span className={styles.legendLabel} style={{ color: chartGreen }}>
            approved
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
