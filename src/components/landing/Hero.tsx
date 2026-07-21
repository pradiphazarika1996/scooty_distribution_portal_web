import styles from "@/styles/Hero.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Title level={1} className={styles.title}>
          Dr. Banikanta Kakati Merit Award
        </Title>
        <Paragraph className={styles.subtitle}>
          An initiative of the Government of Assam, Higher Education Department,
          recognising meritorious Higher Secondary students for the Academic
          Year 2026-27. Apply online in a few simple steps.
        </Paragraph>
        <Link href="/auth/student/register">
          <Button
            type="primary"
            size="large"
            className={styles.ctaButton}
            icon={<ArrowRightOutlined />}
            iconPosition="end"
          >
            Apply Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
