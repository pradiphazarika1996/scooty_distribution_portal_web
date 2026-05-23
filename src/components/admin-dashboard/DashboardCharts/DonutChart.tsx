"use client";

import { useGetExamSplitQuery } from "@/redux/features/adminDashboard/dashboardApi";
import type { ChartEntry } from "@/types/dashboard/dashboard";
import { EXAM_TYPE, getExamTypeName } from "@/utils/students/student";
import { Spin } from "antd";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useChartColors } from "@/hooks/useChartColor";
import styles from "./DashboardCharts.module.scss";

// ── Helpers ────────────────────────────────────────────────

function buildDonutData(hslc: number, hs: number): ChartEntry[] {
  return [
    { name: getExamTypeName(EXAM_TYPE.HSLC), value: hslc },
    { name: getExamTypeName(EXAM_TYPE.HS), value: hs },
  ];
}

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

  const {
    data: examSplitResponse,
    isLoading,
    isError,
  } = useGetExamSplitQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Colors indexed to match HSLC / HS order
  const segmentColors = [chartBlue, chartGreen];

  const donutData: ChartEntry[] = examSplitResponse?.data
    ? buildDonutData(examSplitResponse.data.hslc, examSplitResponse.data.hs)
    : buildDonutData(0, 0);

  const isEmpty = donutData.every((entry) => entry.value === 0);

  return (
    <div className={styles.chartCard}>
      <p className={styles.chartTitle}>Examination Split</p>
      <p className={styles.chartSubtitle}>HSLC vs HS applicants</p>

      <div className={styles.donutWrapper}>
        {/* ── Loading ── */}
        {isLoading && (
          <div className={styles.chartStateWrapper}>
            <Spin size="default" />
          </div>
        )}

        {/* ── Error ── */}
        {!isLoading && isError && (
          <div className={styles.chartStateWrapper}>
            <span className={styles.chartStateText}>
              Failed to load chart data
            </span>
          </div>
        )}

        {/* ── Empty ── */}
        {!isLoading && !isError && isEmpty && (
          <div className={styles.chartStateWrapper}>
            <span className={styles.chartStateText}>No applications yet</span>
          </div>
        )}

        {/* ── Chart ── */}
        {!isLoading && !isError && !isEmpty && (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={102}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {donutData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={segmentColors[index]} />
                ))}
              </Pie>
              <Tooltip
                content={<DonutTooltip />}
                allowEscapeViewBox={{ x: true, y: true }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Legend ── */}
      <div className={styles.donutLegend}>
        {donutData.map((entry, index) => (
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
