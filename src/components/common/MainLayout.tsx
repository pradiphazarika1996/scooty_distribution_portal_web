"use client";

import logo from "@/assets/images/MAC logo.png";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { BreadcrumbProvider } from "@/components/common/Breadcrumb/BreadcrumbContext";
import styles from "@/styles/MainLayout.module.scss";
// import { useLogoutMutation } from "@/redux/apis/authApi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SideMenu from "./SideMenu";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
  account?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, account }) => {
  const router = useRouter();
  // const [logout] = useLogoutMutation();

  const [collapsed, setCollapsed] = useState(true);

  // const handleLogout = async () => {
  //   try {
  //     await logout({}).unwrap();
  //     router.replace("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  return (
    <Layout className={styles.layoutContainer}>
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
          {!collapsed && (
            <div className={styles.brandLogo}>
              <Image
                src={logo}
                alt="Good-Air"
                height={30}
                width={150}
                style={{ height: "30px", width: "auto", objectFit: "contain" }}
                priority
              />
            </div>
          )}
          <Button
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.toggleButton}
          />
        </div>
        <div className={styles.menuContainer}>
          <SideMenu collapsed={collapsed} />
        </div>
      </Sider>

      <Layout className={styles.rightLayout}>
        <Header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerActions}>
              {/* <UserMenu name={account?.name ?? ""} onLogout={handleLogout} /> */}
            </div>
          </div>
        </Header>

        <Content className={styles.content}>
          <div className={styles.contentInner}>
            <BreadcrumbProvider>
              <Breadcrumb />
              {children}
            </BreadcrumbProvider>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
