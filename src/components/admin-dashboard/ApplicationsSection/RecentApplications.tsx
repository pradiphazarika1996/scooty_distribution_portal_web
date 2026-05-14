"use client";

import {
  RECENT_APPLICATIONS,
  type ApplicationStatus,
} from "@/components/data/dashboard/recentApplications.data";
import { useChartColors } from "@/hooks/useChartColor";
import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./ApplicationsSection.module.scss";

// ── Avatar ────────────────────────────────────────────────

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// bgColor passed as resolved hex from useChartColors — avoids
// CSS var not resolving when --chart-blue not yet in globals.css
const Avatar: React.FC<{ name: string; bgColor: string }> = ({
  name,
  bgColor,
}) => (
  <div className={styles.avatar} style={{ backgroundColor: bgColor }}>
    {getInitials(name)}
  </div>
);

// ── Status badge ──────────────────────────────────────────

const BADGE_CLASS: Record<ApplicationStatus, string> = {
  Pending: styles.badgePending,
  Approved: styles.badgeApproved,
  Rejected: styles.badgeRejected,
  "Under Scrutiny": styles.badgeScrutiny,
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${BADGE_CLASS[status]}`}>{status}</span>
);

// ── Component ─────────────────────────────────────────────

const RecentApplications: React.FC = () => {
  const { chartBlue } = useChartColors();

  return (
    <div className={styles.chartCard}>
      <div className={styles.recentHeader}>
        <div>
          <p className={styles.chartTitle}>Recent Applications</p>
          <p className={styles.chartSubtitle}>
            Latest 5 submissions awaiting review
          </p>
        </div>
        <a href="#" className={styles.viewAll}>
          View all <ArrowUpOutlined style={{ fontSize: 11, rotate: "45deg" }} />
        </a>
      </div>
      <div className={styles.rowList}>
        {RECENT_APPLICATIONS.map((app) => (
          <div key={app.id} className={styles.appRow}>
            <div className={styles.rowLeft}>
              <Avatar name={app.name} bgColor={chartBlue} />
              <div className={styles.rowInfo}>
                <span className={styles.rowName}>{app.name}</span>
                <span className={styles.rowMeta}>{app.meta}</span>
              </div>
            </div>

            <div className={styles.rowRight}>
              <span className={styles.rowPercent}>{app.percentage}</span>
              <StatusBadge status={app.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;
