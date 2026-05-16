import React from "react";
import styles from "./StatCards.module.scss";
import type { ColorVariant, StatCardItem } from "./StatCards.types";

// ─── Props ───────────────────────────────────────────────

interface StatCardsProps {
  cards: StatCardItem[];
}

// ─── Variant → SCSS class map ─────────────────────────────

const variantClassMap: Record<ColorVariant, string> = {
  primary: styles.primary,
  success: styles.success,
  error: styles.error,
  tertiary: styles.tertiary,
};

// ─── Component ───────────────────────────────────────────

const StatCards: React.FC<StatCardsProps> = ({ cards }) => {
  return (
    <div className={styles.statsGrid}>
      {cards.map((card) => (
        <div key={card.label} className={styles.statCard}>
          <div className={styles.cardContent}>
            <div className={styles.cardLeft}>
              <span className={styles.cardLabel}>{card.label}</span>
              <span className={styles.cardValue}>
                {typeof card.value === "number"
                  ? card.value.toLocaleString()
                  : card.value}
              </span>
              <span
                className={`${styles.cardSubtitle} ${
                  card.accentSubtitle ? styles.subtitleAccent : ""
                }`}
              >
                {card.subtitle}
              </span>
            </div>

            <div
              className={`${styles.iconWrapper} ${variantClassMap[card.variant]}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
