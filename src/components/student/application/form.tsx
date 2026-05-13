"use client";

import {
  useCreateDraftMutation,
  useGetApplicationQuery,
  useGetEligibilityQuery,
  useSaveApplicationStepMutation,
  useSubmitApplicationMutation,
} from "@/redux/apis/scholarshipApi";
import styles from "@/styles/ScholarshipForm.module.css";
import { FORM_STEPS, FORM_TABS } from "@/utils/ProgressIndicator";
import { getStepData, mapApiToFormValues } from "@/utils/students/form";
import { Form, message, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ApplicationStatus from "./application-status";
import ProgressIndicator from "./ProgressIndicator";
import AcademicAndBankDetailsForm from "./tabs/academin-and-bank-details";
import DocumentsForm from "./tabs/documents";
import PersonalDetailsForm from "./tabs/personal-details";
import ReviewForm from "./tabs/review";

const ScholarshipApplicationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(
    FORM_TABS.PERSONAL_DETAILS,
  );
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const { data: eligibility, isLoading: isEligibilityLoading } =
    useGetEligibilityQuery();
  const { data: appData, isLoading: isAppLoading } = useGetApplicationQuery();
  const [createDraft, { isLoading: isCreatingDraft }] =
    useCreateDraftMutation();
  const [saveStep, { isLoading: isSaving }] = useSaveApplicationStepMutation();
  const [submitApp, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  const application = appData?.application;
  const isDraft = application?.application_status === 0;
  const hasSubmittedApplication =
    application && application.application_status > 0;
  const hasDraft = application && isDraft;

  // ── Populate form when data arrives ──
  useEffect(() => {
    if (!appData) return;

    const formValues = mapApiToFormValues(appData);
    form.setFieldsValue(formValues);

    // Restore step progress from draft
    if (isDraft && application?.completed_steps?.length) {
      const steps: number[] = application.completed_steps;
      setCompletedSteps(new Set(steps));
      const maxCompleted = Math.max(...steps);
      setCurrentStep(Math.min(maxCompleted + 1, FORM_TABS.REVIEW));
    }
  }, [appData, application, isDraft, form]);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveAndNext = useCallback(async () => {
    try {
      const allValues = form.getFieldsValue(true);
      const stepData = getStepData(currentStep, allValues);

      await saveStep({ step: currentStep, data: stepData }).unwrap();

      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      goToStep(currentStep + 1);
      message.success("Progress saved");
    } catch {
      message.error("Failed to save. Please try again.");
    }
  }, [currentStep, form, saveStep, goToStep]);

  const handlePrevious = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleStepClick = useCallback(
    (step: number) => {
      if (completedSteps.has(step) || step <= currentStep) {
        goToStep(step);
      }
    },
    [completedSteps, currentStep, goToStep],
  );

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

  const handleSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      await submitApp().unwrap();
      message.success("Application submitted successfully!");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "errorFields" in error) {
        message.error("Some fields are incomplete. Please review all steps.");
        return;
      }
      message.error("Submission failed. Please try again.");
    }
  }, [form, submitApp]);

  const disabledSteps = FORM_STEPS.filter(
    (s) => s.step > currentStep && !completedSteps.has(s.step),
  ).map((s) => s.step);

  if (isEligibilityLoading || isAppLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (hasSubmittedApplication) {
    return (
      <ApplicationStatus
        application={application}
        canApplyNew={eligibility?.canApply ?? false}
        allowedExams={eligibility?.allowedExams ?? []}
        onApplyNew={() => {
          /* ExamSelector will show after eligibility refetch */
        }}
      />
    );
  }

  // if (!hasDraft) {
  //   if (!eligibility?.canApply) {
  //     return (
  //       <div
  //         className={styles.sectionCard}
  //         style={{ borderLeft: "3px solid var(--error)" }}
  //       >
  //         <p
  //           style={{
  //             fontFamily: "var(--font-family)",
  //             fontSize: "var(--font-size-sm)",
  //             color: "var(--on-surface-variant)",
  //           }}
  //         >
  //           {eligibility?.reason ??
  //             "You are not eligible to apply at this time."}
  //         </p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <ExamSelector
  //       allowedExams={eligibility.allowedExams}
  //       onSelect={handleExamSelect}
  //       isLoading={isCreatingDraft}
  //     />
  //   );
  // }

  const renderStep = () => {
    switch (currentStep) {
      case FORM_TABS.PERSONAL_DETAILS:
        return (
          <PersonalDetailsForm onNext={handleSaveAndNext} isSaving={isSaving} />
        );
      case FORM_TABS.ACADEMIC_AND_BANK_DETAILS:
        return (
          <AcademicAndBankDetailsForm
            onNext={handleSaveAndNext}
            onPrevious={handlePrevious}
            isSaving={isSaving}
          />
        );
      case FORM_TABS.DOCUMENTS:
        return (
          <DocumentsForm
            onNext={handleSaveAndNext}
            onPrevious={handlePrevious}
            isSaving={isSaving}
          />
        );
      case FORM_TABS.REVIEW:
        return (
          <ReviewForm
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            onEditStep={goToStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <ProgressIndicator
        steps={FORM_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        disabledSteps={disabledSteps}
      />
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        scrollToFirstError
      >
        {renderStep()}
      </Form>
    </div>
  );
};

export default ScholarshipApplicationForm;
