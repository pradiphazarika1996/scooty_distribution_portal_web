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
      <div className={styles.schemeBanner}>
        <h3 className={styles.schemeName}>Tabu Taid Shiksha Jyoti Scheme</h3>
        <p className={styles.schemeInfo}>
          Eligibility for this scheme is restricted to students who have secured
          a minimum of <strong>60% marks</strong> or a{" "}
          <strong>CGPA of 6.0</strong> (on a 10-point scale) or its equivalent,
          in the qualifying examination. Students who do not meet this criterion
          will not be considered for the scholarship.
        </p>
      </div>

      <div className={styles.noticeCardAccent}>
        <p className={styles.noticeText}>
          <strong>Note:</strong> You are eligible to apply for{" "}
          <strong>one examination only</strong>. Please review your selection
          carefully, as{" "}
          <span className={styles.noticeHighlight}>
            it cannot be modified after selection.
          </span>
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
