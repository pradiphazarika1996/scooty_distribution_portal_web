import macLogo from "@/assets/images/MAC logo.png";

import {
  useGetDocumentsQuery,
  useLazyGetDocumentUrlQuery,
} from "@/redux/apis/applicationApi";
import {
  useGetConstituencyQuery,
  useGetDistrictQuery,
  useGetVillageQuery,
} from "@/redux/apis/mastersApi";
import styles from "@/styles/ScholarshipForm.module.css";
import {
  DOCUMENT_TYPES,
  FORM_TABS,
  getDocumentTypesArray,
  getStateName,
} from "@/utils/students/application";
import {
  generateApplicationPdf,
  PdfSection,
} from "@/utils/students/generateApplicationPdf";
import {
  BOARDS,
  CASTE,
  getBoardName,
  getCasteName,
  getExamTypeName,
  getGenderName,
} from "@/utils/students/student";
import {
  DownloadOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { skipToken } from "@reduxjs/toolkit/query";
import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import FormNavigation from "../form-navigation";
import { VILLAGE_OTHER } from "./personal-details";

interface ReviewFormProps {
  onPrevious: () => void;
  onSubmit: () => void;
  onEditStep: (step: number) => void;
  isSubmitting?: boolean;
  examId?: number;
}

interface ReviewItem {
  label: string;
  value?: string;
  docId?: number | null;
}

const ReviewBlock: React.FC<{
  title: string;
  items: ReviewItem[];
  onEdit: () => void;
}> = ({ title, items, onEdit }) => {
  const [loadingDocId, setLoadingDocId] = useState<number | null>(null);
  const [getDocUrl] = useLazyGetDocumentUrlQuery();

  const handleViewDoc = async (docId: number) => {
    setLoadingDocId(docId);
    try {
      const data = await getDocUrl(docId).unwrap();
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
      message.error("Failed to load document. Please try again.");
    } finally {
      setLoadingDocId(null);
    }
  };

  return (
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
            <span className={styles.reviewValue}>
              {item.docId ? (
                <span className={styles.docValueRow}>
                  <span>{item.value}</span>
                  <button
                    className={styles.viewDocLink}
                    onClick={() => handleViewDoc(item.docId!)}
                    disabled={loadingDocId === item.docId}
                    type="button"
                  >
                    {loadingDocId === item.docId ? (
                      <LoadingOutlined />
                    ) : (
                      <>
                        <EyeOutlined /> View
                      </>
                    )}
                  </button>
                </span>
              ) : (
                item.value || "—"
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const [passportBase64, setPassportBase64] = useState<string>("");

  const [getDocUrl] = useLazyGetDocumentUrlQuery();
  const { data: docsData } = useGetDocumentsQuery();
  const uploadedDocs: any[] = docsData?.documents ?? [];

  // Fetch all lookup data for resolving IDs to names
  const { data: district } = useGetDistrictQuery(
    pd.district_id ? { id: pd.district_id } : skipToken,
  );
  const { data: constituency } = useGetConstituencyQuery(
    pd.constituency_id ? { id: pd.constituency_id } : skipToken,
  );
  const { data: village } = useGetVillageQuery(
    pd.village_id ? { id: pd.village_id } : skipToken,
  );

  const genderName = getGenderName(pd.gender_id);
  const casteName =
    pd.caste_id === CASTE.OTHER
      ? pd.other_caste_name
      : getCasteName(pd.caste_id);
  const districtName = district?.name;
  const constituencyName = constituency?.name;
  const villageName =
    pd.village_id === VILLAGE_OTHER ? pd.other_village_name : village?.name;
  const stateName = getStateName(pd.state_id);
  const examName = getExamTypeName(ad.exam_id);
  const boardName =
    ad.board_id === BOARDS.OTHER
      ? ad.other_board_name
      : getBoardName(ad.board_id);

  const isOutside = pd.is_outside_mac_area;

  // Build address string from resolved names
  const addressParts = !isOutside
    ? [
        pd.permanent_address,
        pd.present_address,
        pd.city,
        stateName,
        pd.pin_code,
      ].filter(Boolean)
    : [
        villageName,
        pd.panchayat_name,
        constituencyName,
        districtName,
        pd.pin_code,
      ].filter(Boolean);

  const personalItems: ReviewItem[] = [
    { label: "Applicant Name", value: pd.name },
    { label: "Father / Guardian", value: pd.guardian_name },
    { label: "Gender", value: genderName },
    {
      label: "Date of Birth",
      value:
        pd.date_of_birth?.format?.("DD/MM/YYYY") ??
        pd.date_of_birth?.toString(),
    },
    { label: "Caste", value: casteName },
    {
      label: "Are you a resident of MAC notified village area?",
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
    { label: "Bank Name", value: ad.bank_name },
    { label: "Branch", value: ad.branch_name },
    { label: "Account No.", value: ad.account_no },
    { label: "IFSC Code", value: ad.ifsc_code },
  ];

  const documentTypes = getDocumentTypesArray(ad.exam_id);
  const documentItems: ReviewItem[] = documentTypes.map((docType) => {
    const doc = uploadedDocs.find((d: any) => d.doc_type === docType.key);
    return {
      label: docType.label,
      value: doc?.file_name ?? "Not uploaded",
      docId: doc?.id ?? null,
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

  // Fetch passport photo for PDF
  useEffect(() => {
    const passportDoc = uploadedDocs.find(
      (d: any) => d.doc_type === DOCUMENT_TYPES.PASSPORT,
    );
    if (!passportDoc) return;

    getDocUrl(passportDoc.id)
      .unwrap()
      .then(({ url }) =>
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => setPassportBase64(reader.result as string);
            reader.readAsDataURL(blob);
          }),
      )
      .catch(() => {});
  }, [uploadedDocs, getDocUrl]);

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
      passportPhotoUrl: passportBase64,
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
