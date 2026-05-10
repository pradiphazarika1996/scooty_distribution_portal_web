import styles from "@/app/styles/UserMenu.module.css";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface UserMenuProps {
  name?: string;
  role?: string;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name = "",
  role = "",
  onLogout,
}) => {
  const initials = name?.charAt(0).toUpperCase() || "U";

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      overlayClassName={styles.dropdownOverlay}
    >
      <div className={styles.userBlock}>
        <div className={styles.userInfo}>
          <Text className={styles.userName}>{name}</Text>
          {role && <Text className={styles.userRole}>{role}</Text>}
        </div>
        <Avatar size={40} className={styles.userAvatar}>
          {initials}
        </Avatar>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
