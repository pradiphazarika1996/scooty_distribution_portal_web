"use client";

import {
  useApproveApplicationMutation,
  useGetApplicationByIdQuery,
  useGetApplicationDocumentsQuery,
  useRejectApplicationMutation,
} from "@/redux/features/adminDashboard/applicationApi";
import type { ApplicationDocumentItem } from "@/types/dashboard/application";
import { APPLICATION_STATUS } from "@/utils/students/application";
import {
  ArrowLeftOutlined,
  BankOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  EyeOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  PaperClipOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  App,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  Row,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./application.module.scss";

const { Title, Text } = Typography;
const { TextArea } = Input;

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

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function maskSensitive(value: string | null, label = "XXXX"): string {
  if (!value) return "—";
  return `${label} ${value.slice(-4)}`;
}

const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
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

const ApplicationDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { message } = App.useApp();

  const {
    data: response,
    isFetching,
    isError,
  } = useGetApplicationByIdQuery(id, {
    skip: !id || isNaN(id),
  });
  const {
    data: documentsResponse,
    isFetching: documentsLoading,
    isError: documentsError,
  } = useGetApplicationDocumentsQuery(id, {
    skip: !id || isNaN(id),
  });
  const documents: ApplicationDocumentItem[] = documentsResponse?.data ?? [];
  console.log("Documents for application", id, documents);

  // const handlePreview = async (docId: string) => {
  //   // setPreviewLoadingId(docId);
  //   window.location.href = docId;
  // };
  const handlePreview = async (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [approveApplication, { isLoading: approving }] =
    useApproveApplicationMutation();
  const [rejectApplication, { isLoading: rejecting }] =
    useRejectApplicationMutation();
  const [remarks, setRemarks] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectError, setRejectError] = useState<string | null>(null);

  const app = response?.data;

  const handleApprove = async () => {
    try {
      await approveApplication({ id, remarks: undefined }).unwrap();
      message.success("Application approved successfully");
    } catch (err: any) {
      message.error(err?.data?.message ?? "Failed to approve application");
    }
  };

  const handleRejectClick = () => {
    setShowRejectForm(true);
  };

  const handleCancelReject = () => {
    setShowRejectForm(false);
    setRemarks("");
    setRejectError(null);
  };

  const handleRemarksChange = (value: string) => {
    setRemarks(value);
    if (rejectError) setRejectError(null);
  };
  const handleSubmitReject = async () => {
    const trimmed = remarks.trim();
    if (!trimmed) {
      setRejectError("Remarks are required to reject this application.");
      return;
    }

    try {
      await rejectApplication({ id, remarks: trimmed }).unwrap();
      message.success("Application rejected successfully");
      setShowRejectForm(false);
      setRemarks("");
      setRejectError(null);
    } catch (err: any) {
      message.error(err?.data?.message ?? "Failed to reject application");
    }
  };

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
  const isApproved = app.applicationStatus === APPLICATION_STATUS.APPROVED;
  const isRejected = app.applicationStatus === APPLICATION_STATUS.REJECTED;
  const DECIDABLE_STATUSES: number[] = [
    APPLICATION_STATUS.SUBMITTED,
    APPLICATION_STATUS.APPROVED,
    APPLICATION_STATUS.REJECTED,
  ];
  const canDecide = DECIDABLE_STATUSES.includes(app.applicationStatus);

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
            <Text type="secondary">
              {app.academicYear} · {app.examType}
            </Text>
          </div>
        </div>

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
              <Descriptions.Item label="Gender">
                {app.genderName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {app.dateOfBirth ?? "—"}
              </Descriptions.Item>
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
              <Descriptions.Item label="Board">
                {app.boardName ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Year of Passing">
                {app.yearOfPassing ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Roll No.">
                {app.rollNo ?? "—"}
              </Descriptions.Item>
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
        <Col xs={24}>
          <SectionCard icon={<PaperClipOutlined />} title="Documents">
            {documentsLoading && <Skeleton active paragraph={{ rows: 2 }} />}

            {!documentsLoading && documentsError && (
              <Alert
                type="warning"
                message="Failed to load documents"
                showIcon
              />
            )}

            {!documentsLoading && !documentsError && documents.length === 0 && (
              <Text type="secondary">
                No documents uploaded for this application.
              </Text>
            )}

            {!documentsLoading && !documentsError && documents.length > 0 && (
              <div className={styles.documentList}>
                {documents.map((doc) => (
                  <div key={doc.id} className={styles.documentItem}>
                    <div className={styles.documentInfo}>
                      <PaperClipOutlined className={styles.documentIcon} />
                      <div>
                        <div className={styles.documentName}>
                          {doc.fileName}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreview(doc.documentsUrl ?? "")}
                    >
                      Preview
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </Col>

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
        {canDecide && (
          <Col xs={24}>
            <SectionCard
              icon={<CheckCircleOutlined />}
              title={
                <>
                  Remarks <span className={styles.requiredAsterisk}>*</span>
                </>
              }
            >
              {!showRejectForm ? (
                <div className={styles.decisionActions}>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={handleApprove}
                    loading={approving}
                    disabled={isApproved || rejecting}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    icon={<CloseOutlined />}
                    onClick={handleRejectClick}
                    disabled={isRejected || approving}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <>
                  <TextArea
                    rows={3}
                    placeholder="Enter remarks for rejection (required)..."
                    value={remarks}
                    onChange={(e) => handleRemarksChange(e.target.value)}
                    disabled={rejecting}
                    status={rejectError ? "error" : undefined}
                    className={styles.decisionTextarea}
                  />
                  {rejectError && (
                    <div className={styles.decisionErrorText}>
                      {rejectError}
                    </div>
                  )}

                  <div className={styles.decisionActions}>
                    <Button
                      danger
                      icon={<CloseOutlined />}
                      onClick={handleSubmitReject}
                      loading={rejecting}
                    >
                      Submit
                    </Button>
                    <Button onClick={handleCancelReject} disabled={rejecting}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </SectionCard>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ApplicationDetailPage;
