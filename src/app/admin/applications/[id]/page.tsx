"use client";

import { useGetApplicationByIdQuery } from "@/redux/features/adminDashboard/applicationApi";
import { APPLICATION_STATUS } from "@/utils/students/application";
import {
  ArrowLeftOutlined,
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import styles from "./application.module.scss";

const { Title, Text } = Typography;

// ── Status UI config ───────────────────────────────────────
// Maps numeric status → Ant Design color + icon.
// applicationStatusLabel (the visible text) comes from the API.

const STATUS_CONFIG: Record<number, { color: string; icon: React.ReactNode }> =
  {
    [APPLICATION_STATUS.DRAFT]: {
      color: "default",
      icon: <ClockCircleOutlined />,
    },
    [APPLICATION_STATUS.SUBMITTED]: {
      color: "processing",
      icon: <ClockCircleOutlined />,
    },
    [APPLICATION_STATUS.PAYMENT_COMPLETED]: {
      color: "processing",
      icon: <ClockCircleOutlined />,
    },
    [APPLICATION_STATUS.UNDER_REVIEW]: {
      color: "warning",
      icon: <ClockCircleOutlined />,
    },
    [APPLICATION_STATUS.QUERY_RAISED]: {
      color: "warning",
      icon: <ClockCircleOutlined />,
    },
    [APPLICATION_STATUS.APPROVED]: {
      color: "success",
      icon: <CheckCircleOutlined />,
    },
    [APPLICATION_STATUS.REJECTED]: {
      color: "error",
      icon: <CloseCircleOutlined />,
    },
  };

// ── Helpers ────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Mask sensitive fields — only last 4 digits visible
function maskSensitive(value: string | null, label = "XXXX"): string {
  if (!value) return "—";
  return `${label} ${value.slice(-4)}`;
}

// ── Section card ───────────────────────────────────────────

const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <Card
    className={styles.sectionCard}
    title={
      <div className={styles.cardTitle}>
        <span className={styles.cardIcon}>{icon}</span>
        <span>{title}</span>
      </div>
    }
  >
    {children}
  </Card>
);

// ── Page ───────────────────────────────────────────────────

const ApplicationDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const {
    data: response,
    isFetching,
    isError,
  } = useGetApplicationByIdQuery(id, {
    skip: !id || isNaN(id),
  });

  const app = response?.data;

  if (isFetching) {
    return (
      <div className={styles.page}>
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 24 }} />
      </div>
    );
  }

  if (isError || !app) {
    return (
      <div className={styles.page}>
        <Alert
          type="error"
          message="Application Not Found"
          description="This application does not exist or could not be loaded."
          action={
            <Button onClick={() => router.back()} icon={<ArrowLeftOutlined />}>
              Go Back
            </Button>
          }
        />
      </div>
    );
  }

  const statusCfg =
    STATUS_CONFIG[app.applicationStatus] ??
    STATUS_CONFIG[APPLICATION_STATUS.DRAFT];

  const LABEL_STYLE = { color: "var(--color-text-secondary)" };

  return (
    <div className={styles.page}>
      {/* ── Breadcrumb ── */}
      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          { title: <HomeOutlined />, href: "/admin" },
          { title: "Applications", href: "/admin/applications" },
          { title: app.referenceNo },
        ]}
      />

      {/* ── Page header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className={styles.backBtn}
          />
          <div>
            <Title level={4} className={styles.pageTitle}>
              {app.referenceNo}
            </Title>
            {/* examType and academicYear are fully API-driven */}
            <Text type="secondary">
              {app.academicYear} · {app.examType}
            </Text>
          </div>
        </div>

        {/* applicationStatusLabel is fully API-driven */}
        <Tag
          color={statusCfg.color}
          icon={statusCfg.icon}
          className={styles.statusTag}
        >
          {app.applicationStatusLabel}
        </Tag>
      </div>

      <Row gutter={[24, 24]}>
        {/* ── Application overview ── */}
        <Col xs={24} lg={12}>
          <SectionCard icon={<FileTextOutlined />} title="Application Overview">
            <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
              <Descriptions.Item label="Reference No.">
                {app.referenceNo}
              </Descriptions.Item>
              <Descriptions.Item label="Exam">{app.examType}</Descriptions.Item>
              <Descriptions.Item label="Academic Year">
                {app.academicYear}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {app.applicationStatusLabel}
              </Descriptions.Item>
              <Descriptions.Item label="Submitted">
                {formatDate(app.submittedAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {formatDate(app.statusUpdatedAt)}
              </Descriptions.Item>
              {app.approvalOrderNumber && (
                <Descriptions.Item label="Approval Order No.">
                  {app.approvalOrderNumber}
                </Descriptions.Item>
              )}
            </Descriptions>
          </SectionCard>
        </Col>

        {/* ── Personal details ── */}
        <Col xs={24} lg={12}>
          <SectionCard icon={<UserOutlined />} title="Personal Details">
            <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
              <Descriptions.Item label="Full Name">
                {app.studentName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {app.phone ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {app.email ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Guardian">
                {app.guardianName ?? "—"}
              </Descriptions.Item>
              {/* genderName resolved server-side */}
              <Descriptions.Item label="Gender">
                {app.genderName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {app.dateOfBirth ?? "—"}
              </Descriptions.Item>
              {/* casteName resolved server-side (includes otherCasteName) */}
              <Descriptions.Item label="Caste">
                {app.casteName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Aadhaar">
                {maskSensitive(app.aadhaarNumber, "XXXX XXXX")}
              </Descriptions.Item>
            </Descriptions>
          </SectionCard>
        </Col>

        {/* ── Academic details ── */}
        <Col xs={24} lg={12}>
          <SectionCard icon={<IdcardOutlined />} title="Academic Details">
            <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
              {/* boardName resolved server-side */}
              <Descriptions.Item label="Board">
                {app.boardName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Year of Passing">
                {app.yearOfPassing ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Roll No.">
                {app.rollNo ?? "—"}
              </Descriptions.Item>
              {/* marksDisplay formatted server-side */}
              <Descriptions.Item label="Marks">
                {app.marksDisplay ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Institution">
                {app.institutionName ?? "—"}
              </Descriptions.Item>
              {app.institutionAddress && (
                <Descriptions.Item label="Institution Address">
                  {app.institutionAddress}
                </Descriptions.Item>
              )}
            </Descriptions>
          </SectionCard>
        </Col>

        {/* ── Address ── */}
        <Col xs={24} lg={12}>
          <SectionCard icon={<HomeOutlined />} title="Address Details">
            <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
              <Descriptions.Item label="Applicant Type">
                <Tag color={app.isResidentOfMacArea ? "blue" : "orange"}>
                  {app.isResidentOfMacArea
                    ? "Within MAC Area"
                    : "Outside MAC Area"}
                </Tag>
              </Descriptions.Item>

              {app.isResidentOfMacArea ? (
                <>
                  {/* districtName resolved server-side via DB lookup */}
                  <Descriptions.Item label="District">
                    {app.districtName ?? "—"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Panchayat / Municipal Area">
                    {app.panchayatName ?? app.municipalArea ?? "—"}
                  </Descriptions.Item>
                  {app.otherVillageName && (
                    <Descriptions.Item label="Village">
                      {app.otherVillageName}
                    </Descriptions.Item>
                  )}
                </>
              ) : (
                <>
                  {/* stateName resolved server-side */}
                  <Descriptions.Item label="State">
                    {app.stateName ?? "—"}
                  </Descriptions.Item>
                  <Descriptions.Item label="City">
                    {app.city ?? "—"}
                  </Descriptions.Item>
                  {app.permanentAddress && (
                    <Descriptions.Item label="Permanent Address">
                      {app.permanentAddress}
                    </Descriptions.Item>
                  )}
                  {app.presentAddress && (
                    <Descriptions.Item label="Present Address">
                      {app.presentAddress}
                    </Descriptions.Item>
                  )}
                </>
              )}

              <Descriptions.Item label="PIN Code">
                {app.pinCode ?? "—"}
              </Descriptions.Item>
            </Descriptions>
          </SectionCard>
        </Col>

        {/* ── Bank details ── */}
        <Col xs={24} lg={12}>
          <SectionCard icon={<BankOutlined />} title="Bank Details">
            <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
              <Descriptions.Item label="Bank Name">
                {app.bankName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Branch">
                {app.branchName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Account No.">
                {app.accountNo ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="IFSC Code">
                {app.ifscCode ?? "—"}
              </Descriptions.Item>
            </Descriptions>
          </SectionCard>
        </Col>

        {/* ── Review & remarks — rendered only when data exists ── */}
        {(app.reviewRemarks || app.approvalRemarks || app.rejectionReason) && (
          <Col xs={24}>
            <SectionCard icon={<FileTextOutlined />} title="Review & Remarks">
              <Descriptions column={1} size="small" labelStyle={LABEL_STYLE}>
                {app.reviewRemarks && (
                  <Descriptions.Item label="Review Remarks">
                    {app.reviewRemarks}
                  </Descriptions.Item>
                )}
                {app.approvalRemarks && (
                  <Descriptions.Item label="Approval Remarks">
                    {app.approvalRemarks}
                  </Descriptions.Item>
                )}
                {app.approvedAt && (
                  <Descriptions.Item label="Approved On">
                    {formatDate(app.approvedAt)}
                  </Descriptions.Item>
                )}
                {app.rejectionReason && (
                  <Descriptions.Item label="Rejection Reason">
                    <Text type="danger">{app.rejectionReason}</Text>
                  </Descriptions.Item>
                )}
                {app.rejectedAt && (
                  <Descriptions.Item label="Rejected On">
                    {formatDate(app.rejectedAt)}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </SectionCard>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ApplicationDetailPage;
