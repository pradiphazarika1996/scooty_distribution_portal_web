"use client";

import { ROUTES } from "@/utils/status";
import { FileTextOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideMenuProps {
  collapsed: boolean;
}

const menuItems: MenuProps["items"] = [
  {
    key: ROUTES.MY_APPLICATION,
    icon: <FileTextOutlined />,
    label: "My Application",
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
      case ROUTES.MY_APPLICATION:
        router.push("/student");
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
