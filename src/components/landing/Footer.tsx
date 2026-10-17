import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} Government of Assam, Directorate of
          Higher Education. All rights reserved.
        </span>

        <div className={styles.poweredBy}>
          {/* <span className={styles.poweredLabel}>Developed by</span> */}
          <span className={styles.companyName}>
            Developed by Gratia Technology Pvt. Ltd.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
