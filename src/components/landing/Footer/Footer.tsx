import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const quickLinks = [
  { label: "Scholarship Schemes", href: "/schemes" },
  { label: "How to Apply", href: "/guide" },
  { label: "Track Application", href: "/auth/student/login" },
  { label: "Contact & Helpdesk", href: "/contact" },
];

const contacts = [
  {
    icon: <MapPin size={16} strokeWidth={2} />,
    text: "MAC Headquarters, Gogamukh, Dhemaji, Assam – 787034",
  },
  {
    icon: <Phone size={16} strokeWidth={2} />,
    text: "+91 03753 200 000",
  },
  {
    icon: <Mail size={16} strokeWidth={2} />,
    text: "scholarship@mac.assam.gov.in",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      {/* Gold top accent line */}
      <div className={styles.topAccent} />

      <div className={styles.container}>
        {/* About */}
        <div className={styles.aboutCol}>
          <h3 className={styles.aboutTitle}>Mising Autonomous Council</h3>
          <p className={styles.aboutText}>
            Empowering meritorious students of the Mising community through
            transparent, accessible scholarship and financial assistance
            schemes.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>QUICK LINKS</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Office */}
        <div className={styles.officeCol}>
          <h4 className={styles.colTitle}>OFFICE</h4>
          <ul className={styles.contactList}>
            {contacts.map((item) => (
              <li key={item.text} className={styles.contactItem}>
                <span className={styles.contactIcon}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© 2026 Mising Autonomous Council. All rights reserved.</span>
          <span className={styles.initiative}>
            An initiative for the educational upliftment of the Mising
            community.
          </span>
        </div>
      </div>
    </footer>
  );
}
