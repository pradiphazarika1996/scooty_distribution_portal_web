// GENDER
export const GENDER = Object.freeze({
  MALE: 1,
  FEMALE: 2,
});

export const GENDER_OPTIONS = Object.entries(GENDER).map(([label, value]) => ({
  label,
  value,
}));

export function getGenderName(value: number) {
  const option = GENDER_OPTIONS.find((opt) => opt.value == value);
  return option ? option.label : "";
}

// States
export const STATES = Object.freeze({
  Andhra_Pradesh: 1,
  Arunachal_Pradesh: 2,
  Assam: 3,
  Bihar: 4,
  Chhattisgarh: 5,
  Goa: 6,
  Gujarat: 7,
  Haryana: 8,
  Himachal_Pradesh: 9,
  Jharkhand: 10,
  Karnataka: 11,
  Kerala: 12,
  Madhya_Pradesh: 13,
  Maharashtra: 14,
  Manipur: 15,
  Meghalaya: 16,
  Mizoram: 17,
  Nagaland: 18,
  Odisha: 19,
  Punjab: 20,
  Rajasthan: 21,
  Sikkim: 22,
  Tamil_Nadu: 23,
  Telangana: 24,
  Tripura: 25,
  Uttar_Pradesh: 26,
  Uttarakhand: 27,
  West_Bengal: 28,
  Andaman_and_Nicobar_Islands: 29,
  Chandigarh: 30,
  Dadra_and_Nagar_Haveli_and_Daman_and_Diu: 31,
  Delhi: 32,
  Jammu_and_Kashmir: 33,
  Ladakh: 34,
  Lakshadweep: 35,
  Puducherry: 36,
});

export const STATE_OPTIONS = Object.entries(STATES).map(([label, value]) => ({
  label: label
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()),
  value,
}));

export function getStateName(value: number) {
  const option = STATE_OPTIONS.find((opt) => opt.value == value);
  return option ? option.label : "Unknown State";
}

export const PROFILE_STATUS = Object.freeze({
  DRAFT: 0,
  COMPLETED: 1,
});

// EXAM TYPES
export const EXAM_TYPE = Object.freeze({
  HSLC: 1,
  HS: 2,
});

export const EXAM_TYPE_OPTIONS = Object.entries(EXAM_TYPE).map(
  ([label, value]) => ({
    label,
    value,
  }),
);

export function getExamTypeName(value: number) {
  const option = EXAM_TYPE_OPTIONS.find((opt) => opt.value == value);
  return option ? option.label : "";
}

// BOARDS
export const BOARDS = Object.freeze({
  ASSEB: 1,
  CBSE: 2,
  ICSE: 3,
  OTHER: 4,
});

export const BOARD_OPTIONS = Object.entries(BOARDS).map(([label, value]) => ({
  label,
  value,
}));

export function getBoardName(value: number) {
  const option = BOARD_OPTIONS.find((opt) => opt.value == value);
  return option ? option.label : "";
}

// CASTE
export const CASTE = Object.freeze({
  GENERAL: 1,
  OBC: 2,
  MOBC: 3,
  SC: 4,
  ST_P: 5,
  ST_H: 6,
  EWS: 7,
  OTHER: 8,
});

export const CASTE_OPTIONS = [
  { label: "General", value: 1 },
  { label: "OBC", value: 2 },
  { label: "MOBC", value: 3 },
  { label: "SC", value: 4 },
  { label: "ST(P)", value: 5 },
  { label: "ST(H)", value: 6 },
  { label: "EWS", value: 7 },
  { label: "Other", value: 8 },
];

// export const CASTE_OPTIONS = Object.entries(CASTE).map(([label, value]) => ({
//   label,
//   value,
// }));

export function getCasteName(value: number) {
  const option = CASTE_OPTIONS.find((opt) => opt.value == value);
  return option ? option.label : "";
}

/**
 * Exam hierarchy config — drives eligibility logic.
 * `level`: lower number = lower class. A student can only apply
 *          for same or higher level after an existing application.
 * `canApplyAfter`: exam IDs that unlock this exam.
 *                  Empty array = available to all first-time applicants.
 */
export const EXAM_HIERARCHY: Record<
  number,
  { label: string; level: number; canApplyAfter: number[]; minGapYears: number }
> = {
  [EXAM_TYPE.HSLC]: {
    label: "HSLC",
    level: 1,
    canApplyAfter: [],
    minGapYears: 0,
  },
  [EXAM_TYPE.HS]: {
    label: "HS",
    level: 2,
    canApplyAfter: [EXAM_TYPE.HSLC],
    minGapYears: 2, // ← must wait 2 years after HSLC
  },
};

/**
 * Returns current academic year string (e.g., "2025-2026").
 * Academic year starts in April in India.
 */
export const getCurrentAcademicYear = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  // April (3) onwards = current year - next year
  // Jan-Mar = previous year - current year
  if (month >= 3) {
    return `${year}-${year + 1}`;
  }
  return `${year - 1}-${year}`;
};
