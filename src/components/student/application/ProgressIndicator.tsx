import styles from "@/styles/ScholarshipForm.module.css";
import type { Step } from "@/types/students/application";
import {
  BankOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  disabledSteps?: number[];
}

const STEP_ICONS: Record<string, React.ReactNode> = {
  "personal-details": <UserOutlined />,
  "academic-and-bank-details": <BankOutlined />,
  documents: <FileTextOutlined />,
  review: <CheckCircleOutlined />,
};

const ProgressIndicator: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
  disabledSteps = [],
}) => {
  return (
    <div className={styles.tabBar}>
      {steps.map((step) => {
        const isActive = step.step === currentStep;
        const isDisabled = disabledSteps.includes(step.step);

        return (
          <button
            key={step.key}
            className={`${styles.tab} ${isActive ? styles.tabActive : ""} ${
              isDisabled ? styles.tabDisabled : ""
            }`}
            onClick={() => !isDisabled && onStepClick(step.step)}
            disabled={isDisabled}
            type="button"
          >
            <span className={styles.tabIcon}>
              {STEP_ICONS[step.key] ?? <FileTextOutlined />}
            </span>
            <span className={styles.tabLabel}>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
