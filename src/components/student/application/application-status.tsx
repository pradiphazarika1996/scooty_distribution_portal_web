import styles from "@/styles/ApplicationPage.module.css";
import { formatDate } from "@/utils/helpers";
import { APPLICATION_STATUS } from "@/utils/students/application";
import { downloadApplicationPdf } from "@/utils/students/downloadPdf";
import { getExamTypeName } from "@/utils/students/student";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { message, Tag } from "antd";
import React, { useState } from "react";

interface ApplicationStatusProps {
  application: any;
  canApplyNew: boolean;
  allowedExams: number[];
  eligibleAfter?: string;
  onApplyNew: (examId: number) => void;
}

const STATUS_CONFIG: Record<
  number,
  { label: string; color: string; icon: React.ReactNode }
> = {
  [APPLICATION_STATUS.SUBMITTED]: {
    label: "Submitted",
    color: "processing",
    icon: <ClockCircleOutlined />,
  },
  [APPLICATION_STATUS.PAYMENT_COMPLETED]: {
    label: "Payment Pending",
    color: "warning",
    icon: <ClockCircleOutlined />,
  },
  [APPLICATION_STATUS.UNDER_REVIEW]: {
    label: "Under Review",
    color: "processing",
    icon: <ClockCircleOutlined />,
  },
  [APPLICATION_STATUS.QUERY_RAISED]: {
    label: "Query Raised",
    color: "warning",
    icon: <ClockCircleOutlined />,
  },
  [APPLICATION_STATUS.APPROVED]: {
    label: "Approved",
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  [APPLICATION_STATUS.REJECTED]: {
    label: "Rejected",
    color: "error",
    icon: <CloseCircleOutlined />,
  },
};

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  application,
  canApplyNew,
  allowedExams,
  eligibleAfter,
  onApplyNew,
}) => {
  const [downloading, setDownloading] = useState(false);

  const statusInfo = STATUS_CONFIG[application.application_status] || {
    label: "Unknown",
    color: "default",
    icon: <FileTextOutlined />,
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadApplicationPdf(application.id);
    } catch {
      message.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className={styles.statusCard}>
        <div className={styles.statusHeader}>
          <h3 className={styles.statusTitle}>Application Status</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {application.application_status ===
              APPLICATION_STATUS.SUBMITTED && (
              <button
                className={styles.downloadBtn}
                onClick={handleDownload}
                disabled={downloading}
              >
                <DownloadOutlined />
                {downloading ? "Downloading..." : "Download Application"}
              </button>
            )}
            <Tag icon={statusInfo.icon} color={statusInfo.color}>
              {statusInfo.label}
            </Tag>
          </div>
        </div>

        <table className={styles.statusTable}>
          <thead>
            <tr>
              <th>Application No.</th>
              <th>Exam Type</th>
              <th>Submitted On</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Application No.">
                {application.application_number || "—"}
              </td>
              <td data-label="Exam Type">
                {getExamTypeName(application.exam_id) || "—"}
              </td>
              <td data-label="Submitted On">
                {application.submitted_at
                  ? formatDate(application.submitted_at)
                  : "—"}
              </td>
              <td data-label="Last Updated">
                {application.status_updated_at
                  ? formatDate(application.status_updated_at)
                  : "—"}
              </td>
            </tr>
          </tbody>
        </table>

        {application.application_status === APPLICATION_STATUS.APPROVED &&
          application.approval_remarks && (
            <div className={styles.remarksBlock}>
              <p className={styles.remarksLabelSuccess}>Approval Remarks</p>
              <p className={styles.remarksText}>
                {application.approval_remarks}
              </p>
            </div>
          )}

        {application.application_status === APPLICATION_STATUS.REJECTED &&
          application.rejection_reason && (
            <div className={styles.remarksBlock}>
              <p className={styles.remarksLabelError}>Rejection Reason</p>
              <p className={styles.remarksText}>
                {application.rejection_reason}
              </p>
            </div>
          )}
      </div>

      {canApplyNew && allowedExams.length > 0 && (
        <div className={styles.newApplicationCard}>
          <p className={styles.noticeText}>
            You are eligible to apply for{" "}
            <strong>
              {allowedExams.map((id) => getExamTypeName(id)).join(", ")}
            </strong>{" "}
            scholarship.
          </p>
          {allowedExams.map((examId) => (
            <button
              key={examId}
              className={styles.newApplicationBtn}
              onClick={() => onApplyNew(examId)}
            >
              Apply for {getExamTypeName(examId)} Scholarship
              <ArrowRightOutlined />
            </button>
          ))}
        </div>
      )}

      {!canApplyNew && eligibleAfter && (
        <div className={styles.noticeCardAccent}>
          <p className={styles.noticeText}>
            You can apply for the next scholarship after{" "}
            <span className={styles.noticeDate}>
              {formatDate(eligibleAfter)}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
