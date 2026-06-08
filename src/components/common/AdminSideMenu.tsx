"use client";

import { ROUTES } from "@/utils/status";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  ClusterOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GlobalOutlined,
  TeamOutlined,
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
    key: ROUTES.CONTACT,
    icon: <FileTextOutlined />,
    label: "Contact Queries",
  },
  // {
  //   key: ROUTES.MASTERS,
  //   icon: <AppstoreOutlined />,
  //   label: "Masters",
  //   children: [
  //     {
  //       key: ROUTES.DISTRICTS,
  //       icon: <GlobalOutlined />,
  //       label: "Districts",
  //     },
  //     {
  //       key: ROUTES.CONSTITUENCIES,
  //       icon: <ApartmentOutlined />,
  //       label: "Constituencies",
  //     },
  //     {
  //       key: ROUTES.VILLAGES,
  //       icon: <ClusterOutlined />,
  //       label: "Villages",
  //     },
  //   ],
  // },
  {
    key: ROUTES.ADMIN,
    icon: <TeamOutlined />,
    label: "Users",
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
      case ROUTES.ADMIN:
        router.push("/admin/dashboard/user");
        break;
      case ROUTES.APPLICATIONS:
        router.push("/admin/applications");
        break;
      // case ROUTES.MASTERS:
      //   router.push("/admin/masters");
      //   break;
      // case ROUTES.DISTRICTS:
      //   router.push("/admin/masters/districts");
      //   break;
      // case ROUTES.CONSTITUENCIES:
      //   router.push("/admin/masters/constituencies");
      //   break;
      // case ROUTES.VILLAGES:
      //   router.push("/admin/masters/villages");
      //   break;
      case ROUTES.CONTACT:
        router.push("/admin/contact");
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
