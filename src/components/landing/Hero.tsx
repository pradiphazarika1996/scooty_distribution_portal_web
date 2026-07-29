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

        {/* NEW: buttonGroup wraps both CTAs so they sit side-by-side on
            desktop and stack cleanly on mobile via the SCSS media query. */}
        <div className={styles.buttonGroup}>
          {/* CHANGED: was <Link href="/auth/student/register"><Button>...
              Now a plain <a> (not next/link, since this opens a static
              PDF file, not an app route) with target="_blank" so the
              Notice PDF opens in a new tab. Same Button component, same
              props (type, size, className, icon, iconPosition), same
              label — only the wrapping element and its destination
              changed. */}
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
