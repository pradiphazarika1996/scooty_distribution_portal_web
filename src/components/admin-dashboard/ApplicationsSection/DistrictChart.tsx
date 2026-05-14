"use client";

import { DISTRICT_DATA } from "@/components/data/dashboard/districtChart.data";
import { useChartColors } from "@/hooks/useChartColor";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./ApplicationsSection.module.scss";

// ── Custom tooltip ─────────────────────────────────────────

const DistrictTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { district: string } }>;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.districtTooltip}>
      <span className={styles.districtTooltipLabel}>
        {payload[0].payload.district}
      </span>
      <span className={styles.districtTooltipValue}>
        {payload[0].value} applications
      </span>
    </div>
  );
};

const DistrictChart: React.FC = () => {
  const { chartBlue } = useChartColors();

  return (
    <div className={styles.chartCard}>
      <p className={styles.chartTitle}>District-wise</p>
      <p className={styles.chartSubtitle}>Applications by MAC district</p>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={DISTRICT_DATA}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid
            horizontal={false}
            vertical
            strokeDasharray="4 4"
            stroke="var(--outline-variant)"
          />
          <XAxis
            type="number"
            domain={[0, 800]}
            ticks={[0, 200, 400, 600, 800]}
            axisLine={{ stroke: "var(--outline-variant)" }}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "var(--on-surface-variant)",
              fontFamily: "var(--font-family)",
            }}
          />
          <YAxis
            type="category"
            dataKey="district"
            width={72}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "var(--on-surface-variant)",
              fontFamily: "var(--font-family)",
              textAnchor: "end",
            }}
          />
          <Bar
            dataKey="count"
            fill={chartBlue}
            barSize={13}
            radius={[0, 2, 2, 0]}
          />
          <Tooltip
            content={<DistrictTooltip />}
            cursor={{ fill: "var(--surface-container)", opacity: 0.5 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistrictChart;
