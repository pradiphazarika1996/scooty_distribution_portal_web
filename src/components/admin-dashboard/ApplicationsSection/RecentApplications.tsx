"use client";

import { useGetRecentApplicationsQuery } from "@/redux/features/adminDashboard/dashboardApi";
import type {
  ApplicationStatus,
  RecentApplicationItem,
} from "@/types/dashboard/dashboard";
import { EXAM_TYPE, getExamTypeName } from "@/utils/students/student";
import { useChartColors } from "@/hooks/useChartColor";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import React from "react";
import styles from "./ApplicationsSection.module.scss";

// ── Status mapping ─────────────────────────────────────────
// Maps raw application_status (number) → display label for badge.
// Mirrors APPLICATION_STATUS values from Application.model.ts.

const APPLICATION_STATUS_DISPLAY: Record<number, ApplicationStatus> = {
  2: "Pending", // SUBMITTED
  3: "Pending", // PAYMENT_COMPLETED
  4: "Under Scrutiny", // UNDER_REVIEW
  5: "Under Scrutiny", // QUERY_RAISED
  6: "Approved", // APPROVED
  7: "Rejected", // REJECTED
};

// ── Formatters ─────────────────────────────────────────────

function getDisplayStatus(status: number): ApplicationStatus {
  return APPLICATION_STATUS_DISPLAY[status] ?? "Pending";
}

function formatMeta(examId: number, submittedAt: string | null): string {
  const examLabel = getExamTypeName(examId);
  if (!submittedAt) return examLabel;

  const date = new Date(submittedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${examLabel} · ${date}`;
}

// ── Avatar ────────────────────────────────────────────────

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

// ── Skeleton row — matches real row height ─────────────────

const SkeletonRow: React.FC = () => (
  <div className={styles.appRow}>
    <div className={styles.rowLeft}>
      <Skeleton.Avatar active size={36} shape="circle" />
      <div className={styles.rowInfo}>
        <Skeleton.Input active size="small" style={{ width: 120 }} />
        <Skeleton.Input active size="small" style={{ width: 80 }} />
      </div>
    </div>
    <div className={styles.rowRight}>
      <Skeleton.Input active size="small" style={{ width: 50 }} />
      <Skeleton.Input active size="small" style={{ width: 90 }} />
    </div>
  </div>
);

// ── Application row ───────────────────────────────────────

const ApplicationRow: React.FC<{
  app: RecentApplicationItem;
  bgColor: string;
}> = ({ app, bgColor }) => (
  <div key={app.id} className={styles.appRow}>
    <div className={styles.rowLeft}>
      <Avatar name={app.studentName} bgColor={bgColor} />
      <div className={styles.rowInfo}>
        <span className={styles.rowName}>{app.studentName}</span>
        <span className={styles.rowMeta}>
          {formatMeta(app.examId, app.submittedAt)}
        </span>
      </div>
    </div>
    <div className={styles.rowRight}>
      {/* <span className={styles.rowPercent}>{app.marksDisplay}</span> */}
      <StatusBadge status={getDisplayStatus(app.applicationStatus)} />
    </div>
  </div>
);

// ── Component ─────────────────────────────────────────────

const RecentApplications: React.FC = () => {
  const { chartBlue } = useChartColors();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetRecentApplicationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const applications = response?.data ?? [];

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
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

        {/* Error */}
        {!isLoading && isError && (
          <p className={styles.chartStateText}>
            Failed to load recent applications.
          </p>
        )}

        {/* Empty */}
        {!isLoading && !isError && applications.length === 0 && (
          <p className={styles.chartStateText}>No recent applications found.</p>
        )}

        {/* Data */}
        {!isLoading &&
          !isError &&
          applications.map((app) => (
            <ApplicationRow key={app.id} app={app} bgColor={chartBlue} />
          ))}
      </div>
    </div>
  );
};

export default RecentApplications;
