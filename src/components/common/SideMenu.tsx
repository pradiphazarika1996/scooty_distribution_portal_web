"use client";

import { ROUTES } from "@/utils/status";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BlockOutlined,
  ClusterOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideMenuProps {
  collapsed: boolean;
}

const menuItems: MenuProps["items"] = [
  {
    key: ROUTES.DASHBOARD,
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: ROUTES.APPLICATIONS,
    icon: <FileTextOutlined />,
    label: "Applications",
  },

  {
    key: ROUTES.PROFILE,
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: ROUTES.MY_APPLICATION,
    icon: <FileTextOutlined />,
    label: "My Application",
  },
  {
    key: ROUTES.MASTERS,
    icon: <AppstoreOutlined />,
    label: "Masters",
    children: [
      {
        key: ROUTES.DISTRICTS,
        icon: <GlobalOutlined />,
        label: "Districts",
      },
      {
        key: ROUTES.CONSTITUENCIES,
        icon: <ApartmentOutlined />,
        label: "Constituencies",
      },
      {
        key: ROUTES.PANCHAYATS,
        icon: <BlockOutlined />,
        label: "Panchayats",
      },
      {
        key: ROUTES.VILLAGES,
        icon: <ClusterOutlined />,
        label: "Villages",
      },
    ],
  },
];

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  // const handleClick: MenuProps["onClick"] = ({ key }) => {
  //   router.push(key);
  // };
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case ROUTES.DASHBOARD:
        router.push("/admin/dashboard");
        break;
      case ROUTES.APPLICATIONS:
        router.push("/admin/applications");
        break;
      case ROUTES.PROFILE:
        router.push("/student/profile");
        break;
      case ROUTES.MY_APPLICATION:
        router.push("/student/application");
        break;
      case ROUTES.MASTERS:
        router.push("/admin/masters");
        break;
      case ROUTES.DISTRICTS:
        router.push("/admin/masters/districts");
        break;
      case ROUTES.CONSTITUENCIES:
        router.push("/admin/masters/constituencies");
        break;
      case ROUTES.PANCHAYATS:
        router.push("/admin/masters/panchayats");
        break;
      case ROUTES.VILLAGES:
        router.push("/admin/masters/villages");
        break;

      default:
        router.push(e.key);
    }
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={menuItems}
      onClick={handleMenuClick}
      inlineCollapsed={collapsed}
    />
  );
};

export default SideMenu;
