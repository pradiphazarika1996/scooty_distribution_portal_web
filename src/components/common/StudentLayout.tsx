// "use client";

// import logo from "@/assets/images/MAC logo.png";
// import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
// import { BreadcrumbProvider } from "@/components/common/Breadcrumb/BreadcrumbContext";
// import styles from "@/styles/MainLayout.module.scss";
// // import { useLogoutMutation } from "@/redux/apis/authApi";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { Button, Layout, Typography } from "antd";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import SideMenu from "./SideMenu";

// const { Header, Content, Sider } = Layout;
// const { Text } = Typography;

// interface MainLayoutProps {
//   children: React.ReactNode;
//   account?: any;
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children, account }) => {
//   const router = useRouter();
//   // const [logout] = useLogoutMutation();

//   const [collapsed, setCollapsed] = useState(true);

//   // const handleLogout = async () => {
//   //   try {
//   //     await logout({}).unwrap();
//   //     router.replace("/");
//   //   } catch (error) {
//   //     console.error("Logout failed:", error);
//   //   }
//   // };

//   return (
//     <Layout className={styles.layoutContainer}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         className={styles.sider}
//         width={240}
//         collapsedWidth={80}
//       >
//         <div className={styles.siderHeader}>
//           {!collapsed && (
//             <div className={styles.brandLogo}>
//               <Image
//                 src={logo}
//                 alt="Good-Air"
//                 height={30}
//                 width={150}
//                 style={{ height: "30px", width: "auto", objectFit: "contain" }}
//                 priority
//               />
//             </div>
//           )}
//           <Button
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             className={styles.toggleButton}
//           />
//         </div>
//         <div className={styles.menuContainer}>
//           <SideMenu collapsed={collapsed} />
//         </div>
//       </Sider>

//       <Layout className={styles.rightLayout}>
//         <Header className={styles.header}>
//           <div className={styles.headerContent}>
//             <div className={styles.headerActions}>
//               {/* <UserMenu name={account?.name ?? ""} onLogout={handleLogout} /> */}
//               PMSSSS
//             </div>
//           </div>
//         </Header>

//         <Content className={styles.content}>
//           <div className={styles.contentInner}>
//             <BreadcrumbProvider>
//               <Breadcrumb />
//               {children}
//             </BreadcrumbProvider>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;

"use client";

import logo from "@/assets/images/MAC logo.png";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { BreadcrumbProvider } from "@/components/common/Breadcrumb/BreadcrumbContext";
import {
  DEFAULT_ROUTE_TITLE,
  ROUTE_TITLES,
  type RouteTitle,
} from "@/config/routesTitles";
import styles from "@/styles/MainLayout.module.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SideMenu from "./StudentSideMenu";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  account?: any;
  onSearch?: (value: string) => void;
  onExport?: () => void;
}

// ─── Resolve the best-matching title for a given pathname ─────────────────────
// Tries an exact match first, then walks up path segments for nested routes.
// e.g. "/applications/123/review" → "/applications" → { title: "Applications" }
function resolveRouteTitle(pathname: string): RouteTitle {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

  const segments = pathname.split("/").filter(Boolean);
  for (let i = segments.length - 1; i > 0; i--) {
    const prefix = "/" + segments.slice(0, i).join("/");
    if (ROUTE_TITLES[prefix]) return ROUTE_TITLES[prefix];
  }

  return DEFAULT_ROUTE_TITLE;
}

// ─────────────────────────────────────────────────────────────────────────────

const StudentLayout: React.FC<MainLayoutProps> = ({
  children,
  account,
  onSearch,
  onExport,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const { title } = resolveRouteTitle(pathname);
  const subtitle = account?.name
    ? `Welcome back, ${account.name}${account.council ? ` — ${account.council}` : ""}`
    : undefined;

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
        </div>
        <div className={styles.menuContainer}>
          <SideMenu collapsed={collapsed} />
        </div>
      </Sider>

      <Layout className={styles.rightLayout}>
        <Header className={styles.header}>
          <div className={styles.headerContent}>
            {/* ── Left: toggle + dynamic page title ── */}
            <div className={styles.headerLeft}>
              <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={styles.toggleButton}
              />
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

export default StudentLayout;
