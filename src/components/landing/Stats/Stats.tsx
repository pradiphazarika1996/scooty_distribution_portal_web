"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Building2, Users, FileCheck } from "lucide-react";
import type { IStatItem } from "@/types/landing/landing";
import styles from "./Stats.module.scss";

// ── Animated Counter Hook ──
function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;

    const step = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
      } else {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, shouldStart]);

  return count;
}

// ── Individual Stat Card ──
function StatCard({ stat, isVisible }: { stat: IStatItem; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  const formattedCount =
    stat.value >= 1000
      ? count.toLocaleString("en-IN")
      : count.toString();

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{stat.icon}</div>
      <div className={styles.info}>
        <span className={styles.value}>
          {formattedCount}
          {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
        </span>
        <span className={styles.label}>{stat.label}</span>
      </div>
    </div>
  );
}

// ── Static data (replace with API response later) ──
// e.g., const { data: stats } = useSWR("/api/stats", fetcher);
const stats: IStatItem[] = [
  {
    icon: <MapPin size={20} strokeWidth={2.5} />,
    value: 11,
    label: "Districts Covered",
  },
  {
    icon: <Building2 size={20} strokeWidth={2.5} />,
    value: 40,
    label: "MAC Constituencies",
  },
  {
    icon: <Users size={20} strokeWidth={2.5} />,
    value: 1575,
    label: "Villages Mapped",
  },
  {
    icon: <FileCheck size={20} strokeWidth={2.5} />,
    value: 7000,
    suffix: "+",
    label: "Applications Supported",
  },
];

// ── Main Component ──
export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}