"use client";

import Logo from "@/assets/images/logo.png";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { BreadcrumbProvider } from "@/components/common/Breadcrumb/BreadcrumbContext";
import { useLogoutMutation } from "@/redux/apis/studentAuthApi";
import styles from "@/styles/StudentLayout.module.scss";
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import BottomNav from "./BottomNav";
import SideMenu from "./StudentSideMenu";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  account?: any;
}

const StudentLayout: React.FC<MainLayoutProps> = ({ children, account }) => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/auth/student/login");
    }
  };

  return (
    <Layout className={styles.layoutContainer}>
      {/* ── Desktop Sidebar (hidden on mobile via CSS) ── */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
        width={240}
        collapsedWidth={80}
      >
        <div className={styles.siderHeader}>
          {collapsed ? (
            // Collapsed state — untouched, exactly as before.
            <span
              className={`${styles.siderHeader} ${styles.siderHeaderCollapsed}`}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={45}
                height={45}
                style={{ height: "45px", width: "auto", objectFit: "contain" }}
                priority
              />
            </span>
          ) : (
            <div
              className={styles.brandLogo}
              style={{ transition: "opacity 0.2s ease" }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={140}
                height={64}
                style={{
                  height: "40px",
                  width: "auto",
                  maxWidth: "140px",
                  objectFit: "contain",
                  transition: "height 0.2s ease, max-width 0.2s ease",
                }}
                priority
              />
            </div>
          )}
        </div>
        <div className={styles.menuContainer}>
          <SideMenu collapsed={collapsed} />
        </div>
      </Sider>

      <Layout className={styles.rightLayout}>
        {/* ── Header ── */}
        <Header className={styles.header}>
          <div className={styles.headerContent}>
            {/* Desktop: sidebar toggle */}
            <div className={styles.headerLeft}>
              <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={styles.toggleButton}
              />
            </div>
            <Button
              className={styles.logoutBtn}
              icon={<LoginOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>

            {/* Mobile: logo (visible only ≤768px) */}
            <div className={styles.mobileLogoWrapper}>
              <Image
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </Header>

        {/* ── Content ── */}
        <Content className={styles.content}>
          <div className={styles.contentInner}>
            <BreadcrumbProvider>
              <Breadcrumb />
              {children}
            </BreadcrumbProvider>
          </div>
        </Content>
      </Layout>
      <BottomNav />
    </Layout>
  );
};

export default StudentLayout;
