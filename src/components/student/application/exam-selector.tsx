import styles from "@/styles/ScholarshipForm.module.css";
import React from "react";

interface ExamSelectorProps {
  allowedExams: number[];
  onSelect: (examId: number) => void;
  isLoading?: boolean;
}

const EXAM_CONFIG: Record<
  number,
  { label: string; fullLabel: string; description: string }
> = {
  1: {
    label: "HSLC",
    fullLabel: "HSLC (Class 10)",
    description:
      "High School Leaving Certificate — for students who passed Class 10 examination.",
  },
  2: {
    label: "HS",
    fullLabel: "HS (Class 12)",
    description:
      "Higher Secondary — for students who passed Class 12 examination.",
  },
};

const ExamSelector: React.FC<ExamSelectorProps> = ({
  allowedExams,
  onSelect,
}) => {
  return (
    <div>
      <div
        className={styles.sectionCard}
        style={{
          borderLeft: "3px solid var(--primary)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--font-size-sm)",
            color: "var(--on-surface-variant)",
          }}
        >
          Select the examination for which you want to apply for scholarship.
          This cannot be changed after submission.
        </p>
      </div>

      <div className={styles.formGrid}>
        {allowedExams.map((examId) => {
          const config = EXAM_CONFIG[examId];
          if (!config) return null;

          return (
            <button
              key={examId}
              className={styles.examCard}
              onClick={() => onSelect(examId)}
              type="button"
            >
              <span className={styles.examCardLabel}>{config.fullLabel}</span>
              <span className={styles.examCardDesc}>{config.description}</span>
              <span className={styles.examCardAction}>
                Apply for {config.label} →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExamSelector;
