"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background pattern overlay */}
      <div className={styles.bgPattern} />
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        {/* ── Left Content ── */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✦</span>
            Academic Session 2025-26 · Now Open
          </div>

          <h1 className={styles.heading}>
            A scholarship
            <br />
            portal for every
            <br />
            <span className={styles.highlight}>Mising</span> student.
          </h1>

          <p className={styles.description}>
            The official online platform of the Mising Autonomous Council to
            apply for scholarships and financial assistance after Matriculation
            and Higher Secondary — within and outside the MAC Council area.
          </p>

          <div className={styles.ctas}>
            <Link href="/student/register" className={styles.ctaPrimary}>
              Start Application
              <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/landing#how-to-apply" className={styles.ctaSecondary}>
              How it Works
            </Link>
          </div>

          <p className={styles.note}>
            For students of HSLC / HS classes residing within and outside MAC Council area.
          </p>
        </div>

        {/* ── Right Images ── */}
        <div className={styles.imageSection}>
          
          <div className={styles.heroImageWrapper}>
                <Image
                    src="/images/hero-image.png"
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4841D" strokeWidth="2" strokeLinecap="round">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 7h6M9 11h6M9 15h4" />
              </svg>
            </div>
            <div className={styles.receiptText}>
              <span className={styles.receiptLabel}>Receipt sent via</span>
              <span className={styles.receiptValue}>WhatsApp + Email</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}