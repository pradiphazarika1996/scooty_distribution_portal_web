"use client";

import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrls";
import styles from "./Stats.module.scss";

export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={getImageUrl("tabu-taid.png")}
            alt="Tabu Taid"
            fill
            className={styles.image}
          />
        </div>

        {/* Right Content */}
        <div className={styles.content}>
          <span className={styles.badge}>ABOUT THE SCHEME</span>

          <h2 className={styles.heading}>
            Tabu Taid <br />
            Shiksha Jyoti Scheme
          </h2>

          <p className={styles.description}>
            The <strong>Tabu Taid Shiksha Jyoti Scheme</strong> is an
            educational support initiative introduced by the Mising Autonomous
            Council to encourage and assist meritorious students from the Mising
            community. Named in honor of renowned Mising educationist, linguist,
            and author Tabu Taid, the scheme aims to promote higher education,
            academic excellence, and equal learning opportunities for deserving
            students.
          </p>

          <p className={styles.description}>
            Through transparent scholarship assistance and digital
            accessibility, the initiative carries forward his vision of
            empowering future generations through education and social progress.
          </p>

          <div className={styles.bottomCard}>
            <h4>Vision of the Scheme</h4>
            <p>
              Empowering Mising students through accessible and transparent
              scholarship opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
