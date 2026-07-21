"use client";

import styles from "@/styles/StudentLayout.module.scss";
import { ROUTES } from "@/utils/status";
import { FileTextOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NAV_ITEMS = [
  {
    key: ROUTES.MY_APPLICATION,
    path: "/student",
    icon: <FileTextOutlined />,
    label: "My Application",
  },
];

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className={styles.bottomNav}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`${styles.bottomNavItem} ${isActive(item.path) ? styles.bottomNavItemActive : ""}`}
          onClick={() => router.push(item.path)}
          type="button"
        >
          <span className={styles.bottomNavIcon}>{item.icon}</span>
          <span className={styles.bottomNavLabel}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
