import { Typography } from "antd";
import { ReactNode } from "react";
import styles from "./FormSection.module.scss";

const { Title } = Typography;

interface FormSectionProps {
  title: string;
  extra?: ReactNode;
  children: ReactNode;
}

const FormSection = ({ title, extra, children }: FormSectionProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
        {extra}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default FormSection;
