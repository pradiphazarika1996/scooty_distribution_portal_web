"use client";

import type {
  Application,
  ApplicationStatus,
} from "@/components/applications/Application.types";
import {
  ClockCircleOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useCallback, useMemo } from "react";
import styles from "./ApplicationTable.module.scss";

// ── Constants ──────────────────────────────────────────────

// Fix 3: extracted so Table props reference a named constant
const TABLE_SIZE = "middle" as const;
// Horizontal scroll ensures the table never breaks on narrow
// viewports — content stays accessible via scroll instead of
// wrapping or overflowing its container.
const TABLE_SCROLL = { x: "max-content" } as const;

// ── Status badge ───────────────────────────────────────────

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  submitted: "Submitted", // ← new
  under_scrutiny: "Under Scrutiny",
  approved: "Approved",
  rejected: "Rejected",
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
    {STATUS_LABELS[status]}
  </span>
);

// ── Avatar ─────────────────────────────────────────────────

const AppAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className={styles.avatar}>{initials}</div>
);

// ── Action menu items ──────────────────────────────────────
// Pure function outside the component — not recreated on render.

function buildMenuItems(
  id: string,
  onViewDetails?: (id: string) => void,
  onMarkScrutiny?: (id: string) => void,
  onDownloadPdf?: (id: string) => void,
): MenuProps["items"] {
  return [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "View details",
      onClick: () => onViewDetails?.(id),
    },
    // {
    //   key: "scrutiny",
    //   icon: <ClockCircleOutlined />,
    //   label: "Mark under scrutiny",
    //   onClick: () => onMarkScrutiny?.(id),
    // },
    // {
    //   key: "pdf",
    //   icon: <FilePdfOutlined />,
    //   label: "Acknowledgement (PDF)",
    //   onClick: () => onDownloadPdf?.(id),
    // },
  ];
}

// ── Props ──────────────────────────────────────────────────

interface ApplicationTableProps {
  applications: Application[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  // onMarkScrutiny?: (id: string) => void;
  // onDownloadPdf?: (id: string) => void;
}

// ── Component ──────────────────────────────────────────────

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onApprove,
  onReject,
  onViewDetails,
  // onMarkScrutiny,
  // onDownloadPdf,
}) => {
  // ── Columns ───────────────────────────────────────────
  const columns = useMemo<ColumnsType<Application>>(
    () => [
      {
        title: "Reference No.",
        dataIndex: "referenceNo",
        key: "referenceNo",
        className: styles.refNo,
      },
      {
        title: "Applicant",
        key: "applicant",
        render: (_, app) => (
          <div className={styles.applicantCell}>
            <AppAvatar initials={app.applicant.initials} />
            <div>
              <div className={styles.primaryText}>{app.applicant.name}</div>
              <div className={styles.secondaryText}>{app.applicant.phone}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Exam",
        key: "exam",
        render: (_, app) => (
          <>
            <div className={styles.primaryText}>{app.exam.type}</div>
            <div className={styles.secondaryText}>
              {app.exam.board} · {app.exam.year}
            </div>
          </>
        ),
      },
      {
        title: "%",
        key: "percentage",
        className: styles.percentCol,
        render: (_, app) => (
          <span className={styles.percent}>{app.percentage.toFixed(2)}%</span>
        ),
      },
      {
        title: "Location",
        key: "location",
        render: (_, app) => (
          <>
            <div className={styles.primaryText}>{app.location.district}</div>
            <div className={styles.secondaryText}>
              {app.location.subLocation}
            </div>
          </>
        ),
      },
      {
        title: "Applied",
        dataIndex: "appliedDate",
        key: "appliedDate",
        className: styles.dateCell,
      },
      {
        title: "Status",
        key: "status",
        render: (_, app) => <StatusBadge status={app.status} />,
      },
      {
        title: "Actions",
        key: "actions",
        className: styles.actionsCol,
        render: (_, app) => (
          <div className={styles.actions}>
            {/* <Button
              type="text"
              className={`${styles.actionBtn} ${styles.approveBtn}`}
              icon={<CheckOutlined />}
              onClick={() => onApprove?.(app.id)}
              aria-label="Approve"
              title="Approve"
            />
            <Button
              type="text"
              className={`${styles.actionBtn} ${styles.rejectBtn}`}
              icon={<CloseOutlined />}
              onClick={() => onReject?.(app.id)}
              aria-label="Reject"
              title="Reject"
            /> */}
            <Dropdown
              menu={{
                items: buildMenuItems(
                  app.id,
                  onViewDetails,
                  // onMarkScrutiny,
                  // onDownloadPdf,
                ),
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                className={styles.dotsBtn}
                icon={<EllipsisOutlined rotate={90} />}
                aria-label="More actions"
              />
            </Dropdown>
          </div>
        ),
      },
    ],
    [onApprove, onReject, onViewDetails],
  );

  // ── Row selection ──────────────────────────────────────

  // Fix 1: removed redundant useCallback wrapper around onSelectAll.
  // onSelectAll from parent is already wrapped in useCallback there —
  // wrapping it again here just adds an extra closure for no benefit.
  const handleSelect = useCallback(
    (record: Application, selected: boolean) =>
      onSelectRow(record.id, selected),
    [onSelectRow],
  );

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys: Array.from(selectedIds),
      onSelect: handleSelect,
      onSelectAll: (selected: boolean) => onSelectAll(selected),
      columnClassName: styles.checkboxCell,
    }),
    [selectedIds, handleSelect, onSelectAll],
  );

  // ── Row class ──────────────────────────────────────────

  const rowClassName = useCallback(
    (app: Application) => (selectedIds.has(app.id) ? styles.selectedRow : ""),
    [selectedIds],
  );

  return (
    <div className={styles.tableWrapper}>
      <Table<Application>
        className={styles.table}
        dataSource={applications}
        columns={columns}
        rowKey="id"
        rowSelection={rowSelection}
        rowClassName={rowClassName}
        pagination={false}
        size={TABLE_SIZE}
        scroll={TABLE_SCROLL} // Fix 2: prevents layout break on narrow viewports
      />
    </div>
  );
};

export default ApplicationTable;
