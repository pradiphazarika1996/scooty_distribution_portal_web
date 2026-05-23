"use client";

import { useGetContactsQuery } from "@/redux/landing/contactApi";
import { IContact } from "@/types/landing/landing";
import { Card, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const columns: ColumnsType<IContact> = [
  {
    title: "#",
    dataIndex: "id",
    width: 60,
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "full_name",
    width: 160,
    render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 140,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 200,
    render: (email) =>
      email ? (
        <a href={`mailto:${email}`} style={{ color: "#6941C6" }}>
          {email}
        </a>
      ) : (
        <Tag>N/A</Tag>
      ),
  },
  {
    title: "Message",
    dataIndex: "message",
    render: (msg) => (
      <span
        style={{
          display: "block",
          whiteSpace: "pre-wrap", // ✅ wraps long text
          wordBreak: "break-word", // ✅ breaks long words
          lineHeight: "1.6",
          maxWidth: 480,
        }}
      >
        {msg}
      </span>
    ),
  },
  {
    title: "Submitted At",
    dataIndex: "created_at",
    width: 170,
    align: "right",
    render: (val) => (
      <span style={{ color: "#6B7280", fontSize: 13 }}>
        {new Date(val).toLocaleString("en-IN")}
      </span>
    ),
  },
];

export default function ContactsPage() {
  const { data, isLoading, isError } = useGetContactsQuery();

  return (
    <div style={{ padding: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Contact Queries
      </Title>

      <Card
        style={{ borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={{ pageSize: 10, size: "small" }}
          locale={{
            emptyText: isError ? "Failed to load queries." : "No queries yet.",
          }}
          scroll={{ x: 800 }} // ✅ horizontal scroll on small screens
          style={{ borderRadius: 12 }}
          rowClassName={() => "contact-table-row"}
          onRow={() => ({
            style: { verticalAlign: "top" }, // ✅ top-align rows with multi-line content
          })}
        />
      </Card>

      <style>{`
        .contact-table-row:hover > td {
          background-color: #f5f3ff !important;
        }
        .ant-table-thead > tr > th {
          background-color: #fafafa !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          color: #374151 !important;
        }
        .ant-table-tbody > tr > td {
          padding: 14px 16px !important;
          font-size: 14px !important;
          color: #1F2937 !important;
          border-bottom: 1px solid #F3F4F6 !important;
        }
      `}</style>
    </div>
  );
}
