import { Button } from "antd";
import styles from "./FormNavigation.module.scss";

interface FormNavigationProps {
  showPrevious?: boolean;
  onPrevious?: () => void;
  showNext?: boolean;
  onNext?: () => void;
  nextLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}

const FormNavigation = ({
  showPrevious = true,
  onPrevious,
  showNext = true,
  onNext,
  nextLabel = "Next",
  loading = false,
  disabled = false,
}: FormNavigationProps) => {
  if (!showPrevious && !showNext) return null;

  return (
    <div className={styles.actions}>
      {showPrevious ? (
        <Button onClick={onPrevious} disabled={disabled}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {showNext && (
        <Button
          type="primary"
          onClick={onNext}
          loading={loading}
          disabled={disabled}
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
