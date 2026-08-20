// "use client";
// import { useGetAllStudentsQuery } from "@/redux/apis/adminApi";
// import { getDistrictName } from "@/utils/students/student";
// import { DownloadOutlined } from "@ant-design/icons";
// import { Alert, Button, Table, Tag, Typography } from "antd";
// import type { ColumnsType, ColumnType } from "antd/es/table";

// const { Title, Text } = Typography;

// const columns: ColumnsType<any> = [
//   { title: "ID", dataIndex: "id", fixed: "left", width: 70 },
//   { title: "Application No.", dataIndex: "application_number", width: 160 },
//   {
//     title: "Status",
//     dataIndex: "application_status",
//     width: 110,
//     render: (value: number) => (
//       <Tag color={value === 2 ? "processing" : "default"}>
//         {value === 2 ? "Submitted" : "Draft"}
//       </Tag>
//     ),
//   },
//   { title: "Name", dataIndex: "name", width: 200 },
//   { title: "Phone", dataIndex: "phone", width: 130 },
//   { title: "Email", dataIndex: "email", width: 200 },
//   { title: "Gender", dataIndex: "gender_name", width: 100 },
//   { title: "Father's Name", dataIndex: "father_name", width: 180 },
//   { title: "Mother's Name", dataIndex: "mother_name", width: 180 },
//   {
//     title: "Residence District",
//     dataIndex: "district_id",
//     width: 160,
//     render: (value: number) => (value ? getDistrictName(value) : "—"),
//   },
//   { title: "Institution Name", dataIndex: "institution_name", width: 240 },
//   {
//     title: "Institution District",
//     dataIndex: "institution_district",
//     width: 160,
//     render: (value: number) => (value ? getDistrictName(value) : "—"),
//   },
//   { title: "Roll", dataIndex: "roll", width: 100 },
//   { title: "No.", dataIndex: "number", width: 100 },
//   { title: "Registration No.", dataIndex: "registration_no", width: 160 },
//   {
//     title: "Registration Session",
//     dataIndex: "registration_session",
//     width: 150,
//   },
//   { title: "Total Marks", dataIndex: "total_marks_obtained", width: 110 },
//   {
//     title: "Percentage",
//     dataIndex: "percentage_of_marks",
//     width: 110,
//     render: (value: number) => (value != null ? `${value}%` : "—"),
//   },
//   { title: "Remarks", dataIndex: "remarks", width: 200 },
//   {
//     title: "Enrolled in College?",
//     dataIndex: "is_enrolled_in_college",
//     width: 150,
//     render: (value: boolean) => (value ? "Yes" : "No"),
//   },
//   {
//     title: "Present Institution",
//     dataIndex: "present_institution_name",
//     width: 220,
//   },
//   {
//     title: "Present Institution District",
//     dataIndex: "present_institution_district",
//     width: 180,
//     render: (value: number) => (value ? getDistrictName(value) : "—"),
//   },
//   {
//     title: "Admission via SAMARTH?",
//     dataIndex: "admission_via_samarth",
//     width: 170,
//     render: (value: boolean) => (value ? "Yes" : "No"),
//   },
//   {
//     title: "SAMARTH Reg. No.",
//     dataIndex: "samarth_registration_no",
//     width: 160,
//   },
//   {
//     title: "Betterment/Reappearance?",
//     dataIndex: "is_betterment_reappearance",
//     width: 180,
//     render: (value: boolean) => (value ? "Yes" : "No"),
//   },
//   { title: "Betterment Years", dataIndex: "betterment_years", width: 140 },
//   { title: "Betterment Reason", dataIndex: "betterment_reason", width: 220 },
//   {
//     title: "Submitted At",
//     dataIndex: "submitted_at",
//     width: 170,
//     render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
//   },
//   {
//     title: "Edited?",
//     dataIndex: "is_edited",
//     width: 90,
//     render: (value: boolean) => (value ? "Yes" : "No"),
//   },
//   { title: "Account Status", dataIndex: "account_status", width: 130 },
//   {
//     title: "Phone Verified?",
//     dataIndex: "is_phone_verified",
//     width: 130,
//     render: (value: boolean) => (value ? "Yes" : "No"),
//   },
//   { title: "Role ID", dataIndex: "role_id", width: 90 },
//   {
//     title: "Created At",
//     dataIndex: "created_at",
//     width: 170,
//     render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
//   },
//   {
//     title: "Updated At",
//     dataIndex: "updated_at",
//     width: 170,
//     render: (value: string) => (value ? new Date(value).toLocaleString() : "—"),
//   },
// ];

// // NEW: plain-text equivalent of each column's `render` logic above.
// // `render` returns React nodes, which aren't usable as CSV cell text —
// // this mirrors the same formatting decisions (Yes/No, district names,
// // date strings) so the exported file reads the same way the on-screen
// // table does, not as raw DB codes.
// const formatCellForExport = (dataIndex: string, value: any): string => {
//   if (value === null || value === undefined || value === "") return "";

//   switch (dataIndex) {
//     case "application_status":
//       return value === 2 ? "Submitted" : "Draft";
//     case "district_id":
//     case "institution_district":
//     case "present_institution_district":
//       return getDistrictName(value);
//     case "percentage_of_marks":
//       return `${value}%`;
//     case "is_enrolled_in_college":
//     case "admission_via_samarth":
//     case "is_betterment_reappearance":
//     case "is_edited":
//     case "is_phone_verified":
//       return value ? "Yes" : "No";
//     case "submitted_at":
//     case "created_at":
//     case "updated_at":
//       return new Date(value).toLocaleString();
//     default:
//       return String(value);
//   }
// };

// // NEW: standard CSV field escaping — wraps every value in double quotes
// // and doubles any internal double quotes, per RFC 4180. Necessary
// // because several free-text fields here (remarks, betterment_reason,
// // institution names) can legitimately contain commas, quotes, or
// // newlines, any of which would silently corrupt an unescaped CSV.
// const escapeCsvField = (value: string): string =>
//   `"${value.replace(/"/g, '""')}"`;

// const buildCsv = (rows: any[]): string => {
//   const header = columns
//     .map((col) => escapeCsvField(String(col.title)))
//     .join(",");

//   const body = rows
//     .map((row) =>
//       columns
//         .map((col) => {
//           // const dataIndex = col.dataIndex as string;
//           const dataIndex = (col as ColumnType<any>).dataIndex as string;
//           const formatted = formatCellForExport(dataIndex, row[dataIndex]);
//           return escapeCsvField(formatted);
//         })
//         .join(","),
//     )
//     .join("\n");

//   return `${header}\n${body}`;
// };

// const AdminStudentsPage = () => {
//   const { data, isLoading, isError, error } = useGetAllStudentsQuery();

//   const handleDownloadAll = () => {
//     if (!data?.students?.length) return;

//     const csv = buildCsv(data.students);
//     // Leading BOM so Excel (which otherwise guesses encoding and can
//     // mangle non-ASCII characters) reliably opens this as UTF-8.
//     const blob = new Blob(["\uFEFF" + csv], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `student-records-${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   if (isError) {
//     return (
//       <Alert
//         type="error"
//         showIcon
//         message="Failed to load student records"
//         description={
//           (error as any)?.data?.message ??
//           "Please refresh the page or try again later."
//         }
//         style={{ margin: 24 }}
//       />
//     );
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-end",
//           flexWrap: "wrap",
//           gap: 12,
//         }}
//       >
//         <div>
//           <Title level={3} style={{ marginBottom: 4 }}>
//             All Student Records
//           </Title>
//           <Text type="secondary">
//             {data
//               ? `${data.count} record${data.count === 1 ? "" : "s"} total`
//               : ""}
//           </Text>
//         </div>

//         <Button
//           type="primary"
//           icon={<DownloadOutlined />}
//           onClick={handleDownloadAll}
//           disabled={!data?.students?.length}
//         >
//           Download All Records
//         </Button>
//       </div>

//       <Table
//         style={{ marginTop: 16 }}
//         rowKey="id"
//         columns={columns}
//         dataSource={data?.students ?? []}
//         loading={isLoading}
//         pagination={{ pageSize: 50, showSizeChanger: true }}
//         scroll={{ x: "max-content", y: 600 }}
//         size="small"
//         bordered
//       />
//     </div>
//   );
// };

// export default AdminStudentsPage;

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

// FIXED: CSV/formula injection guard. remarks, betterment_reason, and
// several institution/name fields are free-text entered directly by
// students — untrusted input. If a cell's content starts with =, +, -,
// or @, Excel (and some other spreadsheet apps) can interpret it as a
// FORMULA when the file is opened, not literal text — a known,
// exploitable vulnerability class (CSV injection / CWE-1236), not a
// theoretical concern given this data genuinely comes from applicants.
// Prefixing with a single quote forces spreadsheet apps to treat the
// cell as plain text; the quote itself is not displayed.
const sanitizeForFormulaInjection = (value: string): string => {
  if (/^[=+\-@]/.test(value)) {
    return `'${value}`;
  }
  return value;
};

const escapeCsvField = (value: string): string =>
  `"${sanitizeForFormulaInjection(value).replace(/"/g, '""')}"`;

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
  // NEW: local UI state for the selected filter. "all" is the UI-only
  // sentinel for "no filter" — it's translated to `undefined` before
  // being passed to the query, since undefined is what makes the API
  // call omit the status param entirely (original unfiltered behavior).
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
