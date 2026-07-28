import styles from "@/styles/ContactSection.module.scss";
import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <h3 className={styles.heading}>Need Help?</h3>
      <p className={styles.subheading}>
        Reach out to us through any of the channels below
      </p>

      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.iconWrapper}>
              <GlobalOutlined />
            </span>
            <span className={styles.label}>Official Website</span>
            <span className={styles.value}>
              Directorate of Higher Education, Assam
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrapper}>
              <PhoneOutlined />
            </span>
            <span className={styles.label}>Helpline No.</span>
            <span className={styles.value}>8638781760, 7002428505</span>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrapper}>
              <MailOutlined />
            </span>
            <span className={styles.label}>E-mail</span>
            <span className={styles.value}>
              <a
                href="mailto:bkkaward2026@gmail.com"
                className={styles.emailLink}
              >
                bkkaward2026@gmail.com
              </a>
            </span>
            <span className={styles.hint}>For any queries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
