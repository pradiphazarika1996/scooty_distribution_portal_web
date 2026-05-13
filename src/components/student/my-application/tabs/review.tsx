import styles from "@/styles/ScholarshipForm.module.css";
import {
  CASTE_OPTIONS,
  DOCUMENT_TYPES,
  EXAMINATION_OPTIONS,
  FORM_TABS,
  GENDER_OPTIONS,
} from "@/utils/students/scholarship";
import type { FormInstance } from "antd";
import React from "react";
import FormNavigation from "../form-navigation";

interface ReviewFormProps {
  form: FormInstance;
  onPrevious: () => void;
  onSubmit: () => void;
  onEditStep: (step: number) => void;
}

interface ReviewItem {
  label: string;
  value: string | undefined;
}

const getOptionLabel = (
  options: { value: string; label: string }[],
  value: string | undefined,
): string => {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
};

const ReviewBlock: React.FC<{
  title: string;
  items: ReviewItem[];
  onEdit: () => void;
}> = ({ title, items, onEdit }) => (
  <div className={styles.reviewSection}>
    <div className={styles.reviewHeader}>
      <span className={styles.reviewHeaderTitle}>{title}</span>
      <button className={styles.reviewEditBtn} onClick={onEdit}>
        Edit
      </button>
    </div>
    <div className={styles.reviewBody}>
      {items.map((item, idx) => (
        <div className={styles.reviewRow} key={idx}>
          <span className={styles.reviewLabel}>{item.label}</span>
          <span className={styles.reviewValue}>{item.value || "—"}</span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewForm: React.FC<ReviewFormProps> = ({
  form,
  onPrevious,
  onSubmit,
  onEditStep,
}) => {
  const values = form.getFieldsValue(true);
  const pd = values?.personalDetails || {};
  const ad = values?.academicDetails || {};
  const bd = values?.bankDetails || {};
  const docs = values?.documents || {};

  const personalItems: ReviewItem[] = [
    { label: "Applicant Name", value: pd.applicantName },
    { label: "Father / Mother / Guardian", value: pd.parentGuardianName },
    { label: "Gender", value: getOptionLabel(GENDER_OPTIONS, pd.gender) },
    {
      label: "Date of Birth",
      value: pd.dateOfBirth?.format?.("DD/MM/YYYY") ?? pd.dateOfBirth,
    },
    { label: "Caste", value: getOptionLabel(CASTE_OPTIONS, pd.caste) },
    {
      label: "MAC Constituency",
      value:
        `${pd.macConstituencyName || ""} (${pd.macConstituencyNo || ""})`.trim(),
    },
    {
      label: "Address",
      value: [
        pd.village,
        pd.panchayat,
        pd.constituency,
        pd.district,
        pd.city,
        pd.state,
        pd.pinCode,
      ]
        .filter(Boolean)
        .join(", "),
    },
    { label: "Aadhaar Number", value: pd.aadhaarNumber },
    { label: "Phone Number", value: pd.phoneNumber },
    { label: "Email ID", value: pd.emailId || "Not provided" },
  ];

  const academicItems: ReviewItem[] = [
    {
      label: "Examination Passed",
      value: getOptionLabel(EXAMINATION_OPTIONS, ad.examinationPassed),
    },
    { label: "Year of Passing", value: ad.yearOfPassing },
    { label: "Board Name", value: ad.boardName },
    { label: "Roll No.", value: ad.rollNo },
    {
      label: "Percentage",
      value: ad.percentageOfMarks ? `${ad.percentageOfMarks}%` : undefined,
    },
    { label: "Institution Name", value: ad.institutionName },
    { label: "Institution Address", value: ad.institutionAddress },
  ];

  const bankItems: ReviewItem[] = [
    { label: "Bank Name", value: bd.bankName },
    { label: "Branch", value: bd.branchName },
    { label: "Account No.", value: bd.accountNo },
    { label: "IFSC Code", value: bd.ifscCode },
  ];

  const documentItems: ReviewItem[] = DOCUMENT_TYPES.map((docType) => {
    const files = docs[docType.key];
    const fileName =
      files && files.length > 0 ? files[0]?.name : "Not uploaded";
    return { label: docType.label, value: fileName };
  });

  return (
    <>
      <div
        className={styles.sectionCard}
        style={{ borderLeft: "3px solid var(--primary)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--font-size-sm)",
            color: "var(--on-surface-variant)",
          }}
        >
          Please review all information before submitting. Click{" "}
          <strong>Edit</strong> on any section to make changes.
        </p>
      </div>

      <ReviewBlock
        title="Personal Details"
        items={personalItems}
        onEdit={() => onEditStep(FORM_TABS.PERSONAL_DETAILS)}
      />

      <ReviewBlock
        title="Academic Details"
        items={academicItems}
        onEdit={() => onEditStep(FORM_TABS.ACADEMIC_AND_BANK_DETAILS)}
      />

      <ReviewBlock
        title="Bank Details"
        items={bankItems}
        onEdit={() => onEditStep(FORM_TABS.ACADEMIC_AND_BANK_DETAILS)}
      />

      <ReviewBlock
        title="Uploaded Documents"
        items={documentItems}
        onEdit={() => onEditStep(FORM_TABS.DOCUMENTS)}
      />

      <FormNavigation
        onPrevious={onPrevious}
        onNext={onSubmit}
        nextLabel="Submit Application"
      />
    </>
  );
};

export default ReviewForm;
