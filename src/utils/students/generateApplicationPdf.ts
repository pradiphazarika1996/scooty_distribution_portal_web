import jsPDF from "jspdf";

const COLORS = {
  primary: [137, 0, 212] as [number, number, number],
  text: [32, 25, 36] as [number, number, number],
  textLight: [78, 67, 84] as [number, number, number],
  border: [209, 193, 215] as [number, number, number],
  bgLight: [247, 234, 249] as [number, number, number],
};

interface RowItem {
  label: string;
  value: string;
}

export interface PdfSection {
  title: string;
  rows: RowItem[];
}

function checkPage(doc: jsPDF, y: number, needed = 30): number {
  if (y + needed > doc.internal.pageSize.height - 30) {
    doc.addPage();
    return 40;
  }
  return y;
}

function drawSectionHeader(doc: jsPDF, title: string, y: number): number {
  const pageWidth = doc.internal.pageSize.width;
  const mx = 20;

  doc.setFillColor(...COLORS.bgLight);
  doc.rect(mx, y, pageWidth - mx * 2, 10, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.primary);
  doc.text(title.toUpperCase(), mx + 4, y + 7);

  return y + 14;
}

function drawRow(doc: jsPDF, item: RowItem, y: number): number {
  const pageWidth = doc.internal.pageSize.width;
  const mx = 20;
  const labelWidth = 65;

  // Label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.textLight);

  const labelLines = doc.splitTextToSize(
    item.label.toUpperCase(),
    labelWidth - 8,
  );
  labelLines.forEach((line: string, i: number) => {
    doc.text(line, mx + 4, y + 4 + i * 3.5);
  });

  // Value
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.text);

  const valueMaxWidth = pageWidth - mx * 2 - labelWidth - 4;
  const valueLines = doc.splitTextToSize(item.value || "—", valueMaxWidth);
  valueLines.forEach((line: string, i: number) => {
    doc.text(line, mx + labelWidth, y + 4 + i * 3.5);
  });

  // Row height based on whichever is taller
  const rowContentHeight = Math.max(labelLines.length, valueLines.length) * 3.5;
  const rowHeight = Math.max(10, rowContentHeight + 5);

  // Bottom border
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.2);
  doc.line(mx, y + rowHeight, pageWidth - mx, y + rowHeight);

  return y + rowHeight + 2;
}

export function generateApplicationPdf(
  sections: PdfSection[],
  meta: {
    applicationNumber?: string;
    submittedAt?: string;
    logoUrl?: string;
  },
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.width;
  const mx = 20;

  let y = 20;

  // ── Header (centered) ──
  const centerX = pageWidth / 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.primary);
  doc.text("Mising Autonomous Council (MAC)", centerX, y, { align: "center" });
  y += 7;

  doc.setFontSize(13);
  doc.text("Tabu Taid Shiksha Jyoti Scheme", centerX, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.textLight);
  doc.text("Application Form", centerX, y, { align: "center" });
  y += 8;

  // Divider
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.6);
  doc.line(mx, y, pageWidth - mx, y);
  y += 8;

  // ── Sections ──
  for (const section of sections) {
    y = checkPage(doc, y, 40);
    y = drawSectionHeader(doc, section.title, y);

    for (const row of section.rows) {
      y = checkPage(doc, y);
      y = drawRow(doc, row, y);
    }

    y += 6;
  }

  // ── Footer ──
  y = checkPage(doc, y, 20);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(mx, y, pageWidth - mx, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.textLight);
  doc.text(
    "This is a computer-generated document. No signature is required.",
    pageWidth / 2,
    y,
    { align: "center" },
  );

  return doc;
}
