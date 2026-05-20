import {
  ClipboardEdit,
  MessageCircle,
  Send,
  Upload,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import styles from "../../../styles/guide.module.scss";

const steps = [
  {
    step: 1,
    icon: <UserPlus size={22} strokeWidth={2} />,
    title: "Register with WhatsApp OTP",
    description:
      "Create your account using your mobile number. We will send a one-time password to your WhatsApp.",
  },
  {
    step: 2,
    icon: <ClipboardEdit size={22} strokeWidth={2} />,
    title: "Fill the Application Form",
    description:
      "Enter personal, academic, address (District → Constituency → Panchayat → Village) and bank details. Save as draft any time.",
  },
  {
    step: 3,
    icon: <Upload size={22} strokeWidth={2} />,
    title: "Upload Documents",
    description:
      "Upload Aadhaar / Voter ID / DL, HSLC or HS marksheet and pass certificate, caste certificate and bank passbook (PDF or JPG).",
  },
  {
    step: 4,
    icon: <Send size={22} strokeWidth={2} />,
    title: "Preview & Submit",
    description:
      "Review your application in preview mode and submit. You will receive a unique application reference number.",
  },
  {
    step: 5,
    icon: <MessageCircle size={22} strokeWidth={2} />,
    title: "Get Acknowledgement",
    description:
      "Download a PDF acknowledgement receipt and receive a copy on your registered WhatsApp number.",
  },
];

const documents = [
  "Aadhaar / PAN / Voter ID / Driving Licence",
  "HSLC or HS Marksheet & Pass Certificate",
  "Caste Certificate",
  "Bank Passbook (first page)",
  "Recent passport-size photograph",
];

export default function GuidePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>APPLICATION PROCESS</span>
          <h1 className={styles.heroTitle}>
            How to apply for a MAC scholarship
          </h1>
          <p className={styles.heroSubtitle}>
            Follow these simple steps to complete your scholarship application
            online and receive
            <br />
            your acknowledgement digitally.
          </p>
        </div>
      </section>

      {/* ── Steps Section ── */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsContainer}>
          {steps.map((step) => (
            <div key={step.step} className={styles.stepRow}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>STEP {step.step}</span>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Documents Section ── */}
        <div className={styles.docsContainer}>
          <div className={styles.docsCard}>
            <h3 className={styles.docsTitle}>Documents you will need</h3>
            <div className={styles.docsGrid}>
              {documents.map((doc) => (
                <div key={doc} className={styles.docItem}>
                  <span className={styles.docBullet}>•</span>
                  {doc}
                </div>
              ))}
            </div>
            <p className={styles.docsNote}>
              Accepted formats: PDF or JPG. Maximum size 2 MB per file.
            </p>
            <Link href="/auth/student/register" className={styles.ctaBtn}>
              Start your Application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
