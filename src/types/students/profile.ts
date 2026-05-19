export interface LookupOption {
  id: number;
  name: string;
}

// ── Student profile shape from API ──
export interface StudentProfile {
  id: number;
  phone: string;
  email: string | null;
  name: string | null;
  guardian_name: string | null;
  gender_id: number | null;
  date_of_birth: string | null; // YYYY-MM-DD
  caste_id: number | null;
  other_caste_name: string | null;
  aadhaar_number: string | null;

  // Address
  is_outside_mac_area: boolean;
  state_id: number | null;
  city: string | null;
  permanent_address: string | null;
  present_address: string | null;
  district_id: number | null;
  constituency_id: number | null;
  constituency_number: number | null;
  panchayat_name: string | null;
  village_id: number | null;
  other_village_name: string | null;
  municipal_area: string | null;
  pin_code: string | null;

  // Status
  is_profile_completed: boolean;
  profile_status: number;
  profile_completed_at: string | null;
  is_profile_locked: boolean;

  // Verification
  is_email_verified: boolean;
  is_phone_verified: boolean;

  // Avatar
  avatar_url: string | null;
}

// ── Editable subset for PATCH /students/me ──
export interface StudentProfileUpdate {
  name?: string;
  guardian_name?: string;
  email?: string;
  gender_id?: number;
  date_of_birth?: string;
  caste_id?: number;
  state_id?: number;
  city?: string;
  address?: string;
  district_id?: number;
  constituency_id?: number;
  constituency_number?: number;
  panchayat_id?: number;
  village_id?: number;
  pin_code?: string;
  is_outside_mac_area?: boolean;
}

// ── Profile completion check ──
export const isProfileEmpty = (profile: StudentProfile): boolean => {
  return !profile.name && !profile.guardian_name && !profile.date_of_birth;
};
