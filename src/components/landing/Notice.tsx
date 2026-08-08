// import { NotificationOutlined } from "@ant-design/icons";
// import styles from "@/styles/Notice.module.scss";

// const NOTICES = [
//   "New: Candidates whose present institution is outside Assam can now select \u201COthers\u201D from the district dropdown.",
//   "New: Eligible candidates can now edit their submitted application details using the Edit Application option.",
// ];

// const NoticeMarquee = () => {
//   return (
//     <section
//       className={styles.marquee}
//       aria-label="Important notices"
//       role="region"
//     >
//       <span className={styles.badge}>
//         <NotificationOutlined className={styles.badgeIcon} />
//         Notice
//       </span>

//       <div className={styles.viewport}>
//         {/* NOTICES rendered twice back-to-back — the keyframe animates
//             translateX(0) to translateX(-50%), so by the time the first
//             copy has fully scrolled off, the second copy is exactly where
//             the first one started, giving a seamless, gap-free loop. */}
//         <div className={styles.track}>
//           {[...NOTICES, ...NOTICES].map((notice, index) => (
//             <span className={styles.item} key={index}>
//               {notice}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NoticeMarquee;

import styles from "@/styles/Notice.module.scss";
import { NotificationOutlined } from "@ant-design/icons";

const NOTICES = [
  {
    label: "New",
    text: "Candidates whose present institution is outside Assam can select the \u201COthers\u201D option",
  },
  {
    label: "New",
    text: "The Edit Application option is now available for eligible applicants",
  },
];

const NoticeMarquee = () => {
  return (
    <section
      className={styles.marquee}
      aria-label="Important notices"
      role="region"
    >
      <span className={styles.badge}>
        <NotificationOutlined className={styles.badgeIcon} />
        Notice
      </span>

      <div className={styles.viewport}>
        {/* NOTICES rendered twice back-to-back — the keyframe animates
            translateX(0) to translateX(-50%), so by the time the first
            copy has fully scrolled off, the second copy is exactly where
            the first one started, giving a seamless, gap-free loop. */}
        <div className={styles.track}>
          {[...NOTICES, ...NOTICES].map((notice, index) => (
            <span className={styles.item} key={index}>
              <span className={styles.itemLabel}>{notice.label}:</span>{" "}
              {notice.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeMarquee;
