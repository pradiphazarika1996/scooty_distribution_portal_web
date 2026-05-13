import Link from "next/link";
import styles from "./ApplicationJourney.module.scss";

const steps = [
  {
    step: "01",
    title: "Register",
    description:
      "Sign up with your mobile number and verify via WhatsApp OTP.",
  },
  {
    step: "02",
    title: "Fill Application",
    description:
      "Enter personal, academic, address and bank details. Save as draft anytime.",
  },
  {
    step: "03",
    title: "Upload Documents",
    description:
      "Attach Aadhaar / ID, marksheet, caste certificate and bank passbook.",
  },
  {
    step: "04",
    title: "Submit & Track",
    description:
      "Submit and download digital acknowledgement. Track status until approval.",
  },
];

export default function ApplicationJourney() {
  return (
    <section className={styles.section} id="how-to-apply">
      <div className={styles.container}>
        {/* ── Header Row ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tag}>APPLY IN 4 STEPS</span>
            <h2 className={styles.heading}>
              A simple, guided application journey
            </h2>
          </div>
          <Link href="/landing/guide" className={styles.guideLink}>
            View detailed guide
            <span className={styles.arrow}>→</span>
          </Link>
        </div>

        {/* ── Step Cards ── */}
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.step} className={styles.card}>
              <span className={styles.stepNum}>{step.step}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}