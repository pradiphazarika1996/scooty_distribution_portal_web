"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const navLinks = [
  { label: "Home", href: "/landing" },
  { label: "Schemes", href: "/landing/schemes" },
  { label: "How to Apply", href: "/landing/guide" },
  { label: "Contact", href: "/landing/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = useCallback(() => setMenuOpen(false), []);

  const isActive = (href: string) =>
    href === "/landing" && pathname === "/landing";

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/landing" className={styles.logo} onClick={close}>
          <Image
            src="/images/m-logo.png"
            alt="MAC Logo"
            width={200}
            height={200}
            className={styles.logoImg}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>MAC Scholarship Portal</span>
            <span className={styles.logoSub}>
              Mising Autonomous Council · Gogamukh, Assam
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className={styles.authBtns}>
          <Link href="/student/login" className={styles.loginBtn}>Login</Link>
          <Link href="/student/register" className={styles.applyBtn}>Apply Now</Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.visible : ""}`}
        onClick={close}
      />

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ""}`}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileAuth}>
          <Link href="/student/login" className={styles.mobileLogin} onClick={close}>Login</Link>
          <Link href="/student/register" className={styles.mobileApply} onClick={close}>Apply Now</Link>
        </div>
      </div>
    </header>
  );
}