import { IScheme } from "@/types/landing/landing";
import { CheckCircle2, GraduationCap } from "lucide-react";
import Link from "next/link";
import styles from "../../../styles/scheme.module.scss";

// ── Static data (replace with API: GET /api/scholarships) ──
const schemes: IScheme[] = [
  {
    id: "hslc",
    icon: <GraduationCap size={22} strokeWidth={2} />,
    title: "HSLC (Class 10)",
    description:
      "High School Leaving Certificate — financial assistance for students who passed Class 10 examination and are continuing further studies.",
    eligibility: [
      { text: "Passed HSLC examination" },
      { text: "Resident of MAC area or Mising community outside MAC" },
      { text: "Family income within prescribed limit" },
    ],
    applyLink: "/auth/student/login",
  },
  {
    id: "hs",
    icon: <GraduationCap size={22} strokeWidth={2} />,
    title: "HS (Class 12)",
    description:
      "Higher Secondary — support for students who passed Class 12 examination pursuing graduation, diploma or professional courses.",
    eligibility: [
      { text: "Passed HS examination" },
      { text: "Admitted to a recognised institution" },
      { text: "Minimum prescribed percentage" },
    ],
    applyLink: "/auth/student/login",
  },
  // {
  //   id: "merit-cum-means",
  //   icon: <Award size={24} strokeWidth={2} />,
  //   title: "Merit-cum-Means Assistance",
  //   description:
  //     "Additional assistance for students from economically weaker sections who have demonstrated academic merit.",
  //   eligibility: [
  //     { text: "Family income certificate" },
  //     { text: "Caste certificate" },
  //     { text: "Marksheet of qualifying examination" },
  //   ],
  //   applyLink: "/auth/student/login",
  // },
];

export default function SchemesPage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>SCHEMES</span>
          <h1 className={styles.heroTitle}>
            MAC Scholarship & Financial Assistance
          </h1>
          <p className={styles.heroSubtitle}>
            The Mising Autonomous Council proudly supports meritorious and
            economically weaker students residing under the MAC notified village
            area, as well as Mising students outside of MAC area through its
            “Tabu Taíd Shiksha Jyoti” scheme.
            <br />
            Applicant should be from Notified villages of Mising Autonomous
            Council or Any eligible applicant belonging to Mising Community
            residing out of MAC area can avail this Scholarship.
          </p>
        </div>
      </section>

      {/* ── Scheme Cards ── */}
      <section className={styles.schemesSection}>
        <div className={styles.grid}>
          {schemes.map((scheme) => (
            <div key={scheme.id} className={styles.card}>
              <div className={styles.cardIconRow}>
                <div className={styles.cardIcon}>{scheme.icon}</div>
                <span className={styles.cardIconLabel}>MAC SCHOLARSHIP</span>
              </div>
              <h2 className={styles.cardTitle}>{scheme.title}</h2>
              <p className={styles.cardDesc}>{scheme.description}</p>

              <ul className={styles.eligibilityList}>
                {scheme.eligibility.map((item, i) => (
                  <li key={i} className={styles.eligibilityItem}>
                    <CheckCircle2
                      size={16}
                      strokeWidth={2}
                      className={styles.checkIcon}
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link href={scheme.applyLink} className={styles.applyBtn}>
                Apply for this Scheme
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
