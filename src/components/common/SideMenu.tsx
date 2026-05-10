"use client";
import { ROUTES } from "@/utils/status";
import { DashboardOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideMenuProps {
  collapsed?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    {
      key: ROUTES.PROFILE,
      icon: <DashboardOutlined />,
      label: "PROFILE",
    },
    {
      key: ROUTES.MY_APPLICATION,
      icon: <DashboardOutlined />,
      label: "MY APPLICATION",
    },
  ];

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case ROUTES.PROFILE:
        router.push("/profile");
        break;
      case ROUTES.MY_APPLICATION:
        router.push("/my-application");
        break;
      default:
        router.push(e.key);
    }
  };

  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}
      onClick={handleMenuClick}
      selectedKeys={[pathname]}
      items={items}
      style={{ height: "100%", borderInlineEnd: "none" }}
    />
  );
};

export default SideMenu;
