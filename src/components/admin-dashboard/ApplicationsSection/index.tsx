import React from "react";
import styles from "./ApplicationsSection.module.scss";
import DistrictChart from "./DistrictChart";
import RecentApplications from "./RecentApplications";

const ApplicationsSection: React.FC = () => (
  <div className={styles.appGrid}>
    <RecentApplications />
    <DistrictChart />
  </div>
);

export default ApplicationsSection;
