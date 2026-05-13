import styles from "@/styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brandSection}>
          <h3 className={styles.brandTitle}>Scholarship Portal</h3>
          <p className={styles.brandDescription}>
            Connecting talented students with funding opportunities for a
            brighter academic future.
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Scholarship Management System. All
            rights reserved.
          </p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/faq">Student FAQ</Link>
              </li>
              <li>
                <Link href="/institution">Institution Portal</Link>
              </li>
              <li>
                <Link href="/support">Contact Support</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
