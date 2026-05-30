"use client";

import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrls";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background pattern overlay */}
      <div className={styles.bgPattern}>
        <Image
          src={getImageUrl("mising-gamusa.png")}
          alt=""
          fill
          className={styles.bgPatternImg}
          aria-hidden="true"
        />
      </div>
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        {/* ── Left Content ── */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✦</span>
            REGISTRATION NOW OPEN FOR THE YEAR 2026
          </div>

          <h1 className={styles.heading}>
            Scholarship
            <br />
            Portal for Students of
            <br />
            <span className={styles.highlight}>Mising</span> Autonomous Council
            Area
          </h1>

          <p className={styles.description}>
            The Scholarship Management Portal for Mising Autonomous Council
            designed to support eligible students under MAC area and Mising
            students residing outside of it, passing HSLC and HS Examinations.
          </p>

          <div className={styles.ctas}>
            <Link href="/auth/student/register" className={styles.ctaPrimary}>
              Start Application
              <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/guide" className={styles.ctaSecondary}>
              How it Works
            </Link>
          </div>

          <p className={styles.note}>
            Applicable for students with 60% and above marks.
          </p>
        </div>

        {/* ── Right Images ── */}
        <div className={styles.imageSection}>
          <div className={styles.heroImageWrapper}>
            <Image
              src={getImageUrl("hero-image.png")}
              alt="MAC Scholarship Portal"
              width={900}
              height={700}
              className={styles.heroImage}
              priority
            />
          </div>

          {/* WhatsApp + PDF Receipt Badge */}
          <div className={styles.receiptBadge}>
            <div className={styles.receiptIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4841D"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 7h6M9 11h6M9 15h4" />
              </svg>
            </div>
            <div className={styles.receiptText}>
              <span className={styles.receiptLabel}>
                Acknowledgement sent via
              </span>
              <span className={styles.receiptValue}>WhatsApp + Email</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
