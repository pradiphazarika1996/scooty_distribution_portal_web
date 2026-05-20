import styles from "@/styles/Profile.module.css";
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const EmptyProfileState: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <SolutionOutlined style={{ fontSize: 40, color: "var(--primary)" }} />
      </div>
      <h2 className={styles.emptyTitle}>Complete your profile</h2>
      <p className={styles.emptyDesc}>
        Your profile gets created when you submit your first scholarship
        application. All personal and address details are saved here so you
        never have to fill them again.
      </p>
      <Button
        type="primary"
        size="large"
        className={styles.emptyBtn}
        onClick={() => router.push("/student/application")}
      >
        Start Application
      </Button>
    </div>
  );
};

export default EmptyProfileState;
