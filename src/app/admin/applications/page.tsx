"use client";

import ApplicationFilters from "@/components/applications/ApplicationFilter";
import ApplicationTable from "@/components/applications/ApplicationTable";
import { useApplicationTable } from "@/hooks/useApplicationTable";
import { PAGE_SIZE } from "@/types/dashboard/application";
import { Pagination, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import styles from "./applicationpage.module.scss";

const ApplicationsPage: React.FC = () => {
  const router = useRouter();
  const {
    filters,
    page,
    selectedIds,
    excelLoading,
    pdfLoading,
    applications,
    total,
    isFetching,
    isError,
    handleFilterChange,
    handleSelectAll,
    handleSelectRow,
    handlePageChange,
    handleExcelExport,
    handlePdfExport,
  } = useApplicationTable();
  const handleApprove = useCallback(
    (id: string) => console.log("Approve:", id),
    [],
  );
  const handleReject = useCallback(
    (id: string) => console.log("Reject:", id),
    [],
  );
  const handleViewDetails = useCallback(
    (id: string) => router.push(`/admin/applications/${id}`),
    [router],
  );
  return (
    <div className={styles.page}>
      {/* Filter bar — always visible */}
      <ApplicationFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        exportCount={total}
        excelLoading={excelLoading}
        pdfLoading={pdfLoading}
        onExcelExport={handleExcelExport}
        onPdfExport={handlePdfExport}
      />

      {/* Loading */}
      {isFetching && (
        <Skeleton active paragraph={{ rows: 10 }} style={{ marginTop: 24 }} />
      )}

      {/* Error */}
      {!isFetching && isError && (
        <p style={{ color: "var(--color-error)", padding: "24px 0" }}>
          Failed to load applications. Please try again.
        </p>
      )}

      {/* Empty */}
      {!isFetching && !isError && applications.length === 0 && (
        <p style={{ padding: "32px 0", color: "var(--color-text-secondary)" }}>
          No applications found.
        </p>
      )}

      {/* Table */}
      {!isFetching && !isError && applications.length > 0 && (
        <>
          <ApplicationTable
            applications={applications}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectRow={handleSelectRow}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
          />

          {total > PAGE_SIZE && (
            <div className={styles.pagination}>
              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(t) => `${t} applications`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;
