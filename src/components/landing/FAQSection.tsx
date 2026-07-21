import { Typography, Collapse } from "antd";
import { FAQS } from "@/components/content/landingContent";
import styles from "@/styles/Section.module.scss";

const { Title } = Typography;

const FAQSection = () => {
  return (
    <section id="faqs" className={`${styles.section} ${styles.altBg}`}>
      <div className={styles.inner}>
        <Title level={2} className={styles.sectionTitle}>
          Frequently Asked Questions
        </Title>
        <Collapse
          accordion
          items={FAQS.map((faq, index) => ({
            key: index,
            label: faq.question,
            children: <p>{faq.answer}</p>,
          }))}
        />
      </div>
    </section>
  );
};

export default FAQSection;
