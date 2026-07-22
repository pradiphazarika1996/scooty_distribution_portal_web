import {
  APPLICATION_STATUS,
  MeritAwardApplication,
} from "@/types/students/application";
import { downloadAcknowledgementReceipt } from "@/utils/students/receipt";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, Result, Tag } from "antd";
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
  const statusInfo = STATUS_CONFIG[application.application_status] ?? {
    label: "Unknown",
    color: "default",
    icon: <FileTextOutlined />,
  };
  const handleDownloadReceipt = () => {
    downloadAcknowledgementReceipt(application);
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
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadReceipt}
            style={{ marginTop: 24 }}
          >
            Download Acknowledgement Receipt
          </Button>
        </>
      }
    />
  );
};

export default ApplicationStatus;
