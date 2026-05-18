import {
  useRemoveAvatarMutation,
  useUploadAvatarMutation,
} from "@/redux/apis/studentProfileApi";
import styles from "@/styles/Profile.module.css";
import { LockOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React, { useRef } from "react";

interface AvatarUploadProps {
  avatarUrl: string | null;
  name: string | null;
  isLocked: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  name,
  isLocked,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();
  const [removeAvatar, { isLoading: removing }] = useRemoveAvatarMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      message.error("Image must be smaller than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(formData).unwrap();
      message.success("Profile picture updated");
    } catch {
      message.error("Failed to upload picture");
    }

    // Reset so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = async () => {
    try {
      await removeAvatar().unwrap();
      message.success("Profile picture removed");
    } catch {
      message.error("Failed to remove picture");
    }
  };

  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const busy = uploading || removing;

  return (
    <div className={styles.avatarSection}>
      <div
        className={styles.avatarWrapper}
        onClick={() => !isLocked && !busy && inputRef.current?.click()}
        style={{ cursor: isLocked ? "default" : "pointer" }}
      >
        {busy && (
          <div className={styles.avatarSpinner}>
            <Spin size="large" />
          </div>
        )}
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <span>{initials}</span>
          </div>
        )}
        {!isLocked && (
          <div className={styles.avatarOverlay}>
            <LockOutlined style={{ fontSize: 24, color: "var(--primary)" }} />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!isLocked && avatarUrl && (
        <button
          className={styles.removeAvatarBtn}
          onClick={handleRemove}
          disabled={busy}
          type="button"
        >
          Remove photo
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
