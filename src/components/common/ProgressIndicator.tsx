import styles from "@/app/styles/ProgressIndicator.module.scss";
import { Steps } from "antd";

export interface Step {
  key: string;
  label: string;
  step: number;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  percent?: number;
  size?: "default" | "small";
}

const ProgressIndicator = ({
  steps,
  currentStep,
  onStepClick,
  percent,
  size = "small",
}: StepProgressProps) => {
  const items = steps.map((step) => ({
    title: step.label,
    onClick: () => onStepClick(step.step),
    className: styles.clickableStep,
  }));

  return (
    <Steps
      current={currentStep - 1}
      percent={percent}
      size={size}
      direction="horizontal"
      labelPlacement="vertical"
      items={items}
      style={{ marginBottom: "50px" }}
    />
  );
};

export default ProgressIndicator;
