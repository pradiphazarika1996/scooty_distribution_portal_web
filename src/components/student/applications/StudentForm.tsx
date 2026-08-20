"use client";
import { useSubmitApplicationMutation } from "@/redux/apis/applicationApi";
import {
  MeritAwardApplication,
  SubmitApplicationPayload,
} from "@/types/students/application";
import {
  isPortalClosed,
  PORTAL_CLOSED_MESSAGE,
} from "@/utils/students/portalDeadline";
import { Alert, Form, message } from "antd";
import { useEffect, useState } from "react";
import FormNavigation from "./FormNavigation/FormNavigation";
import FormStepper from "./FormStepper";
import styles from "./student.module.scss";
import ExamDetailsStep from "./Tab/ExamDetailsStep";
import PersonalDetailsStep from "./Tab/PersonalDetailsStep";
import ReviewStep from "./Tab/Review";

const STEP_FIELDS: Record<number, string[]> = {
  0: [
    "phone",
    "name",
    "gender_id",
    "father_name",
    "mother_name",
    "email",
    "district_id",
  ],
  1: [
    "institution_name",
    "institution_district",
    "roll",
    "number",
    "registration_no",
    "registration_session",
    "percentage_of_marks",
    "total_marks_obtained",
    "is_enrolled_in_college",
    "present_institution_name",
    "present_institution_district",
    "admission_via_samarth",
    "samarth_registration_no",
    "is_betterment_reappearance",
    "betterment_years",
    "betterment_reason",
  ],
  2: [
    "declaration_guidelines_read",
    "declaration_info_true",
    "declaration_no_other_scheme",
    "declaration_agreed",
  ],
};

const STEP_TITLES = ["Personal Details", "Exam Details", "Review & Submit"];

const getStepForField = (fieldName: string): number => {
  if (STEP_FIELDS[0].includes(fieldName)) return 0;
  if (STEP_FIELDS[1].includes(fieldName)) return 1;
  return 2;
};

interface StudentFormProps {
  application?: MeritAwardApplication;
}

const StudentForm = ({ application }: StudentFormProps) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [maxReachableStep, setMaxReachableStep] = useState(
    application?.application_number ? STEP_TITLES.length - 1 : 0,
  );
  const [reviewValues, setReviewValues] = useState<Record<string, any>>({});

  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  const isLookupVerified = !!application?.registration_no;
  const closed = isPortalClosed();

  useEffect(() => {
    if (application) {
      const hasSubmittedBefore = !!application.application_number;

      if (hasSubmittedBefore) {
        form.setFieldsValue(application);
      } else {
        const {
          total_marks_obtained,
          percentage_of_marks,
          ...prefillableFields
        } = application;
        form.setFieldsValue(prefillableFields);
      }
    }
  }, [application, form]);

  const syncReviewValues = () => {
    setReviewValues(form.getFieldsValue(true));
  };

  const goToStep = (index: number) => {
    if (index > maxReachableStep) return;
    setCurrentStep(index);
    if (index === 2) syncReviewValues();
  };

  const handleNext = async () => {
    try {
      await form.validateFields(STEP_FIELDS[currentStep]);
      const nextStep = Math.min(currentStep + 1, STEP_TITLES.length - 1);
      setMaxReachableStep((prev) => Math.max(prev, nextStep));
      goToStep(nextStep);
    } catch {}
  };

  const handleBack = () => {
    goToStep(Math.max(currentStep - 1, 0));
  };

  const handleEdit = (stepIndex: number) => {
    if (stepIndex <= maxReachableStep) goToStep(stepIndex);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields(STEP_FIELDS[2]);
      const payload = form.getFieldsValue(true) as SubmitApplicationPayload;

      await submitApplication(payload).unwrap();

      message.success("Application submitted successfully.");
    } catch (error: any) {
      if (error?.data?.errors) {
        const errorEntries = Object.entries(error.data.errors);
        form.setFields(
          errorEntries.map(([name, errMsg]) => ({
            name,
            errors: [errMsg as string],
          })),
        );
        const [firstField] = errorEntries[0] ?? [];
        if (firstField) {
          const stepWithError = getStepForField(firstField);
          setMaxReachableStep((prev) => Math.max(prev, stepWithError));
          setCurrentStep(stepWithError);
        }
      }
      if (error?.data?.message) {
        message.error(error.data.message);
      }
    }
  };

  return (
    <div className={styles.wizardContainer}>
      {closed && (
        <Alert
          type="warning"
          showIcon
          message={PORTAL_CLOSED_MESSAGE}
          description="The submission window for this scheme has ended. Any changes made below cannot be saved."
          style={{ marginBottom: 16 }}
        />
      )}

      <FormStepper
        steps={STEP_TITLES}
        current={currentStep}
        maxReachableStep={maxReachableStep}
        onStepClick={(index) => goToStep(index)}
      />

      <Form form={form} layout="vertical" className={styles.form}>
        <div style={{ display: currentStep === 0 ? "block" : "none" }}>
          <PersonalDetailsStep form={form} disabled={isLookupVerified} />
        </div>
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          <ExamDetailsStep form={form} disabled={isLookupVerified} />
        </div>
        {currentStep === 2 && (
          <ReviewStep values={reviewValues} onEdit={handleEdit} />
        )}
      </Form>

      <FormNavigation
        showPrevious={currentStep > 0}
        onPrevious={handleBack}
        showNext
        onNext={
          currentStep < STEP_TITLES.length - 1 ? handleNext : handleSubmit
        }
        nextLabel={
          currentStep < STEP_TITLES.length - 1 ? "Next" : "Submit Application"
        }
        loading={isSubmitting}
        disabled={isSubmitting}
        nextDisabled={closed}
      />
    </div>
  );
};

export default StudentForm;
