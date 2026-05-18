import {
  useGetConstituencyQuery,
  useGetDistrictQuery,
  useGetPanchayatQuery,
  useGetVillageQuery,
} from "@/redux/apis/mastersApi";
import styles from "@/styles/Profile.module.css";
import { StudentProfile } from "@/types/students/profile";
import { getStateName } from "@/utils/students/application";
import { getCasteName, getGenderName } from "@/utils/students/student";
import { skipToken } from "@reduxjs/toolkit/query";
import { Tag } from "antd";
import React from "react";

interface ProfileViewProps {
  profile: StudentProfile;
}

const formatDate = (d: string | null) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const maskAadhaar = (val: string | null) => {
  if (!val) return "—";
  return `XXXX XXXX ${val.slice(-4)}`;
};

const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  const { data: district } = useGetDistrictQuery(
    profile.district_id ? { id: profile.district_id } : skipToken,
  );
  const { data: constituency } = useGetConstituencyQuery(
    profile.constituency_id ? { id: profile.constituency_id } : skipToken,
  );
  const { data: panchayat } = useGetPanchayatQuery(
    profile.panchayat_id ? { id: profile.panchayat_id } : skipToken,
  );
  const { data: village } = useGetVillageQuery(
    profile.village_id ? { id: profile.village_id } : skipToken,
  );

  const isOutside = profile.is_outside_mac_area;

  return (
    <div className={styles.viewContainer}>
      {/* ── Personal Details ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Details</h3>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Full Name</span>
            <span className={styles.fieldValue}>{profile.name ?? "—"}</span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Guardian Name</span>
            <span className={styles.fieldValue}>
              {profile.guardian_name ?? "—"}
            </span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Gender</span>
            <span className={styles.fieldValue}>
              {profile.gender_id ? getGenderName(profile.gender_id) : "—"}
            </span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Date of Birth</span>
            <span className={styles.fieldValue}>
              {formatDate(profile.date_of_birth)}
            </span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Caste</span>
            <span className={styles.fieldValue}>
              {profile.caste_id ? getCasteName(profile.caste_id) : "—"}
            </span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Aadhaar Number</span>
            <span className={styles.fieldValue}>
              {maskAadhaar(profile.aadhaar_number)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Contact ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Contact</h3>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Phone</span>
            <span className={styles.fieldValue}>
              {profile.phone}
              {profile.is_phone_verified && (
                <Tag color="green" className={styles.verifiedTag}>
                  Verified
                </Tag>
              )}
            </span>
          </div>
          <div className={styles.fieldItem}>
            <span className={styles.fieldLabel}>Email</span>
            <span className={styles.fieldValue}>
              {profile.email ?? "—"}
              {profile.email && profile.is_email_verified && (
                <Tag color="green" className={styles.verifiedTag}>
                  Verified
                </Tag>
              )}
              {profile.email && !profile.is_email_verified && (
                <Tag color="orange" className={styles.verifiedTag}>
                  Unverified
                </Tag>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ── Address ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Address &amp; Location</h3>
        {isOutside && (
          <Tag color="blue" style={{ marginBottom: 12 }}>
            Outside MAC Area
          </Tag>
        )}
        <div className={styles.fieldGrid}>
          {isOutside ? (
            <>
              <div className={`${styles.fieldItem} ${styles.fieldFull}`}>
                <span className={styles.fieldLabel}>Address</span>
                <span className={styles.fieldValue}>
                  {profile.address ?? "—"}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>City</span>
                <span className={styles.fieldValue}>{profile.city ?? "—"}</span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>State</span>
                <span className={styles.fieldValue}>
                  {getStateName(profile.state_id as number) ?? "—"}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>PIN Code</span>
                <span className={styles.fieldValue}>
                  {profile.pin_code ?? "—"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>Village</span>
                <span className={styles.fieldValue}>
                  {village?.name ?? "—"}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>Panchayat</span>
                <span className={styles.fieldValue}>
                  {panchayat?.name ?? "—"}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>Constituency</span>
                <span className={styles.fieldValue}>
                  {constituency?.name ?? "—"}
                  {profile.constituency_number
                    ? ` (#${profile.constituency_number})`
                    : ""}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>District</span>
                <span className={styles.fieldValue}>
                  {district?.name ?? "—"}
                </span>
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldLabel}>PIN Code</span>
                <span className={styles.fieldValue}>
                  {profile.pin_code ?? "—"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
