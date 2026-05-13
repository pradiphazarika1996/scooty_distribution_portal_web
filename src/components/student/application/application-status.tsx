import styles from "@/styles/ScholarshipForm.module.css";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, Tag } from "antd";
import React from "react";

interface ApplicationStatusProps {
  application: any;
  onApplyNew?: () => void;
  canApplyNew: boolean;
  allowedExams: number[];
}

const STATUS_CONFIG: Record<
  number,
  { label: string; color: string; icon: React.ReactNode }
> = {
  1: {
    label: "Submitted",
    color: "processing",
    icon: <ClockCircleOutlined />,
  },
  3: {
    label: "Payment Pending",
    color: "warning",
    icon: <ClockCircleOutlined />,
  },
  4: {
    label: "Under Review",
    color: "processing",
    icon: <ClockCircleOutlined />,
  },
  5: {
    label: "Approved",
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  6: {
    label: "Rejected",
    color: "error",
    icon: <CloseCircleOutlined />,
  },
};

const EXAM_LABELS: Record<number, string> = {
  1: "HSLC",
  2: "HS",
};

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  application,
  onApplyNew,
  canApplyNew,
  allowedExams,
}) => {
  const statusInfo = STATUS_CONFIG[application.application_status] || {
    label: "Unknown",
    color: "default",
    icon: <FileTextOutlined />,
  };

  return (
    <div>
      <div
        className={styles.sectionCard}
        style={{ borderLeft: "3px solid var(--primary)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-md)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--font-size-lg)",
              fontWeight: 700,
              color: "var(--on-surface)",
              margin: 0,
            }}
          >
            Application Status
          </h3>
          <Tag icon={statusInfo.icon} color={statusInfo.color}>
            {statusInfo.label}
          </Tag>
        </div>

        <Descriptions column={{ xs: 1, sm: 2 }} size="small" bordered>
          <Descriptions.Item label="Application No.">
            {application.application_number}
          </Descriptions.Item>
          <Descriptions.Item label="Exam Type">
            {EXAM_LABELS[application.exam_id] || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Submitted On">
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {application.status_updated_at
              ? new Date(application.status_updated_at).toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "short", year: "numeric" },
                )
              : "—"}
          </Descriptions.Item>
        </Descriptions>

        {application.application_status === 5 &&
          application.approval_remarks && (
            <div style={{ marginTop: "var(--space-md)" }}>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  color: "var(--on-surface-variant)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                Approval Remarks
              </p>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--on-surface)",
                }}
              >
                {application.approval_remarks}
              </p>
            </div>
          )}

        {application.application_status === 6 &&
          application.rejection_reason && (
            <div style={{ marginTop: "var(--space-md)" }}>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  color: "var(--error)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                Rejection Reason
              </p>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--on-surface)",
                }}
              >
                {application.rejection_reason}
              </p>
            </div>
          )}
      </div>

      {canApplyNew && allowedExams.length > 0 && (
        <div
          className={styles.sectionCard}
          style={{ marginTop: "var(--space-lg)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--font-size-sm)",
              color: "var(--on-surface-variant)",
              marginBottom: "var(--space-md)",
            }}
          >
            You are eligible to apply for{" "}
            <strong>
              {allowedExams.map((id) => EXAM_LABELS[id]).join(", ")}
            </strong>{" "}
            scholarship.
          </p>
          <Button
            type="primary"
            onClick={onApplyNew}
            style={{ height: 48, padding: "0 32px", fontWeight: 700 }}
          >
            Apply for {allowedExams.map((id) => EXAM_LABELS[id]).join(" / ")}{" "}
            Scholarship
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
