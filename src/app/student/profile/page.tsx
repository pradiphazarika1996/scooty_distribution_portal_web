"use client";

import AvatarUpload from "@/components/student/profile/AvatarUpload";
import EmptyProfileState from "@/components/student/profile/EmptyProfileState";
import ProfileEditForm from "@/components/student/profile/ProfileEditForm";
import ProfileView from "@/components/student/profile/ProfileView";
import { useLogoutMutation } from "@/redux/apis/studentAuthApi";
import { useGetProfileQuery } from "@/redux/apis/studentProfileApi";
import styles from "@/styles/Profile.module.css";
import { isProfileEmpty } from "@/types/students/profile";
import { Alert, Button, Spin, Tag } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const [editMode, setEditMode] = useState(false);
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    refetchOnFocus: true,
  });

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrap}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className={styles.loaderWrap}>
        <Alert
          message="Unable to load profile"
          description="Please try refreshing the page."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const empty = isProfileEmpty(profile);

  return (
    <div className={styles.pageGrid}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarCard}>
          <AvatarUpload
            avatarUrl={profile?.avatar_url ?? null}
            name={profile?.name ?? "Student"}
            isLocked={profile?.is_profile_locked ?? false}
          />
          <h2 className={styles.sidebarName}>{profile?.name ?? "Student"}</h2>
          <p className={styles.sidebarPhone}>{profile?.phone ?? "N/A"}</p>
          {profile?.is_profile_completed && (
            <Tag color="green" className={styles.statusTag}>
              Profile Complete
            </Tag>
          )}
          {!profile?.is_profile_completed && !empty && (
            <Tag color="orange" className={styles.statusTag}>
              Incomplete
            </Tag>
          )}
        </div>

        <nav className={styles.sidebarNav}>
          <p className={`${styles.navItem}`}>Profile Information</p>
          <Button
            className={`${styles.navItem} ${styles.navDanger}`}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <section className={styles.mainContent}>
        <div className={styles.contentCard}>
          {empty ? (
            <EmptyProfileState />
          ) : (
            <>
              <header className={styles.contentHeader}>
                <div>
                  <h1 className={styles.pageTitle}>Profile</h1>
                  <p className={styles.pageSubtitle}>
                    Manage your personal information and how it appears across
                    the portal.
                  </p>
                </div>
                {!profile.is_profile_locked && !editMode && (
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
                {profile.is_profile_locked && (
                  <Tag color="red">Profile Locked</Tag>
                )}
              </header>

              {editMode ? (
                <ProfileEditForm
                  profile={profile}
                  onCancel={() => setEditMode(false)}
                />
              ) : (
                <ProfileView profile={profile} />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
