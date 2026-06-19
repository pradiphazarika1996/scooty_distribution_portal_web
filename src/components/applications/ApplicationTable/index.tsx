"use client";

import type {
  Application,
  ApplicationStatus,
} from "@/components/applications/Application.types";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useCallback, useMemo } from "react";
import styles from "./ApplicationTable.module.scss";
const TABLE_SIZE = "middle" as const;
const TABLE_SCROLL = { x: "max-content" } as const;

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

const AppAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className={styles.avatar}>{initials}</div>
);

function buildMenuItems(
  id: string,
  onViewDetails?: (id: string) => void,
): MenuProps["items"] {
  return [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "View details",
      onClick: () => onViewDetails?.(id),
    },
  ];
}

interface ApplicationTableProps {
  applications: Application[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}
function formatDateDDMMYYYY(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onApprove,
  onReject,
  onViewDetails,
}) => {
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
          <span className={styles.percent}>
            {app.percentage != null ? `${app.percentage.toFixed(2)}%` : "—"}
          </span>
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
        key: "appliedDate",
        className: styles.dateCell,
        render: (_, app) => formatDateDDMMYYYY(app.appliedDate),
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
            <Dropdown
              menu={{
                items: buildMenuItems(app.id, onViewDetails),
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
        scroll={TABLE_SCROLL}
      />
    </div>
  );
};

export default ApplicationTable;
