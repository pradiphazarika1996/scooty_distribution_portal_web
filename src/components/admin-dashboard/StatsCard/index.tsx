import { Skeleton } from "antd";
import React from "react";
import styles from "./StatCards.module.scss";
import type { ColorVariant, StatCardItem } from "./StatCards.types";

// ─── Props ───────────────────────────────────────────────

interface StatCardsProps {
  cards: StatCardItem[];
  isLoading?: boolean;
}

// ─── Variant → SCSS class map ─────────────────────────────

const variantClassMap: Record<ColorVariant, string> = {
  primary: styles.primary,
  success: styles.success,
  error: styles.error,
  tertiary: styles.tertiary,
};

// ─── Component ───────────────────────────────────────────

const StatCards: React.FC<StatCardsProps> = ({ cards, isLoading = false }) => {
  return (
    <div className={styles.statsGrid}>
      {cards.map((card) => (
        <div key={card.label} className={styles.statCard}>
          <div className={styles.cardContent}>
            <div className={styles.cardLeft}>
              <span className={styles.cardLabel}>{card.label}</span>

              {isLoading ? (
                <Skeleton.Input active size="small" style={{ width: 80 }} />
              ) : (
                <span className={styles.cardValue}>
                  {typeof card.value === "number"
                    ? card.value.toLocaleString()
                    : card.value}
                </span>
              )}

              {isLoading ? (
                <Skeleton.Input active size="small" style={{ width: 120 }} />
              ) : (
                <span
                  className={`${styles.cardSubtitle} ${
                    card.accentSubtitle ? styles.subtitleAccent : ""
                  }`}
                >
                  {card.subtitle}
                </span>
              )}
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
