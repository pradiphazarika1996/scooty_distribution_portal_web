"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { IContactFormData } from "@/types/landing/landing";
import styles from "../../../styles/contact.module.scss";


const contactInfo = [
  {
    icon: <MapPin size={20} strokeWidth={2} />,
    title: "Office Address",
    text: "Mising Autonomous Council, Headquarters, Gogamukh, Dhemaji, Assam – 787034",
  },
  {
    icon: <Phone size={20} strokeWidth={2} />,
    title: "Helpline",
    text: "+91 03753 200 000 · +91 98640 00000 (WhatsApp)",
  },
  {
    icon: <Mail size={20} strokeWidth={2} />,
    title: "Email",
    text: "scholarship@mac.assam.gov.in",
  },
  {
    icon: <Clock size={20} strokeWidth={2} />,
    title: "Working Hours",
    text: "Monday – Saturday, 10:00 AM – 5:00 PM",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<IContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.message) return;

    setSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setForm({ fullName: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.tag}>CONTACT</span>
            <h1 className={styles.heroTitle}>
              Talk to the MAC Scholarship Helpdesk
            </h1>
            <p className={styles.heroSubtitle}>
              For queries on registration, document upload, application status or
              disbursal — reach
              <br />
              out to us.
            </p>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            {/* Left - Info Cards */}
            <div className={styles.infoCol}>
              {contactInfo.map((item) => (
                <div key={item.title} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div className={styles.infoText}>
                    <h3 className={styles.infoTitle}>{item.title}</h3>
                    <p className={styles.infoDesc}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Contact Form */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a message</h2>

              {submitted ? (
                <div className={styles.successMsg}>
                  <p>Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Mobile number"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className={styles.textarea}
                      placeholder="Describe your query..."
                      rows={5}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={styles.submitBtn}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
    </>
  );
}