"use client";

import {
  ClipboardList,
  ShieldCheck,
  FileUp,
  MessageCircle,
  MapPinned,
  Activity,
} from "lucide-react";
import type { IFeatureCard } from "@/types/landing/landing";
import styles from "./FeatureCard.module.scss";

// ── Static data (replace with API response later) ──
// e.g., const { data: features } = useSWR("/api/features", fetcher);
const features: IFeatureCard[] = [
  {
    icon: <ClipboardList size={22} strokeWidth={1.8} />,
    title: "Online Application",
    description:
      "Apply for scholarship after Matriculation or Higher Secondary in just a few steps.",
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.8} />,
    title: "Secure WhatsApp OTP",
    description:
      "Registration and login secured by mobile verification through WhatsApp OTP.",
  },
  {
    icon: <FileUp size={22} strokeWidth={1.8} />,
    title: "Digital Document Upload",
    description:
      "Upload Aadhaar, marksheets, caste certificate and bank passbook in PDF or JPG.",
  },
  {
    icon: <MessageCircle size={22} strokeWidth={1.8} />,
    title: "WhatsApp Acknowledgement",
    description:
      "Receive acknowledgement receipt with unique reference number on your WhatsApp.",
  },
  {
    icon: <MapPinned size={22} strokeWidth={1.8} />,
    title: "Geographic Mapping",
    description:
      "Smart District → Constituency → Panchayat → Village mapping across MAC areas.",
  },
  {
    icon: <Activity size={22} strokeWidth={1.8} />,
    title: "Real-time Tracking",
    description:
      "Track scrutiny, verification and approval status of your application live.",
  },
];

export default function WhyThisPortal() {
  return (
    <section className={styles.section} id="schemes">
      <div className={styles.container}>
        {/* ── Section Header ── */}
        <div className={styles.header}>
          <span className={styles.tag}>WHY THIS PORTAL</span>
          <h2 className={styles.heading}>
            Built to make scholarships simple,
            <br />
            transparent and accessible.
          </h2>
          <p className={styles.desc}>
            The portal is designed to digitize the application process with
            transparent verification and approval in fostering faster
            scholarship disbursement to eligible students.
          </p>
        </div>

        {/* ── Feature Cards Grid ── */}
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
