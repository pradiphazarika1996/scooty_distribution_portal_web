import {
  DISTRICT_OPTIONS,
  REGISTRATION_SESSION_OPTIONS,
} from "@/utils/students/student";
import type { SelectProps } from "antd";
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Tag,
} from "antd";
import React from "react";
import FormSection from "../FormSection/FormSection";
import styles from "../student.module.scss";

interface ExamDetailsStepProps {
  form: FormInstance;
  disabled?: boolean;
}

const MAX_TOTAL_MARKS = 500;
const ELIGIBILITY_THRESHOLD = 80;

const calculatePercentage = (
  total: number | null | undefined,
): number | null => {
  if (total === null || total === undefined) return null;
  if (typeof total !== "number" || Number.isNaN(total)) return null;
  if (total < 0 || total > MAX_TOTAL_MARKS) return null;

  const percentage = (total / MAX_TOTAL_MARKS) * 100;
  return Math.round(percentage * 100) / 100;
};
const YesNoRadio = (props: React.ComponentProps<typeof Radio.Group>) => (
  <Radio.Group {...props}>
    <Radio value={true}>Yes</Radio>
    <Radio value={false}>No</Radio>
  </Radio.Group>
);

const DistrictSelect = (props: SelectProps) => (
  <Select
    placeholder="Select district"
    options={DISTRICT_OPTIONS}
    showSearch
    optionFilterProp="label"
    {...props}
  />
);

const ExamDetailsStep = ({ form, disabled }: ExamDetailsStepProps) => {
  const handleTotalMarksChange = (value: number | null) => {
    const percentage = calculatePercentage(value);
    form.setFieldValue("percentage_of_marks", percentage);
  };

  return (
    <>
      <FormSection title="Higher Secondary Examination Details">
        {/* LOCKED — from StudentLookup.institution_name */}
        <Form.Item
          name="institution_name"
          label="Name of the Institution from which the applicant passed the Higher Secondary Final Examination"
          rules={[
            { required: true, message: "Please enter the institution name" },
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.district_name (resolved to an id) */}
        <Form.Item
          name="institution_district"
          label="District of the Institution"
          rules={[{ required: true, message: "Please select the district" }]}
        >
          <DistrictSelect disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.roll */}
        <Form.Item
          name="roll"
          label="Roll"
          rules={[{ required: true, message: "Please enter your roll number" }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.number */}
        <Form.Item
          name="number"
          label="No."
          rules={[{ required: true, message: "Please enter your No." }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.registration_no */}
        <Form.Item
          name="registration_no"
          label="Registration Number"
          rules={[
            {
              required: true,
              message: "Please enter your registration number",
            },
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.registration_session */}
        <Form.Item
          name="registration_session"
          label="Registration Session"
          rules={[
            {
              required: true,
              message: "Please select registration session",
            },
          ]}
        >
          <Select
            placeholder="Select Registration Session"
            options={REGISTRATION_SESSION_OPTIONS}
            disabled={disabled}
          />
        </Form.Item>

        {/* MANUAL ENTRY — not sourced from StudentLookup. User enters this
            themselves; percentage_of_marks is then auto-calculated from it
            via handleTotalMarksChange. */}
        <Form.Item
          name="total_marks_obtained"
          label="Total Marks obtained"
          rules={[{ required: true, message: "Please enter your total marks" }]}
        >
          <InputNumber<number>
            min={0}
            max={MAX_TOTAL_MARKS}
            addonAfter="Out of 500"
            style={{ width: "100%" }}
            className={styles.totalMarksInput}
            onChange={handleTotalMarksChange}
          />
        </Form.Item>

        <Form.Item
          name="percentage_of_marks"
          label="Percentage of Marks Secured"
          rules={[
            {
              required: true,
              message: "Please enter your percentage of marks",
            },
            {
              validator: (_, value) => {
                if (value === undefined || value === null || value === "") {
                  return Promise.resolve();
                }
                const numericValue = Number(value);
                return numericValue >= ELIGIBILITY_THRESHOLD
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        `You must score at least ${ELIGIBILITY_THRESHOLD}% to be eligible for this scheme. Your current percentage is ${numericValue.toFixed(2)}%.`,
                      ),
                    );
              },
            },
          ]}
        >
          <InputNumber<number>
            min={0}
            max={100}
            style={{ width: "100%" }}
            disabled
            formatter={(value) => {
              if (value === undefined || value === null) return "";
              const numericValue =
                typeof value === "string" ? parseFloat(value) : value;
              if (Number.isNaN(numericValue)) return "";
              return `${numericValue.toFixed(2)}%`;
            }}
            parser={(displayValue) => {
              if (!displayValue) return 0;
              const numeric = parseFloat(displayValue.replace("%", "").trim());
              return Number.isNaN(numeric) ? 0 : numeric;
            }}
          />
        </Form.Item>

        {/* Remarks — optional free-text notes */}
        <Form.Item
          name="remarks"
          label="Remarks (if any, related to the details mentioned above)"
        >
          <Input.TextArea
            rows={3}
            placeholder="Any additional comments or notes (optional)"
          />
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.percentage_of_marks !== cur.percentage_of_marks
          }
          noStyle
        >
          {() => {
            const percentage = form.getFieldValue("percentage_of_marks");
            if (
              percentage === undefined ||
              percentage === null ||
              percentage === ""
            ) {
              return null;
            }
            const isEligible = Number(percentage) >= ELIGIBILITY_THRESHOLD;
            return (
              <Form.Item label="Eligibility Status">
                <Tag
                  color={isEligible ? "success" : "error"}
                  style={{ fontSize: 14, padding: "4px 12px" }}
                >
                  {isEligible ? "Eligible" : "Not Eligible"}
                </Tag>
              </Form.Item>
            );
          }}
        </Form.Item>
      </FormSection>

      <FormSection title="Educational Details (if the student is enrolled in College/University)">
        <Form.Item
          name="is_enrolled_in_college"
          label="Enrolled in College/University?"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <YesNoRadio />
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.is_enrolled_in_college !== cur.is_enrolled_in_college
          }
        >
          {() =>
            form.getFieldValue("is_enrolled_in_college") ? (
              <>
                <Form.Item
                  name="present_institution_name"
                  label="Name of the Institution where the applicant is presently studying"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the present institution name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="present_institution_district"
                  label="District of the Present Institution"
                  rules={[
                    { required: true, message: "Please select the district" },
                  ]}
                >
                  <DistrictSelect />
                </Form.Item>
              </>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="admission_via_samarth"
          label="Whether admission has been taken through Assam SAMARTH"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <YesNoRadio />
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.admission_via_samarth !== cur.admission_via_samarth
          }
        >
          {() =>
            form.getFieldValue("admission_via_samarth") ? (
              <Form.Item
                name="samarth_registration_no"
                label="SAMARTH Registration Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the SAMARTH registration number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="is_betterment_reappearance"
          label="Whether Betterment and Reappearance category"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <YesNoRadio />
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.is_betterment_reappearance !== cur.is_betterment_reappearance
          }
        >
          {() =>
            form.getFieldValue("is_betterment_reappearance") ? (
              <>
                <Form.Item
                  name="betterment_years"
                  label="Number of Year(s)"
                  rules={[
                    { required: true, message: "Please specify the year(s)" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="betterment_reason"
                  label="Reason"
                  rules={[
                    { required: true, message: "Please specify the reason" },
                  ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </>
            ) : null
          }
        </Form.Item>
      </FormSection>
    </>
  );
};

export default ExamDetailsStep;
