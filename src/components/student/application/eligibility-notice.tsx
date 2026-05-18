import styles from "@/styles/ApplicationPage.module.css";
import React from "react";

interface EligibilityNoticeProps {
  reason?: string;
  eligibleAfter?: string;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const EligibilityNotice: React.FC<EligibilityNoticeProps> = ({
  reason,
  eligibleAfter,
}) => {
  return (
    <div className={styles.noticeCardError}>
      <p className={styles.noticeText}>
        {reason ?? "You are not eligible to apply at this time."}
      </p>
      {eligibleAfter && (
        <p
          className={styles.noticeText}
          style={{ marginTop: "var(--space-md)" }}
        >
          You can apply for the next scholarship after{" "}
          <span className={styles.noticeDate}>{formatDate(eligibleAfter)}</span>
          .
        </p>
      )}
    </div>
  );
};

export default EligibilityNotice;
