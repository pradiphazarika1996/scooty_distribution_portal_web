import styles from "@/styles/ApplicationPage.module.css";
import { LoadingOutlined } from "@ant-design/icons";
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
  isLoading = false,
}) => {
  return (
    <div>
      <div className={styles.noticeCardAccent}>
        <p className={styles.noticeText}>
          Select the examination for which you want to apply for scholarship.
          This cannot be changed after submission.
        </p>
      </div>

      <div className={styles.examGrid}>
        {allowedExams.map((examId) => {
          const config = EXAM_CONFIG[examId];
          if (!config) return null;

          return (
            <button
              key={examId}
              className={styles.examCard}
              onClick={() => onSelect(examId)}
              disabled={isLoading}
              type="button"
            >
              <span className={styles.examCardLabel}>{config.fullLabel}</span>
              <span className={styles.examCardDesc}>{config.description}</span>
              <span className={styles.examCardAction}>
                {isLoading ? (
                  <LoadingOutlined />
                ) : (
                  <>Apply for {config.label} →</>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExamSelector;
