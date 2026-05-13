import styles from "@/styles/ScholarshipForm.module.css";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React from "react";

interface FormNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  showPrevious?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  loading?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  onPrevious,
  onNext,
  nextLabel = "Save & Next",
  previousLabel = "Previous",
  showPrevious = true,
  showNext = true,
  nextDisabled = false,
  loading = false,
}) => {
  return (
    <div className={styles.formNavigation}>
      {showPrevious ? (
        <button
          className={styles.btnSecondary}
          onClick={onPrevious}
          disabled={loading}
        >
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
          disabled={nextDisabled || loading}
        >
          {loading ? <LoadingOutlined /> : nextLabel}
          {!loading && <ArrowRightOutlined />}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
