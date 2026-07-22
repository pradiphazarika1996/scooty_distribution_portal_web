import {
  APPLICATION_STATUS_LABELS,
  getGenderName,
  MeritAwardApplication,
} from "@/types/students/application";
import { getDistrictName } from "@/utils/students/student";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatDateTime = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const yesNo = (value?: boolean) => (value ? "Yes" : "No");

export const buildAcknowledgementReceipt = (
  application: MeritAwardApplication,
): jsPDF => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;
  let cursorY = 50;

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Dr. Banikanta Kakati Merit Award", pageWidth / 2, cursorY, {
    align: "center",
  });

  cursorY += 20;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Application Acknowledgement Receipt", pageWidth / 2, cursorY, {
    align: "center",
  });

  cursorY += 10;
  doc.setLineWidth(0.75);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 24;

  // ── Key facts strip: application number, submitted on, status ──
  autoTable(doc, {
    startY: cursorY,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 4 },
    body: [
      [
        { content: "Application Number", styles: { fontStyle: "bold" } },
        application.application_number || "—",
      ],
      [
        { content: "Submitted On", styles: { fontStyle: "bold" } },
        formatDateTime(application.submitted_at),
      ],
      [
        { content: "Application Status", styles: { fontStyle: "bold" } },
        APPLICATION_STATUS_LABELS[application.application_status] || "Unknown",
      ],
    ],
    columnStyles: {
      0: { cellWidth: 160 },
    },
  });

  // @ts-ignore — jspdf-autotable augments doc with lastAutoTable at runtime
  cursorY = doc.lastAutoTable.finalY + 20;

  // ── Personal Details ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Personal Details", marginX, cursorY);
  cursorY += 6;

  autoTable(doc, {
    startY: cursorY,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [11, 61, 105] }, // matches the portal's brand navy
    head: [["Particulars", "Details"]],
    body: [
      ["Name of the Applicant", application.name || "—"],
      ["Gender", getGenderName(application.gender_id ?? -1)],
      ["Father's Name", application.father_name || "—"],
      ["Mother's Name", (application as any).mother_name || "—"],
      ["Phone Number", application.phone || "—"],
      ["E-mail", (application as any).email || "—"],
      [
        "District of Residence",
        application.district_id
          ? getDistrictName(application.district_id)
          : "—",
      ],
    ],
  });

  // @ts-ignore
  cursorY = doc.lastAutoTable.finalY + 20;

  // ── HS Exam & Educational Details ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Higher Secondary Examination Details", marginX, cursorY);
  cursorY += 6;

  autoTable(doc, {
    startY: cursorY,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [11, 61, 105] },
    head: [["Particulars", "Details"]],
    body: [
      ["Institution Name", application.institution_name || "—"],
      [
        "Institution District",
        application.institution_district
          ? getDistrictName(application.institution_district)
          : "—",
      ],
      ["Roll", (application as any).roll || "—"],
      ["No.", (application as any).number || "—"],
      ["Registration Number", application.registration_no || "—"],
      [
        "Registration Session",
        (application as any).registration_session || "—",
      ],
      [
        "Total Marks Obtained",
        application.total_marks_obtained != null
          ? String(application.total_marks_obtained)
          : "—",
      ],
      [
        "Percentage of Marks",
        application.percentage_of_marks != null
          ? `${Number(application.percentage_of_marks).toFixed(2)}%`
          : "—",
      ],
      ["Remarks", application.remarks || "—"],

      [
        "Enrolled in College/University",
        yesNo(application.is_enrolled_in_college),
      ],
      ["Admission via Assam SAMARTH", yesNo(application.admission_via_samarth)],
      [
        "Betterment/Reappearance Category",
        yesNo(application.is_betterment_reappearance),
      ],
    ],
  });

  // @ts-ignore
  cursorY = doc.lastAutoTable.finalY + 30;

  // ── Footer note ──
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100);
  const footerText =
    "This is a system-generated acknowledgement receipt and does not require a signature. " +
    "Please retain this receipt for your records and any future correspondence regarding your application.";
  const wrapped = doc.splitTextToSize(footerText, pageWidth - marginX * 2);
  doc.text(wrapped, marginX, cursorY);

  return doc;
};

export const downloadAcknowledgementReceipt = (
  application: MeritAwardApplication,
) => {
  const doc = buildAcknowledgementReceipt(application);
  const fileName = application.application_number
    ? `Acknowledgement-${application.application_number}.pdf`
    : "Acknowledgement-Receipt.pdf";
  doc.save(fileName);
};
