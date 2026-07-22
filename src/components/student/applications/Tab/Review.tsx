import { getGenderName } from "@/types/students/application";
import { getDistrictName } from "@/utils/students/student";
import { Button, Checkbox, Descriptions, Form } from "antd";
import FormSection from "../FormSection/FormSection";
import styles from "../student.module.scss";
interface ReviewStepProps {
  values: Record<string, any>;
  onEdit: (stepIndex: number) => void;
  disabled?: boolean;
}

const requiredCheckboxRule = (message: string) => ({
  validator: (_: unknown, value: boolean) =>
    value ? Promise.resolve() : Promise.reject(new Error(message)),
});

const yesNo = (value?: boolean) => (value ? "Yes" : "No");

const ReviewStep = ({ values, onEdit, disabled }: ReviewStepProps) => {
  return (
    <>
      <FormSection
        title="Personal Details"
        extra={
          <Button type="link" onClick={() => onEdit(0)}>
            Edit
          </Button>
        }
      >
        <Descriptions
          column={1}
          bordered
          size="small"
          className={styles.reviewTable}
        >
          <Descriptions.Item label="Name">
            {values.name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {getGenderName(values.gender_id)}
          </Descriptions.Item>
          <Descriptions.Item label="Phone No.">
            {values.phone || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Father's Name">
            {values.father_name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Mother's Name">
            {values.mother_name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail">
            {values.email || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="District of Residence">
            {getDistrictName(values.district_id)}
          </Descriptions.Item>
        </Descriptions>
      </FormSection>

      <FormSection
        title="Exam & Educational Details"
        extra={
          <Button type="link" onClick={() => onEdit(1)}>
            Edit
          </Button>
        }
      >
        <Descriptions
          column={1}
          bordered
          size="small"
          className={styles.reviewTable}
        >
          <Descriptions.Item label="Institution Name">
            {values.institution_name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Institution District">
            {getDistrictName(values.institution_district)}
          </Descriptions.Item>
          <Descriptions.Item label="Roll">
            {values.roll || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Number">
            {values.number || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Registration Number">
            {values.registration_no || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Registration Session">
            {values.registration_session || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Total Marks Obtained">
            {values.total_marks_obtained ?? "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Percentage of Marks">
            {values.percentage_of_marks != null
              ? `${values.percentage_of_marks}%`
              : "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            {values.remarks || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Enrolled in College/University">
            {yesNo(values.is_enrolled_in_college)}
          </Descriptions.Item>
          {values.is_enrolled_in_college && (
            <>
              <Descriptions.Item label="Present Institution">
                {values.present_institution_name || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Present Institution District">
                {getDistrictName(values.present_institution_district)}
              </Descriptions.Item>
            </>
          )}
          <Descriptions.Item label="Admission via Assam SAMARTH">
            {yesNo(values.admission_via_samarth)}
          </Descriptions.Item>
          {values.admission_via_samarth && (
            <Descriptions.Item label="SAMARTH Registration Number">
              {values.samarth_registration_no || "—"}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Betterment/Reappearance Category">
            {yesNo(values.is_betterment_reappearance)}
          </Descriptions.Item>
          {values.is_betterment_reappearance && (
            <>
              <Descriptions.Item label="Year(s)">
                {values.betterment_years || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Reason">
                {values.betterment_reason || "—"}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </FormSection>

      <FormSection title="Declaration by the Applicant">
        <Form.Item
          name="declaration_guidelines_read"
          valuePropName="checked"
          rules={[
            requiredCheckboxRule("Please confirm you have read the guidelines"),
          ]}
        >
          <Checkbox disabled={disabled}>
            I have carefully read the latest guidelines of the Dr. Banikanta
            Kakati Merit Award Scheme and certify that my application fulfills
            all the prescribed eligibility criteria.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="declaration_info_true"
          valuePropName="checked"
          rules={[
            requiredCheckboxRule("Please confirm the information is true"),
          ]}
        >
          <Checkbox disabled={disabled}>
            I further declare that the information furnished in this application
            form is true and correct to the best of my knowledge and belief. In
            the event of any discrepancy, deviation, or false information being
            detected at any stage, my application may be cancelled, and I shall
            be liable for appropriate action as per the applicable rules.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="declaration_no_other_scheme"
          valuePropName="checked"
          rules={[requiredCheckboxRule("Please confirm this declaration")]}
        >
          <Checkbox disabled={disabled}>
            I also declare that I shall not avail benefits under the Mukhya
            Mantri Nijut Moina Aasoni / Mukhya Mantri Nijut Babu Aasoni schemes.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="declaration_agreed"
          valuePropName="checked"
          rules={[
            requiredCheckboxRule("You must agree to the declaration to submit"),
          ]}
        >
          <Checkbox disabled={disabled}>
            I agree to the above declaration.
          </Checkbox>
        </Form.Item>
      </FormSection>
    </>
  );
};

export default ReviewStep;
