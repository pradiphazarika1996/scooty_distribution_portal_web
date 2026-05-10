"use client";

import styles from "@/styles/Breadcrumb.module.css";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useBreadcrumb } from "./BreadcrumbContext";

export default function Breadcrumb() {
  const { items } = useBreadcrumb();

  if (!items.length) return null;

  return (
    <nav className={styles.wrap} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <span key={i} className={styles.item}>
            {item.href && !isLast ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? styles.current : styles.link}>
                {item.label}
              </span>
            )}
            {!isLast && <RightOutlined className={styles.sep} />}
          </span>
        );
      })}
    </nav>
  );
}
