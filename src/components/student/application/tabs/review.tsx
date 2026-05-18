import macLogo from "@/assets/images/MAC logo.png";
import { useGetDocumentsQuery } from "@/redux/apis/applicationApi";
import {
  useGetConstituencyQuery,
  useGetDistrictQuery,
  useGetPanchayatQuery,
  useGetVillageQuery,
} from "@/redux/apis/mastersApi";
import styles from "@/styles/ScholarshipForm.module.css";
import { DOCUMENT_TYPES_ARRAY, FORM_TABS } from "@/utils/students/application";
import { getBankName } from "@/utils/students/banks";
import {
  generateApplicationPdf,
  PdfSection,
} from "@/utils/students/generateApplicationPdf";
import {
  getBoardName,
  getCasteName,
  getExamTypeName,
  getGenderName,
} from "@/utils/students/student";
import { DownloadOutlined } from "@ant-design/icons";
import { skipToken } from "@reduxjs/toolkit/query";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import FormNavigation from "../form-navigation";

interface ReviewFormProps {
  onPrevious: () => void;
  onSubmit: () => void;
  onEditStep: (step: number) => void;
  isSubmitting?: boolean;
}

interface ReviewItem {
  label: string;
  value: string | undefined;
}

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
  onPrevious,
  onSubmit,
  onEditStep,
  isSubmitting = false,
}) => {
  const form = Form.useFormInstance();
  const values = form.getFieldsValue(true);
  const pd = values?.student || {};
  const ad = values?.application || {};

  const [logoBase64, setLogoBase64] = useState<string>("");

  const { data: docsData } = useGetDocumentsQuery();
  const uploadedDocs: any[] = docsData?.documents ?? [];

  // Fetch all lookup data for resolving IDs to names
  const { data: district } = useGetDistrictQuery(
    pd.district_id ? { id: pd.district_id } : skipToken,
  );
  const { data: constituency } = useGetConstituencyQuery(
    pd.constituency_id ? { id: pd.constituency_id } : skipToken,
  );
  const { data: panchayat } = useGetPanchayatQuery(
    pd.panchayat_id ? { id: pd.panchayat_id } : skipToken,
  );
  const { data: village } = useGetVillageQuery(
    pd.village_id ? { id: pd.village_id } : skipToken,
  );
  // const { pd.state_id ? { id: pd.state_id } : skipToken, } = useGetStateQuery();

  const genderName = getGenderName(pd.gender_id);
  const casteName = getCasteName(pd.caste_id);
  const districtName = district?.name;
  const constituencyName = constituency?.name;
  const panchayatName = panchayat?.name;
  const villageName = village?.name;
  // const stateName = state?.name;
  const stateName = pd.state_id;
  const examName = getExamTypeName(ad.exam_id);
  const boardName = getBoardName(ad.board_id);
  const bankName = getBankName(ad.bank_id);

  const isOutside = pd.is_outside_mac_area;

  // Build address string from resolved names
  const addressParts = isOutside
    ? [pd.address, pd.city, stateName, pd.pin_code].filter(Boolean)
    : [
        villageName,
        panchayatName,
        constituencyName,
        districtName,
        pd.pin_code,
      ].filter(Boolean);

  const personalItems: ReviewItem[] = [
    { label: "Applicant Name", value: pd.name },
    { label: "Father / Mother / Guardian", value: pd.guardian_name },
    { label: "Gender", value: genderName },
    {
      label: "Date of Birth",
      value:
        pd.date_of_birth?.format?.("DD/MM/YYYY") ??
        pd.date_of_birth?.toString(),
    },
    { label: "Caste", value: casteName },
    {
      label: "Residing outside MAC area",
      value: isOutside ? "Yes" : "No",
    },
    { label: "Address", value: addressParts.join(", ") || undefined },
    { label: "Aadhaar Number", value: pd.aadhaar_number },
    { label: "Phone Number", value: pd.phone },
    { label: "Email ID", value: pd.email || "Not provided" },
  ];

  // Show percentage or CGPA based on marking_system
  const marksItem: ReviewItem =
    ad.marking_system === 2
      ? { label: "CGPA", value: ad.cgpa ? String(ad.cgpa) : undefined }
      : {
          label: "Percentage",
          value: ad.percentage_of_marks
            ? `${ad.percentage_of_marks}%`
            : undefined,
        };

  const academicItems: ReviewItem[] = [
    { label: "Examination Passed", value: examName },
    {
      label: "Year of Passing",
      value: ad.year_of_passing ? String(ad.year_of_passing) : undefined,
    },
    { label: "Board Name", value: boardName },
    { label: "Roll No.", value: ad.roll_no },
    marksItem,
    { label: "Institution Name", value: ad.institution_name },
    { label: "Institution Address", value: ad.institution_address },
  ];

  const bankItems: ReviewItem[] = [
    { label: "Bank Name", value: bankName },
    { label: "Branch", value: ad.branch_name },
    { label: "Account No.", value: ad.account_no },
    { label: "IFSC Code", value: ad.ifsc_code },
  ];

  const documentItems: ReviewItem[] = DOCUMENT_TYPES_ARRAY.map((docType) => {
    const doc = uploadedDocs.find((d: any) => d.doc_type === docType.key);
    return {
      label: docType.label,
      value: doc?.file_name ?? "Not uploaded",
    };
  });

  useEffect(() => {
    fetch(macLogo.src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result as string);
        reader.readAsDataURL(blob);
      })
      .catch(() => {});
  }, []);

  const handleDownloadPdf = () => {
    const sections: PdfSection[] = [
      {
        title: "Personal Details",
        rows: personalItems.map((i) => ({
          label: i.label,
          value: i.value || "—",
        })),
      },
      {
        title: "Academic Details",
        rows: academicItems.map((i) => ({
          label: i.label,
          value: i.value || "—",
        })),
      },
      {
        title: "Bank Details",
        rows: bankItems.map((i) => ({ label: i.label, value: i.value || "—" })),
      },
      {
        title: "Uploaded Documents",
        rows: documentItems.map((i) => ({
          label: i.label,
          value: i.value || "—",
        })),
      },
    ];

    const doc = generateApplicationPdf(sections, {
      applicationNumber: ad.application_number,
      submittedAt: ad.submitted_at
        ? new Date(ad.submitted_at).toLocaleDateString("en-IN")
        : undefined,
      logoUrl: logoBase64,
    });

    doc.save(`Application_${ad.application_number || "draft"}.pdf`);
  };

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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          className={styles.reviewEditBtn}
          onClick={handleDownloadPdf}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <DownloadOutlined /> Download Application PDF
        </button>
      </div>

      <FormNavigation
        onPrevious={onPrevious}
        onNext={onSubmit}
        nextLabel="Submit Application"
        loading={isSubmitting}
      />
    </>
  );
};

export default ReviewForm;
