import { useReopenApplicationMutation } from "@/redux/apis/applicationApi";
import {
  APPLICATION_STATUS,
  MeritAwardApplication,
} from "@/types/students/application";
import { isPortalClosed } from "@/utils/students/portalDeadline";
import { downloadAcknowledgementReceipt } from "@/utils/students/receipt";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Alert, App, Button, Descriptions, Result, Tag } from "antd";
import React, { useEffect, useRef } from "react";

interface ApplicationStatusProps {
  application: MeritAwardApplication;
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
};
const REOPEN_REMINDER_TEXT =
  "When you click 'Edit Application' you must submit the application again. Otherwise, the application will not be considered submitted.";
const REMINDER_INTERVAL_MS = 5 * 60 * 1000;

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  application,
}) => {
  const { message, modal } = App.useApp();
  const [reopenApplication, { isLoading: isReopening }] =
    useReopenApplicationMutation();

  const closed = isPortalClosed();

  const statusInfo = STATUS_CONFIG[application.application_status] ?? {
    label: "Unknown",
    color: "default",
    icon: <FileTextOutlined />,
  };
  const modalOpenRef = useRef(false);

  useEffect(() => {
    if (closed) return;
    const showReminder = () => {
      if (modalOpenRef.current) return;
      modalOpenRef.current = true;
      modal.warning({
        title: "Important: Re-submission Required After Editing",
        icon: <ExclamationCircleOutlined style={{ color: "#cf1322" }} />,
        content: (
          <span style={{ color: "#cf1322", fontWeight: 700 }}>
            {REOPEN_REMINDER_TEXT}
          </span>
        ),
        okText: "I Understand",
        onOk: () => {
          modalOpenRef.current = false;
        },
        afterClose: () => {
          modalOpenRef.current = false;
        },
      });
    };
    const intervalId = setInterval(showReminder, REMINDER_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [closed, modal]);

  const handleDownloadReceipt = () => {
    downloadAcknowledgementReceipt(application);
  };

  const handleEdit = async () => {
    try {
      await reopenApplication().unwrap();
      message.success("You can now edit your application.");
    } catch (error: any) {
      message.error(
        error?.data?.message ?? "Failed to reopen application for editing.",
      );
    }
  };
const isResubmission = Boolean(application.is_edited); 
  return (
    <Result
      status="success"
      title={
        isResubmission
          ? "Application Edited Successfully"
          : "Application Submitted Successfully"
      }
      subTitle={
        isResubmission
          ? "Application edited successfully. All your information has been saved."
          : "Application submitted successfully. All your information has been saved."
      }
      extra={
        <>
          {!closed && (
            <Alert
              type="error"
              banner
              showIcon
              icon={<ExclamationCircleOutlined style={{ color: "#cf1322" }} />}
              message={
                <span style={{ fontWeight: 700, color: "#cf1322" }}>
                  Important Notice
                </span>
              }
              description={
                <span style={{ fontWeight: 700, color: "#cf1322" }}>
                  {REOPEN_REMINDER_TEXT}
                </span>
              }
              style={{
                maxWidth: 480,
                margin: "0 auto 20px",
                textAlign: "left",
                border: "1px solid #ffa39e",
              }}
            />
          )}
          <Descriptions
            column={1}
            bordered
            size="small"
            style={{ maxWidth: 480, margin: "0 auto", textAlign: "left" }}
          >
            <Descriptions.Item label="Application Number">
              {application.application_number || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag icon={statusInfo.icon} color={statusInfo.color}>
                {statusInfo.label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Submitted On">
              {application.submitted_at
                ? new Date(application.submitted_at).toLocaleDateString()
                : "—"}
            </Descriptions.Item>
          </Descriptions>

          {closed && (
            <Alert
              type="warning"
              showIcon
              message="The portal is now closed."
              description="The submission window for this scheme has ended. You can still view your application details and download your acknowledgement receipt below."
              style={{
                maxWidth: 480,
                margin: "16px auto 0",
                textAlign: "left",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadReceipt}
            >
              Download Acknowledgement Receipt
            </Button>

            {!closed && (
              <Button
                icon={<EditOutlined />}
                onClick={handleEdit}
                loading={isReopening}
                disabled={isReopening}
              >
                Edit Application
              </Button>
            )}
          </div>
        </>
      }
    />
  );
};

export default ApplicationStatus;
