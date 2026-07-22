"use client";
import { useSubmitApplicationMutation } from "@/redux/apis/applicationApi";
import {
  MeritAwardApplication,
  SubmitApplicationPayload,
} from "@/types/students/application";
import { Form, message } from "antd";
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

// NOTE: duplicates ExamDetailsStep.tsx's ELIGIBILITY_THRESHOLD (also 80).
// Kept in sync manually — if that value ever changes, update both.
const ELIGIBILITY_THRESHOLD = 80;

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
  const [maxReachableStep, setMaxReachableStep] = useState(0);
  const [reviewValues, setReviewValues] = useState<Record<string, any>>({});

  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  const isLookupVerified = !!application?.registration_no;

  // NEW: reactively watches percentage_of_marks so the Next/Submit button
  // updates immediately as the user types total marks (which drives the
  // auto-calculated percentage in ExamDetailsStep), without needing a
  // separate piece of state to keep in sync with form values.
  const percentageOfMarks = Form.useWatch("percentage_of_marks", form);
  const isIneligible =
    percentageOfMarks !== undefined &&
    percentageOfMarks !== null &&
    percentageOfMarks !== "" &&
    Number(percentageOfMarks) < ELIGIBILITY_THRESHOLD;

  useEffect(() => {
    if (application) {
      // CHANGED: total_marks_obtained and percentage_of_marks are
      // deliberately excluded from the prefill. Even though the fetched
      // Student record has values for both (populated at registration
      // time from StudentLookup), the field must stay empty so the user
      // enters it manually. percentage_of_marks is excluded too since
      // it's derived from total_marks_obtained and would otherwise show
      // a stale value while total marks is blank.
      const {
        total_marks_obtained,
        percentage_of_marks,
        ...prefillableFields
      } = application;
      form.setFieldsValue(prefillableFields);
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
        nextDisabled={isIneligible}
      />
    </div>
  );
};

export default StudentForm;
