import Link from "next/link";
import { GraduationCap, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { IScheme } from "@/types/landing/landing";
import styles from "../../../styles/scheme.module.scss";

// ── Static data (replace with API: GET /api/scholarships) ──
const schemes: IScheme[] = [
  {
    id: "post-matric",
    icon: <GraduationCap size={24} strokeWidth={2} />,
    title: "Post-Matriculation Scholarship",
    description:
      "Financial assistance for students who have passed HSLC and are continuing studies in Higher Secondary, ITI or equivalent.",
    eligibility: [
      { text: "Passed HSLC examination" },
      { text: "Resident of MAC area or Mising community outside MAC" },
      { text: "Family income within prescribed limit" },
    ],
    applyLink: "/student/register",
  },
  {
    id: "higher-secondary",
    icon: <BookOpen size={24} strokeWidth={2} />,
    title: "Higher Secondary Scholarship",
    description:
      "Support for meritorious students after passing Higher Secondary (HS) pursuing graduation, diploma or professional courses.",
    eligibility: [
      { text: "Passed HS examination" },
      { text: "Admitted to a recognised institution" },
      { text: "Minimum prescribed percentage" },
    ],
    applyLink: "/student/register",
  },
  {
    id: "merit-cum-means",
    icon: <Award size={24} strokeWidth={2} />,
    title: "Merit-cum-Means Assistance",
    description:
      "Additional assistance for students from economically weaker sections who have demonstrated academic merit.",
    eligibility: [
      { text: "Family income certificate" },
      { text: "Caste certificate" },
      { text: "Marksheet of qualifying examination" },
    ],
    applyLink: "/student/register",
  },
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
            Applicant should be from Notified
            villages of Mising Autonomous Council or Any eligible applicant
            belonging to Mising Community residing out of MAC area can avail
            this Scholarship.
          </p>
        </div>
      </section>

      {/* ── Scheme Cards ── */}
      <section className={styles.schemesSection}>
        <div className={styles.grid}>
          {schemes.map((scheme) => (
            <div key={scheme.id} className={styles.card}>
              <div className={styles.cardIcon}>{scheme.icon}</div>
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
