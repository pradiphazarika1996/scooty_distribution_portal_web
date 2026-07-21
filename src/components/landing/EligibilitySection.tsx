import { ELIGIBILITY_HIGHLIGHTS } from "@/components/content/landingContent";
import styles from "@/styles/Section.module.scss";
import { CheckCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const EligibilitySection = () => {
  return (
    <section id="eligibility" className={styles.section}>
      <div className={styles.inner}>
        <Title level={2} className={styles.sectionTitle}>
          Eligibility Criteria
        </Title>
        <Card className={styles.card}>
          <Row gutter={[24, 16]}>
            {ELIGIBILITY_HIGHLIGHTS.map((item) => (
              <Col xs={24} md={12} sm={6} key={item}>
                <div className={styles.listItem}>
                  <CheckCircleFilled className={styles.listIcon} />
                  <span>{item}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </section>
  );
};

export default EligibilitySection;
