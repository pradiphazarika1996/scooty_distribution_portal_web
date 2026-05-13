import styles from "@/styles/ScholarshipForm.module.css";
import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <section className={styles.sectionCard}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.formGrid}>{children}</div>
    </section>
  );
};

export default FormSection;
