import styles from "@/styles/Hero.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

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
        <div className={styles.buttonGroup}>
          <a
            href="/images/notice.pdf"
            target="_blank"
            download
            rel="noopener noreferrer"
          >
            <Button
              type="primary"
              size="large"
              className={styles.ctaButton}
              icon={<DownloadOutlined />}
            >
              Important Notice
            </Button>
          </a>
          <a
            href="/images/extensiondate.pdf"
            target="_blank"
            download
            rel="noopener noreferrer"
          >
            <Button
              type="primary"
              size="large"
              className={styles.ctaButton}
              icon={<DownloadOutlined />}
            >
             Notice for Extension of Online Application
            </Button>
          </a>
          <a
            href="/images/guidelines.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              type="primary"
              size="large"
              className={styles.secondaryButton}
              icon={<DownloadOutlined />}
            >
              Guidelines for Dr. Banikanta Kakati Merit Award
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
