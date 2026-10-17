"use client";

import styles from "@/styles/ProvisionalListSection.module.scss";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Card, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

interface Activity {
  key: number;
  serialNo: number;
  activity: string;
  dateTime: string;
}

const activities: Activity[] = [
  {
    key: 1,
    serialNo: 1,
    activity: "Publication of Provisional List of Eligible Applicants",
    dateTime: "17-10-2026",
  },
  {
    key: 2,
    serialNo: 2,
    activity: "Submission of Claims/Objections",
    dateTime: "Up to 30-10-2026",
  },
  {
    key: 3,
    serialNo: 3,
    activity: "Publication of Final List of Beneficiaries",
    dateTime: "To be notified later",
  },
];

const columns: ColumnsType<Activity> = [
  {
    title: "SL. No",
    dataIndex: "serialNo",
    key: "serialNo",
    width: "14%",
    align: "center",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    width: "51%",
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
    width: "35%",
  },
];

export default function ProvisionalListSection() {
  return (
    <section className={styles.provisionalSection}>
      <div className={styles.container}>
        <Card className={styles.contentCard} bordered={false}>
          <div className={styles.note}>
            <div className={styles.noteContent}>
              <Text className={styles.noteLabel}>Note:-</Text>{" "}
              <Text className={styles.noteText}>
                The Provisional List of Eligible Applicants has been published
                on the portal. Applicants may click the button below to view the
                list.
              </Text>
            </div>

            <Button
              type="primary"
              href="/images/provisional-list.pdf"
              target="_blank"
              rel="noopener noreferrer"
              icon={<FilePdfOutlined />}
              className={styles.viewListButton}
            >
              View Provisional List
            </Button>
          </div>

          <div className={styles.tableWrapper}>
            <Table<Activity>
              className={styles.activitiesTable}
              columns={columns}
              dataSource={activities}
              pagination={false}
              bordered
              tableLayout="fixed"
              rowKey="key"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
