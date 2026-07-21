import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomBar}>
        <span>
          &copy; {new Date().getFullYear()} Government of Assam, Directorate of
          Higher Education. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
