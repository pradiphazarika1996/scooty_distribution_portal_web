import { Typography, Alert, List } from "antd";
import { IMPORTANT_INSTRUCTIONS } from "@/components/content/landingContent";
import styles from "@/styles/Section.module.scss";

const { Title } = Typography;

const InstructionsSection = () => {
  return (
    <section id="instructions" className={styles.section}>
      <div className={styles.inner}>
        <Title level={2} className={styles.sectionTitle}>
          Important Instructions
        </Title>
        <Alert
          type="warning"
          showIcon
          message="Please read carefully before applying"
          className={styles.instructionsAlert}
        />
        <List
          className={styles.instructionsList}
          dataSource={IMPORTANT_INSTRUCTIONS}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </section>
  );
};

export default InstructionsSection;
