"use client";
import { useGetAllStudentsQuery } from "@/redux/apis/adminApi";
import { getDistrictName } from "@/utils/students/student";
import { DownloadOutlined } from "@ant-design/icons";
import { Alert, Button, Empty, Select, Table, Tag, Typography } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { useState } from "react";

const { Title, Text } = Typography;

type StatusFilter = "submitted" | "draft" | undefined;

const columns: ColumnsType<any> = [
  { title: "ID", dataIndex: "id", fixed: "left", width: 70 },
  { title: "Application No.", dataIndex: "application_number", width: 160 },
  {
    title: "Status",
    dataIndex: "application_status",
    width: 110,
    render: (value: number) => (
      <Tag color={value === 2 ? "processing" : "default"}>
        {value === 2 ? "Submitted" : "Draft"}
      </Tag>
    ),
  },
  { title: "Name", dataIndex: "name", width: 200 },
  { title: "Phone", dataIndex: "phone", width: 130 },
  { title: "Email", dataIndex: "email", width: 200 },
  { title: "Gender", dataIndex: "gender_name", width: 100 },
  { title: "Father's Name", dataIndex: "father_name", width: 180 },
  { title: "Mother's Name", dataIndex: "mother_name", width: 180 },
  {
    title: "Residence District",
    dataIndex: "district_id",
    width: 160,
    render: (value: number) => (value ? getDistrictName(value) : "—"),
  },
  { title: "Institution Name", dataIndex: "institution_name", width: 240 },
  {
    title: "Institution District",
    dataIndex: "institution_district",
    width: 160,
    render: (value: number) => (value ? getDistrictName(value) : "—"),
  },
  { title: "Roll", dataIndex: "roll", width: 100 },
  { title: "No.", dataIndex: "number", width: 100 },
  { title: "Registration No.", dataIndex: "registration_no", width: 160 },
  {
    title: "Registration Session",
    dataIndex: "registration_session",
    width: 150,
  },
  { title: "Total Marks", dataIndex: "total_marks_obtained", width: 110 },
  {
    title: "Percentage",
    dataIndex: "percentage_of_marks",
    width: 110,
    render: (value: number) => (value != null ? `${value}%` : "—"),
  },
  { title: "Remarks", dataIndex: "remarks", width: 200 },
  {
    title: "Enrolled in College?",
    dataIndex: "is_enrolled_in_college",
    width: 150,
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  {
    title: "Present Institution",
    dataIndex: "present_institution_name",
    width: 220,
  },
  {
    title: "Present Institution District",
    dataIndex: "present_institution_district",
    width: 180,
    render: (value: number) => (value ? getDistrictName(value) : "—"),
  },
  {
    title: "Admission via SAMARTH?",
    dataIndex: "admission_via_samarth",
    width: 170,
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  {
    title: "SAMARTH Reg. No.",
    dataIndex: "samarth_registration_no",
    width: 160,
  },
  {
    title: "Betterment/Reappearance?",
    dataIndex: "is_betterment_reappearance",
    width: 180,
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  { title: "Betterment Years", dataIndex: "betterment_years", width: 140 },
  { title: "Betterment Reason", dataIndex: "betterment_reason", width: 220 },
  {
    title: "Submitted At",
    dataIndex: "submitted_at",
    width: 170,
    render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
  },
  {
    title: "Edited?",
    dataIndex: "is_edited",
    width: 90,
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  { title: "Account Status", dataIndex: "account_status", width: 130 },
  {
    title: "Phone Verified?",
    dataIndex: "is_phone_verified",
    width: 130,
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  { title: "Role ID", dataIndex: "role_id", width: 90 },
  {
    title: "Created At",
    dataIndex: "created_at",
    width: 170,
    render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    width: 170,
    render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
  },
];

const formatCellForExport = (dataIndex: string, value: any): string => {
  if (value === null || value === undefined || value === "") return "";

  switch (dataIndex) {
    case "application_status":
      return value === 2 ? "Submitted" : "Draft";
    case "district_id":
    case "institution_district":
    case "present_institution_district":
      return getDistrictName(value);
    case "percentage_of_marks":
      return `${value}%`;
    case "is_enrolled_in_college":
    case "admission_via_samarth":
    case "is_betterment_reappearance":
    case "is_edited":
    case "is_phone_verified":
      return value ? "Yes" : "No";
    case "submitted_at":
    case "created_at":
    case "updated_at":
      return new Date(value).toLocaleString();
    default:
      return String(value);
  }
};

// CSV/formula injection guard. remarks, betterment_reason, and several
// institution/name fields are free-text entered directly by students —
// untrusted input. If a cell's content starts with =, +, -, or @, Excel
// (and some other spreadsheet apps) can interpret it as a FORMULA when
// the file is opened, not literal text — a known, exploitable
// vulnerability class (CSV injection / CWE-1236). Prefixing with a
// single quote forces spreadsheet apps to treat the cell as plain text.
const sanitizeForFormulaInjection = (value: string): string => {
  if (/^[=+\-@]/.test(value)) {
    return `'${value}`;
  }
  return value;
};

// NEW: the opposite operation, used ONLY for identifier columns that can
// legitimately start with a leading zero (roll, number, registration_no).
// Excel auto-detects "numeric-looking" CSV cells and silently strips
// leading zeros on open ("012345" becomes "12345"), regardless of the
// cell's CSV quoting. Wrapping the value in an Excel formula that
// evaluates to literal text (="012345") is the standard, reliable
// workaround — Excel displays the formula's result, not the formula
// itself.
//
// Deliberately kept separate from sanitizeForFormulaInjection above: that
// function NEUTRALIZES a leading "=" as a security guard against
// untrusted free-text fields. This function ADDS a leading "=" on
// purpose, for specific backend-sourced identifier fields. Never apply
// this to a free-text field (remarks, betterment_reason, names) — doing
// so would reopen the exact formula-injection risk the other guard
// exists to close.
const wrapAsExcelTextFormula = (value: string): string => `="${value}"`;

// Columns that need the leading-zero-preserving treatment above, rather
// than the normal formula-injection sanitization. All three are
// backend-sourced identifiers (never free text a student typed), so
// wrapping them as an Excel text formula carries none of the injection
// risk that free-text fields would.
const EXCEL_TEXT_COLUMNS = new Set(["roll", "number", "registration_no"]);

// CHANGED: added the optional skipInjectionGuard parameter so the
// "roll" column's deliberate formula-wrapped value isn't re-neutralized
// by sanitizeForFormulaInjection (which would otherwise see the leading
// "=" from wrapAsExcelTextFormula and defensively prefix a quote,
// undoing the leading-zero fix). Every other column still passes through
// the injection guard exactly as before — only the roll column's call
// site (in buildCsv, below) passes `true`.
const escapeCsvField = (value: string, skipInjectionGuard = false): string => {
  const safeValue = skipInjectionGuard
    ? value
    : sanitizeForFormulaInjection(value);
  return `"${safeValue.replace(/"/g, '""')}"`;
};

const buildCsv = (rows: any[]): string => {
  const header = columns
    .map((col) => escapeCsvField(String(col.title)))
    .join(",");

  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const dataIndex = (col as ColumnType<any>).dataIndex as string;
          const formatted = formatCellForExport(dataIndex, row[dataIndex]);

          // CHANGED: was a single hardcoded `dataIndex === "roll"` check.
          // Roll, Number, and Registration No. can all legitimately
          // start with a leading zero, so all three get the
          // Excel-text-formula wrapper instead of the normal
          // formula-injection sanitization.
          if (EXCEL_TEXT_COLUMNS.has(dataIndex) && formatted) {
            return escapeCsvField(wrapAsExcelTextFormula(formatted), true);
          }

          return escapeCsvField(formatted);
        })
        .join(","),
    )
    .join("\n");

  return `${header}\n${body}`;
};

const STATUS_FILTER_OPTIONS = [
  { label: "All Records", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Draft", value: "draft" },
];

const AdminStudentsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const queryArg: StatusFilter =
    statusFilter === "all" ? undefined : (statusFilter as StatusFilter);

  const { data, isLoading, isFetching, isError, error } =
    useGetAllStudentsQuery(queryArg);

  const handleDownloadAll = () => {
    if (isFetching || !data?.students?.length) return;

    const csv = buildCsv(data.students);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const filterLabel = statusFilter === "all" ? "all" : statusFilter;
    link.download = `student-records-${filterLabel}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        message="Failed to load student records"
        description={
          (error as any)?.data?.message ??
          "Please refresh the page or try again later."
        }
        style={{ margin: 24 }}
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            All Student Records
          </Title>
          <Text type="secondary">
            {data
              ? `${data.count} record${data.count === 1 ? "" : "s"} total`
              : ""}
          </Text>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_FILTER_OPTIONS}
            style={{ width: 160 }}
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadAll}
            disabled={!data?.students?.length || isFetching}
            loading={isFetching}
          >
            Download {statusFilter === "all" ? "All" : "Filtered"} Records
          </Button>
        </div>
      </div>

      <Table
        style={{ marginTop: 16 }}
        rowKey="id"
        columns={columns}
        dataSource={data?.students ?? []}
        loading={isLoading || isFetching}
        locale={{
          emptyText: (
            <Empty
              description={
                statusFilter === "all"
                  ? "No student records found."
                  : `No ${statusFilter} applications found.`
              }
            />
          ),
        }}
        pagination={{ pageSize: 50, showSizeChanger: true }}
        scroll={{ x: "max-content", y: 600 }}
        size="small"
        bordered
      />
    </div>
  );
};

export default AdminStudentsPage;
