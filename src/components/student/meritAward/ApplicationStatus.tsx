// edit option enable

import { useReopenApplicationMutation } from "@/redux/apis/applicationApi";
import {
  APPLICATION_STATUS,
  MeritAwardApplication,
} from "@/types/students/application";
import { downloadAcknowledgementReceipt } from "@/utils/students/receipt";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { App, Button, Descriptions, Result, Tag } from "antd";
import React from "react";

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

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  application,
}) => {
  const { message } = App.useApp();
  const [reopenApplication, { isLoading: isReopening }] =
    useReopenApplicationMutation();

  const statusInfo = STATUS_CONFIG[application.application_status] ?? {
    label: "Unknown",
    color: "default",
    icon: <FileTextOutlined />,
  };

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

  return (
    <Result
      status="success"
      title="Application Submitted Successfully"
      subTitle="Application submitted successfully. All your information has been saved."
      extra={
        <>
          <Descriptions
            column={1}
            bordered
            size="small"
            style={{ maxWidth: 480, margin: "24px auto 0", textAlign: "left" }}
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
            <Button
              icon={<EditOutlined />}
              onClick={handleEdit}
              loading={isReopening}
              disabled={isReopening}
            >
              Edit Application
            </Button>
          </div>
        </>
      }
    />
  );
};

export default ApplicationStatus;
