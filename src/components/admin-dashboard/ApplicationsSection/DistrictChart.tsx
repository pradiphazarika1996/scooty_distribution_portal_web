// "use client";

// import { useChartColors } from "@/hooks/useChartColor";
// import { useGetDistrictChartQuery } from "@/redux/features/adminDashboard/dashboardApi";
// import { Skeleton } from "antd";
// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import styles from "./ApplicationsSection.module.scss";

// // ── Helpers ────────────────────────────────────────────────

// function calcDomainMax(max: number): number {
//   if (max === 0) return 200;
//   return Math.ceil(max / 200) * 200;
// }

// function buildTicks(domainMax: number): number[] {
//   return Array.from({ length: domainMax / 200 + 1 }, (_, i) => i * 200);
// }

// // ── Custom tooltip ─────────────────────────────────────────

// const DistrictTooltip = ({
//   active,
//   payload,
// }: {
//   active?: boolean;
//   payload?: Array<{ value: number; payload: { district: string } }>;
// }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className={styles.districtTooltip}>
//       <span className={styles.districtTooltipLabel}>
//         {payload[0].payload.district}
//       </span>
//       <span className={styles.districtTooltipValue}>
//         {payload[0].value.toLocaleString()} applications
//       </span>
//     </div>
//   );
// };

// // ── Component ──────────────────────────────────────────────

// const DistrictChart: React.FC = () => {
//   const { chartBlue } = useChartColors();

//   const {
//     data: response,
//     isLoading,
//     isError,
//   } = useGetDistrictChartQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const districtData = response?.data ?? [];
//   const maxCount = Math.max(...districtData.map((d) => d.count), 0);
//   const domainMax = calcDomainMax(maxCount);
//   const ticks = buildTicks(domainMax);

//   // 34px per bar keeps spacing consistent regardless of district count
//   const chartHeight = Math.max(220, districtData.length * 34);

//   return (
//     <div className={styles.chartCard}>
//       <p className={styles.chartTitle}>District-wise</p>
//       <p className={styles.chartSubtitle}>Applications by MAC district</p>

//       {/* ── Loading ── */}
//       {isLoading && (
//         <div style={{ padding: "16px 0" }}>
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 marginBottom: 12,
//               }}
//             >
//               <Skeleton.Input
//                 active
//                 size="small"
//                 style={{ width: 70, flexShrink: 0 }}
//               />
//               <Skeleton.Input
//                 active
//                 size="small"
//                 style={{ width: `${40 + (i % 4) * 12}%` }}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Error ── */}
//       {!isLoading && isError && (
//         <div className={styles.chartStateWrapper}>
//           <span className={styles.chartStateText}>
//             Failed to load district data
//           </span>
//         </div>
//       )}

//       {/* ── Empty ── */}
//       {!isLoading && !isError && districtData.length === 0 && (
//         <div className={styles.chartStateWrapper}>
//           <span className={styles.chartStateText}>No district data yet</span>
//         </div>
//       )}

//       {/* ── Chart ── */}
//       {!isLoading && !isError && districtData.length > 0 && (
//         <ResponsiveContainer width="100%" height={chartHeight}>
//           <BarChart
//             data={districtData}
//             layout="vertical"
//             margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
//           >
//             <CartesianGrid
//               horizontal={false}
//               vertical
//               strokeDasharray="4 4"
//               stroke="var(--outline-variant)"
//             />
//             <XAxis
//               type="number"
//               domain={[0, domainMax]}
//               ticks={ticks}
//               axisLine={{ stroke: "var(--outline-variant)" }}
//               tickLine={false}
//               tick={{
//                 fontSize: 11,
//                 fill: "var(--on-surface-variant)",
//                 fontFamily: "var(--font-family)",
//               }}
//             />
//             <YAxis
//               type="category"
//               dataKey="district"
//               width={72}
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fontSize: 11,
//                 fill: "var(--on-surface-variant)",
//                 fontFamily: "var(--font-family)",
//                 textAnchor: "end",
//               }}
//             />
//             <Bar
//               dataKey="count"
//               fill={chartBlue}
//               barSize={13}
//               radius={[0, 2, 2, 0]}
//             />
//             <Tooltip
//               content={<DistrictTooltip />}
//               cursor={{ fill: "var(--surface-container)", opacity: 0.5 }}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default DistrictChart;

"use client";

import { useChartColors } from "@/hooks/useChartColor";
import { useGetDistrictChartQuery } from "@/redux/features/adminDashboard/dashboardApi";
import { Skeleton } from "antd";
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

// ── Helpers ────────────────────────────────────────────────

function calcDomainMax(max: number): number {
  if (max === 0) return 200;
  return Math.ceil(max / 200) * 200;
}

function buildTicks(domainMax: number): number[] {
  return Array.from({ length: domainMax / 200 + 1 }, (_, i) => i * 200);
}

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
        {payload[0].value.toLocaleString()} applications
      </span>
    </div>
  );
};

// ── Component ──────────────────────────────────────────────

const DistrictChart: React.FC = () => {
  const { chartBlue } = useChartColors();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetDistrictChartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const districtData = response?.data ?? [];
  const maxCount = Math.max(...districtData.map((d) => d.count), 0);
  const domainMax = calcDomainMax(maxCount);
  const ticks = buildTicks(domainMax);

  // 36px per bar — no artificial minimum so bars never spread too far apart
  const chartHeight = Math.max(districtData.length * 36, 80);

  return (
    <div className={styles.chartCard}>
      <p className={styles.chartTitle}>District-wise</p>
      <p className={styles.chartSubtitle}>Applications by MAC district</p>

      {/* ── Loading ── */}
      {isLoading && (
        <div style={{ padding: "16px 0" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Skeleton.Input
                active
                size="small"
                style={{ width: 70, flexShrink: 0 }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: `${40 + (i % 4) * 12}%` }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {!isLoading && isError && (
        <div className={styles.chartStateWrapper}>
          <span className={styles.chartStateText}>
            Failed to load district data
          </span>
        </div>
      )}

      {/* ── Empty ── */}
      {!isLoading && !isError && districtData.length === 0 && (
        <div className={styles.chartStateWrapper}>
          <span className={styles.chartStateText}>No district data yet</span>
        </div>
      )}

      {/* ── Chart ── */}
      {!isLoading && !isError && districtData.length > 0 && (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={districtData}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
            barCategoryGap={8}
          >
            <CartesianGrid
              horizontal={false}
              vertical
              strokeDasharray="4 4"
              stroke="var(--outline-variant)"
            />
            <XAxis
              type="number"
              domain={[0, domainMax]}
              ticks={ticks}
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
      )}
    </div>
  );
};

export default DistrictChart;