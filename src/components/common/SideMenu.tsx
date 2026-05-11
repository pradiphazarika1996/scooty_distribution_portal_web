"use client";

import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideMenuProps {
  collapsed: boolean;
}

const menuItems: MenuProps["items"] = [
  {
    key: "/student/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "/student/application",
    icon: <FileTextOutlined />,
    label: "My Application",
  },
];

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={menuItems}
      onClick={handleClick}
      inlineCollapsed={collapsed}
    />
  );
};

export default SideMenu;
