import styles from "./FormStepper.module.scss";

interface FormStepperProps {
  steps: string[];
  current: number;
  maxReachableStep: number;
  onStepClick?: (index: number) => void;
}

const FormStepper = ({
  steps,
  current,
  maxReachableStep,
  onStepClick,
}: FormStepperProps) => {
  return (
    <div className={styles.stepper}>
      {steps.map((label, index) => {
        const isActive = index === current;
        const isCompleted = index < current;
        const isClickable = index <= maxReachableStep;

        return (
          <div className={styles.stepWrapper} key={label}>
            <div className={styles.stepItem}>
              <button
                type="button"
                className={[
                  styles.circle,
                  isActive ? styles.active : "",
                  isCompleted ? styles.completed : "",
                ].join(" ")}
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                aria-current={isActive ? "step" : undefined}
                aria-disabled={!isClickable}
              >
                {index + 1}
              </button>
              <span
                className={[
                  styles.label,
                  isActive || isCompleted ? styles.labelActive : "",
                  !isClickable ? styles.labelDisabled : "",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={[
                  styles.connector,
                  isCompleted ? styles.connectorCompleted : "",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
