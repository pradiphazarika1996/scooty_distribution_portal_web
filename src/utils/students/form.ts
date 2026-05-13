import { FORM_TABS } from "./scholarship";

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
      return { personalDetails: allValues.personalDetails ?? {} };

    case FORM_TABS.ACADEMIC_AND_BANK_DETAILS:
      return {
        academicDetails: allValues.academicDetails ?? {},
        bankDetails: allValues.bankDetails ?? {},
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
  apiData: Record<string, unknown>,
): Record<string, unknown> => {
  return { ...apiData };
};
