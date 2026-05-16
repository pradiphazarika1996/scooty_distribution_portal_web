import React from "react";
import styles from "./DashboardCharts.module.scss";
import DonutChart from "./DonutChart";
import TrendChart from "./TrendChart";

const DashboardCharts: React.FC = () => (
  <div className={styles.chartsGrid}>
    <TrendChart />
    <DonutChart />
  </div>
);

export default DashboardCharts;
