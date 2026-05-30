import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <span>
        📢 Applications for MAC Scholarship 2026 are open.{" "}
        <strong>Last date: 25 June 2026, 5:00 PM IST.</strong>
      </span>
    </div>
  );
}
