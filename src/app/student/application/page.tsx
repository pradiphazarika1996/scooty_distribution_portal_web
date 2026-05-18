"use client";

import ApplicationStatus from "@/components/student/application/application-status";
import EligibilityNotice from "@/components/student/application/eligibility-notice";
import ExamSelector from "@/components/student/application/exam-selector";
import ScholarshipApplicationForm from "@/components/student/application/form";
import {
  useCreateDraftMutation,
  useGetApplicationQuery,
  useGetEligibilityQuery,
} from "@/redux/apis/applicationApi";
import styles from "@/styles/ApplicationPage.module.css";
import { APPLICATION_STATUS } from "@/utils/students/application";
import { Spin, message } from "antd";
import { useCallback } from "react";

const PAGE_SUBTITLES: Record<string, string> = {
  selector: "Select an examination to begin your application.",
  form: "Complete your application by filling in the details. Your progress is saved automatically.",
  status: "Your application has been submitted. Track your status below.",
  ineligible: "You are not eligible to apply at this time.",
};

export default function ApplicationPage() {
  const { data: eligibility, isLoading: isEligibilityLoading } =
    useGetEligibilityQuery();
  const { data: appData, isLoading: isAppLoading } = useGetApplicationQuery();
  const [createDraft, { isLoading: isCreatingDraft }] =
    useCreateDraftMutation();

  const application = appData?.application;
  const isDraft = application?.application_status === APPLICATION_STATUS.DRAFT;
  const hasSubmittedApplication =
    application &&
    application.application_status === APPLICATION_STATUS.SUBMITTED;
  const hasDraft = application && isDraft;

  const handleExamSelect = useCallback(
    async (examId: number) => {
      try {
        await createDraft({ examId }).unwrap();
        message.success("Application started");
      } catch {
        message.error("Failed to start application. Please try again.");
      }
    },
    [createDraft],
  );

  // ── Loading ──
  if (isEligibilityLoading || isAppLoading) {
    return (
      <main>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Scholarship Application</h1>
        </div>
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      </main>
    );
  }

  // ── Determine current view ──
  const getSubtitle = (): string => {
    if (hasSubmittedApplication) return PAGE_SUBTITLES.status;
    if (hasDraft) return PAGE_SUBTITLES.form;
    if (eligibility?.canApply) return PAGE_SUBTITLES.selector;
    return PAGE_SUBTITLES.ineligible;
  };

  const renderView = () => {
    // View 1: Submitted/Approved/Rejected → show status
    if (hasSubmittedApplication) {
      return (
        <ApplicationStatus
          application={application}
          canApplyNew={eligibility?.canApply ?? false}
          allowedExams={eligibility?.allowedExams ?? []}
          eligibleAfter={eligibility?.eligibleAfter}
          onApplyNew={handleExamSelect}
        />
      );
    }

    // View 2: Draft exists → show form
    if (hasDraft) {
      return <ScholarshipApplicationForm appData={appData} />;
    }

    // View 3: Can apply → show exam selector
    if (eligibility?.canApply) {
      return (
        <ExamSelector
          allowedExams={eligibility.allowedExams}
          onSelect={handleExamSelect}
          isLoading={isCreatingDraft}
        />
      );
    }

    // View 4: Not eligible
    return (
      <EligibilityNotice
        reason={eligibility?.reason}
        eligibleAfter={eligibility?.eligibleAfter}
      />
    );
  };

  return (
    <main>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Scholarship Application</h1>
        <p className={styles.pageSubtitle}>{getSubtitle()}</p>
      </div>
      {renderView()}
    </main>
  );
}
