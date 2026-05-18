import Link from "next/link";
import styles from "./CTABanner.module.scss";

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bannerOuter}>
        <div className={styles.banner}>
          {/* Pattern overlay */}
          <div className={styles.pattern} />
          <div className={styles.overlay} />

          <div className={styles.inner}>
            <div className={styles.content}>
              <h2 className={styles.heading}>
                Ready to apply for your scholarship?
              </h2>
              <p className={styles.desc}>
                Join thousands of students from across the Mising Autonomous
                Council area who are continuing their education with MAC&apos;s
                support.
              </p>
            </div>

            <div className={styles.actions}>
              <Link
                href="/auth/student/register"
                className={styles.registerBtn}
              >
                Register Now
              </Link>
              <Link href="/auth/student/login" className={styles.loginBtn}>
                Already registered? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
