import styles from "@/styles/ScholarshipForm.module.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React from "react";

interface FormNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  showPrevious?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  onPrevious,
  onNext,
  nextLabel = "Save & Next",
  previousLabel = "Previous",
  showPrevious = true,
  showNext = true,
  nextDisabled = false,
}) => {
  return (
    <div className={styles.formNavigation}>
      {showPrevious ? (
        <button className={styles.btnSecondary} onClick={onPrevious}>
          <ArrowLeftOutlined />
          {previousLabel}
        </button>
      ) : (
        <div />
      )}
      {showNext && (
        <button
          className={styles.btnPrimary}
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
          <ArrowRightOutlined />
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
