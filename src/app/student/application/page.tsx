import ScholarshipApplicationForm from "@/components/student/application/form";
import styles from "@/styles/Page.module.css";

export default function ApplicationPage() {
  return (
    <main>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Scholarship Application</h1>
        <p className={styles.pageSubtitle}>
          Complete your application by filling in the details across three
          steps. Your progress is saved automatically.
        </p>
      </div>

      <ScholarshipApplicationForm />
    </main>
  );
}
