"use client";

import {
  useSaveApplicationStepMutation,
  useSubmitApplicationMutation,
} from "@/redux/apis/applicationApi";
import styles from "@/styles/ScholarshipForm.module.css";
import { FORM_STEPS, FORM_TABS } from "@/utils/ProgressIndicator";
import { getStepData, mapApiToFormValues } from "@/utils/students/form";
import { Form, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import AcademicAndBankDetailsForm from "./tabs/academic-and-bank-details";
import DocumentsForm from "./tabs/documents";
import PersonalDetailsForm from "./tabs/personal-details";
import ReviewForm from "./tabs/review";

interface ScholarshipApplicationFormProps {
  appData: any;
}

const ScholarshipApplicationForm: React.FC<ScholarshipApplicationFormProps> = ({
  appData,
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(
    FORM_TABS.PERSONAL_DETAILS,
  );
  const [completedStep, setCompletedStep] = useState<number>(0);
  const [saveStep, { isLoading: isSaving }] = useSaveApplicationStepMutation();
  const [submitApp, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  // ── Populate form from API data ──
  useEffect(() => {
    if (!appData) return;

    const formValues = mapApiToFormValues(appData);
    form.setFieldsValue(formValues);

    const application = appData.application;
    if (application) {
      const step = application.completed_step ?? 0;
      setCompletedStep(step);
      if (step > 0) {
        setCurrentStep(Math.min(step + 1, FORM_TABS.REVIEW));
      }
    }
  }, [appData, form]);

  // ── Navigation ──
  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveAndNext = useCallback(async () => {
    try {
      const allValues = form.getFieldsValue(true);
      const stepData = getStepData(currentStep, allValues);

      const res = await saveStep({
        step: currentStep,
        data: stepData,
      }).unwrap();

      setCompletedStep(res.completed_step);
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
      if (step <= completedStep + 1) {
        goToStep(step);
      }
    },
    [completedStep, goToStep],
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
    (s) => s.step > completedStep + 1,
  ).map((s) => s.step);

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
            examId={appData?.application?.exam_id}
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
      <Form form={form} layout="vertical" requiredMark scrollToFirstError>
        {renderStep()}
      </Form>
    </div>
  );
};

export default ScholarshipApplicationForm;
