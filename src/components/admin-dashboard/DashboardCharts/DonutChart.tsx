"use client";

import { DONUT_DATA } from "@/components/data/dashboard/dashboardCharts.data";
import { useChartColors } from "@/hooks/useChartColor";
import React, { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import styles from "./DashboardCharts.module.scss";

// ── Active (expanded) segment shape ───────────────────────

const ActiveSegment = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) => (
  <Sector
    cx={props.cx}
    cy={props.cy}
    innerRadius={props.innerRadius}
    outerRadius={props.outerRadius + 8} // expand by 8px on hover
    startAngle={props.startAngle}
    endAngle={props.endAngle}
    fill={props.fill}
  />
);

// ── Custom tooltip ─────────────────────────────────────────

const DonutTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.donutTooltip}>
      {payload[0].name} : {payload[0].value.toLocaleString()}
    </div>
  );
};

// ── Component ──────────────────────────────────────────────

const DonutChart: React.FC = () => {
  const { chartBlue, chartGreen } = useChartColors();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Colors indexed to match DONUT_DATA order
  const segmentColors = [chartBlue, chartGreen];

  return (
    <div className={styles.chartCard}>
      <p className={styles.chartTitle}>Examination Split</p>
      <p className={styles.chartSubtitle}>HSLC vs HS applicants</p>

      <div className={styles.donutWrapper}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={DONUT_DATA}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={102}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              // activeIndex={activeIndex}
              // activeShape={ActiveSegment}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {DONUT_DATA.map((_, index) => (
                <Cell key={`cell-${index}`} fill={segmentColors[index]} />
              ))}
            </Pie>
            <Tooltip
              content={<DonutTooltip />}
              allowEscapeViewBox={{ x: true, y: true }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ── */}
      <div className={styles.donutLegend}>
        {DONUT_DATA.map((entry, index) => (
          <div key={entry.name} className={styles.donutLegendItem}>
            <span
              className={styles.donutDot}
              style={{ backgroundColor: segmentColors[index] }}
            />
            <span className={styles.donutLegendLabel}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
