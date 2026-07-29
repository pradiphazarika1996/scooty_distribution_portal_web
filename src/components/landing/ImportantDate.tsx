import styles from "@/styles/ImportantDate.module.scss";
import { Typography } from "antd";

const { Title } = Typography;

const IMPORTANT_DATES = [
  {
    activity: "Opening of Online Application Portal",
    date: "29-07-2026 from 2:00 PM",
  },
  {
    activity: "Closing of Online Application Portal",
    date: "21-08-2026 till 6:00 PM",
  },
  {
    activity: "Publication of Provisional List of Eligible Applicants",
    date: "25-08-2026",
  },
  {
    activity: "Submission of Claims/Objections",
    date: "25-08-2026 to 30-08-2026",
  },
  {
    activity: "Publication of Final List of Beneficiaries",
    date: "10-09-2026",
  },
];

const ImportantDatesSection = () => {
  return (
    <section className={styles.section}>
      <Title level={2} className={styles.sectionTitle}>
        Important Dates
      </Title>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date &amp; Time</th>
            </tr>
          </thead>
          <tbody>
            {IMPORTANT_DATES.map((row) => (
              <tr key={row.activity}>
                <td data-label="Activity">{row.activity}</td>
                <td data-label="Date & Time">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ImportantDatesSection;
