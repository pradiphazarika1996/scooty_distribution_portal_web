"use client";

import styles from "@/styles/ScholarshipForm.module.css";
import { FORM_STEPS, FORM_TABS } from "@/utils/ProgressIndicator";
import { Form, message } from "antd";
import React, { useCallback, useState } from "react";
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

  const markCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNext = useCallback(() => {
    markCompleted(currentStep);
    goToStep(currentStep + 1);
  }, [currentStep, markCompleted, goToStep]);

  const handlePrevious = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleStepClick = useCallback(
    (step: number) => {
      // Allow clicking only on completed steps or the next available step
      if (completedSteps.has(step) || step <= currentStep) {
        goToStep(step);
      }
    },
    [completedSteps, currentStep, goToStep],
  );

  const handleSubmit = useCallback(async () => {
    try {
      const values = form.getFieldsValue(true);
      console.log("Submitting application:", values);
      // TODO: API call to submit application
      message.success("Application submitted successfully!");
    } catch {
      message.error("Submission failed. Please try again.");
    }
  }, [form]);

  const disabledSteps = FORM_STEPS.filter(
    (s) => s.step > currentStep && !completedSteps.has(s.step),
  ).map((s) => s.step);

  const renderStep = () => {
    switch (currentStep) {
      case FORM_TABS.PERSONAL_DETAILS:
        return <PersonalDetailsForm form={form} onNext={handleNext} />;
      case FORM_TABS.ACADEMIC_AND_BANK_DETAILS:
        return (
          <AcademicAndBankDetailsForm
            form={form}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case FORM_TABS.DOCUMENTS:
        return (
          <DocumentsForm
            form={form}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case FORM_TABS.REVIEW:
        return (
          <ReviewForm
            form={form}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            onEditStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Scholarship Application</h1>
        <p className={styles.pageSubtitle}>
          Complete your application by filling in the details across three
          steps. Your progress is saved automatically.
        </p>
      </div>
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
