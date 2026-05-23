"use client";

// import SmallLogo from "@/assets/images/logo.png";
// import logo from "@/assets/images/MAC logo.png";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { BreadcrumbProvider } from "@/components/common/Breadcrumb/BreadcrumbContext";
import styles from "@/styles/StudentLayout.module.scss";
import { getImageUrl } from "@/utils/imageUrls";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Image from "next/image";
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
            <span
              className={`${styles.siderHeader} ${styles.siderHeaderCollapsed}`}
            >
              <Image
                src={getImageUrl("logo.png")}
                alt="MAC Logo"
                width={45}
                height={45}
                style={{ height: "45px", width: "auto", objectFit: "contain" }}
                priority
              />
            </span>
          ) : (
            <div className={styles.brandLogo}>
              <Image
                src={getImageUrl("MAC logo.png")}
                alt="MAC Logo"
                width={220}
                height={100}
                style={{ height: "auto", width: "100%", objectFit: "contain" }}
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

            {/* Mobile: logo (visible only ≤768px) */}
            <div className={styles.mobileLogoWrapper}>
              <Image
                src={getImageUrl("logo.png")}
                alt="MAC Logo"
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

      {/* ── Mobile Bottom Nav (hidden on desktop) ── */}
      <BottomNav />
    </Layout>
  );
};

export default StudentLayout;
