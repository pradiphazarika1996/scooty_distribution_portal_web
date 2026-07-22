export const GENDER = Object.freeze({
  MALE: 1,
  FEMALE: 2,
});

export const GENDER_OPTIONS = Object.entries(GENDER).map(([label, value]) => ({
  label: label.replace(/_/g, " "),
  value,
}));

export function getGenderName(value: number) {
  const option = GENDER_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : "Undefined";
}

export const LABELS = Object.freeze({
  YES: "Yes",
  NO: "No",
});

export const BOOLEAN = Object.freeze({
  YES: true,
  NO: false,
});

export const BOOLEAN_OPTIONS = Object.freeze([
  {
    label: LABELS.YES,
    value: BOOLEAN.YES,
  },
  {
    label: LABELS.NO,
    value: BOOLEAN.NO,
  },
]);

export const APPLICATION_STATUS = {
  DRAFT: 1,
  SUBMITTED: 2,
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export const APPLICATION_STATUS_LABELS: Record<number, string> = {
  [APPLICATION_STATUS.DRAFT]: "Draft",
  [APPLICATION_STATUS.SUBMITTED]: "Submitted",
};

export function getApplicationStatusName(value: number) {
  return APPLICATION_STATUS_LABELS[value] ?? "Unknown";
}

// ── Step 1 — Personal Details ──
export interface PersonalDetailsFormValues {
  name: string;
  phone: string;
  gender_id: number;
  father_name: string;
  mother_name: string;
  email?: string;
  district_id: number;
}

// ── Step 2 — HS Exam + Educational Details ──
export interface ExamDetailsFormValues {
  institution_name: string;
  institution_district: number;
  roll: string;
  number: string;
  registration_no: string;
  registration_session: string;
  percentage_of_marks: number;
  total_marks_obtained: number;
  remarks: string;

  is_enrolled_in_college: boolean;
  present_institution_name?: string;
  present_institution_district?: number;

  admission_via_samarth: boolean;
  samarth_registration_no?: string;

  is_betterment_reappearance: boolean;
  betterment_years?: string;
  betterment_reason?: string;
}

// ── Step 3 — Declaration ──
export interface DeclarationFormValues {
  declaration_guidelines_read: boolean;
  declaration_info_true: boolean;
  declaration_no_other_scheme: boolean;
  declaration_agreed: boolean;
}

// Full record as returned by GET /student
export interface MeritAwardApplication
  extends Partial<PersonalDetailsFormValues>,
    Partial<ExamDetailsFormValues>,
    Partial<DeclarationFormValues> {
  id: number;
  phone: string;
  application_number?: string;
  application_status: ApplicationStatus;
  submitted_at?: string;
}

// Single-shot submit payload — the backend's submitApplication spreads this
// directly onto the Student row, so it must contain every field at once.
export type SubmitApplicationPayload = PersonalDetailsFormValues &
  ExamDetailsFormValues &
  DeclarationFormValues;
