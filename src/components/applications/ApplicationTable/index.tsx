"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Application, ApplicationStatus } from "@/components/applications/Application.types";
import styles from "./ApplicationTable.module.scss";

// ── Icons ─────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M2.5 7.5L5.5 10.5L12.5 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 2L12 12M12 2L2 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ScrutinyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M7 4.5V7.5L9 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const PdfIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M8.5 1H3C2.44772 1 2 1.44772 2 2V12C2 12.5523 2.44772 13 3 13H11C11.5523 13 12 12.5523 12 12V4.5L8.5 1Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 1V4.5H12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Status Badge ──────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  under_scrutiny: "Under Scrutiny",
  approved: "Approved",
  rejected: "Rejected",
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
    {STATUS_LABELS[status]}
  </span>
);

// ── Avatar ────────────────────────────────────────────────────────────────────

const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className={styles.avatar}>{initials}</div>
);

// ── Action Menu ───────────────────────────────────────────────────────────────

interface ActionMenuProps {
  onViewDetails: () => void;
  onMarkScrutiny: () => void;
  onDownloadPdf: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onViewDetails,
  onMarkScrutiny,
  onDownloadPdf,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  return (
    <div ref={menuRef} className={styles.menuWrapper}>
      <button
        type="button"
        className={styles.dotsBtn}
        onClick={() => setOpen((p) => !p)}
        aria-label="More actions"
      >
        <DotsIcon />
      </button>
      {open && (
        <div className={styles.menu}>
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onViewDetails();
              setOpen(false);
            }}
          >
            <EyeIcon />
            View details
          </button>
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onMarkScrutiny();
              setOpen(false);
            }}
          >
            <ScrutinyIcon />
            Mark under scrutiny
          </button>
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onDownloadPdf();
              setOpen(false);
            }}
          >
            <PdfIcon />
            Acknowledgement (PDF)
          </button>
        </div>
      )}
    </div>
  );
};

// ── Table ─────────────────────────────────────────────────────────────────────

interface ApplicationTableProps {
  applications: Application[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onMarkScrutiny?: (id: string) => void;
  onDownloadPdf?: (id: string) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onApprove,
  onReject,
  onViewDetails,
  onMarkScrutiny,
  onDownloadPdf,
}) => {
  const allSelected =
    applications.length > 0 && applications.every((a) => selectedIds.has(a.id));
  const someSelected =
    applications.some((a) => selectedIds.has(a.id)) && !allSelected;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkboxCell}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                aria-label="Select all"
              />
            </th>
            <th>Reference No.</th>
            <th>Applicant</th>
            <th>Exam</th>
            <th className={styles.percentCol}>%</th>
            <th>Location</th>
            <th>Applied</th>
            <th>Status</th>
            <th className={styles.actionsCol}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className={selectedIds.has(app.id) ? styles.selectedRow : ""}
            >
              {/* Checkbox */}
              <td className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedIds.has(app.id)}
                  onChange={(e) => onSelectRow(app.id, e.target.checked)}
                  aria-label={`Select ${app.applicant.name}`}
                />
              </td>

              {/* Reference No */}
              <td className={styles.refNo}>{app.referenceNo}</td>

              {/* Applicant */}
              <td>
                <div className={styles.applicantCell}>
                  <Avatar initials={app.applicant.initials} />
                  <div>
                    <div className={styles.primaryText}>
                      {app.applicant.name}
                    </div>
                    <div className={styles.secondaryText}>
                      {app.applicant.phone}
                    </div>
                  </div>
                </div>
              </td>

              {/* Exam */}
              <td>
                <div className={styles.primaryText}>{app.exam.type}</div>
                <div className={styles.secondaryText}>
                  {app.exam.board} · {app.exam.year}
                </div>
              </td>

              {/* Percentage */}
              <td className={styles.percentCell}>
                <span className={styles.percent}>
                  {app.percentage.toFixed(2)}%
                </span>
              </td>

              {/* Location */}
              <td>
                <div className={styles.primaryText}>
                  {app.location.district}
                </div>
                <div className={styles.secondaryText}>
                  {app.location.subLocation}
                </div>
              </td>

              {/* Applied Date */}
              <td className={styles.dateCell}>{app.appliedDate}</td>

              {/* Status */}
              <td>
                <StatusBadge status={app.status} />
              </td>

              {/* Actions */}
              <td className={styles.actionsCell}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.approveBtn}`}
                    onClick={() => onApprove?.(app.id)}
                    aria-label="Approve"
                    title="Approve"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.rejectBtn}`}
                    onClick={() => onReject?.(app.id)}
                    aria-label="Reject"
                    title="Reject"
                  >
                    <XIcon />
                  </button>
                  <ActionMenu
                    onViewDetails={() => onViewDetails?.(app.id)}
                    onMarkScrutiny={() => onMarkScrutiny?.(app.id)}
                    onDownloadPdf={() => onDownloadPdf?.(app.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
