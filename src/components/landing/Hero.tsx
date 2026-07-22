import styles from "@/styles/Hero.module.scss";
import { ArrowRightOutlined, DownloadOutlined } from "@ant-design/icons";
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

        {/* NEW: buttonGroup wraps both CTAs so they sit side-by-side on
            desktop and stack cleanly on mobile via the SCSS media query. */}
        <div className={styles.buttonGroup}>
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

          {/* NEW: plain <a> (not next/link) since this is a static file
              download, not an app route. GuidelinesPdf is the imported
              module reference (same pattern as Banner/Logo elsewhere),
              which Next resolves to the actual built asset URL at build
              time. `download` forces a save rather than navigating;
              target="_blank" + rel is a safety fallback for browsers/
              mobile that ignore the download attribute for PDFs. */}
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
