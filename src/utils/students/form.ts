import dayjs from "dayjs";
import { FORM_TABS } from "./application";

/**
 * Extract only the fields relevant to a given step.
 * Keeps API payloads minimal — each step sends only its own data.
 */
export const getStepData = (
  step: number,
  allValues: Record<string, unknown>,
): Record<string, unknown> => {
  switch (step) {
    case FORM_TABS.PERSONAL_DETAILS:
      return { student: allValues.student ?? {} };

    case FORM_TABS.ACADEMIC_AND_BANK_DETAILS:
      return {
        application: allValues.application ?? {},
      };

    case FORM_TABS.DOCUMENTS:
      return { documents: allValues.documents ?? {} };

    default:
      return {};
  }
};

/**
 * Map API response data back to Antd form-compatible values.
 * Extend this as your API shape evolves (e.g. ISO date → dayjs).
 */
export const mapApiToFormValues = (
  apiData: Record<string, any>,
): Record<string, any> => {
  const student = apiData.student ?? {};
  const application = apiData.application ?? {};

  return {
    student: {
      name: student.name,
      guardian_name: student.guardian_name,
      gender_id: student.gender_id,
      date_of_birth: student.date_of_birth
        ? dayjs(student.date_of_birth)
        : undefined,
      caste_id: student.caste_id,
      is_outside_mac_area: student.is_outside_mac_area ?? false,
      state_id: student.state_id,
      city: student.city,
      permanent_address: student.permanent_address,
      present_address: student.present_address,
      district_id: student.district_id,
      constituency_id: student.constituency_id,
      panchayat_id: student.panchayat_id,
      village_id: student.village_id,
      municipal_area: student.municipal_area,
      pin_code: student.pin_code,
      aadhaar_number: student.aadhaar_number,
      phone: student.phone,
      email: student.email,
    },
    application: {
      exam_id: application.exam_id,
      year_of_passing:
        application.year_of_passing || new Date().getFullYear().toString(),
      board_id: application.board_id,
      roll_no: application.roll_no,
      marking_system: application.marking_system,
      percentage_of_marks: application.percentage_of_marks,
      cgpa: application.cgpa,
      institution_name: application.institution_name,
      institution_address: application.institution_address,
      bank_name: application.bank_name,
      branch_name: application.branch_name,
      account_no: application.account_no,
      ifsc_code: application.ifsc_code,
    },
  };
};
