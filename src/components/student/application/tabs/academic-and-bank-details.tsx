import { MARKING_SYSTEM } from "@/utils/students/application";
import {
  BOARD_OPTIONS,
  BOARDS,
  EXAM_TYPE_OPTIONS,
} from "@/utils/students/student";
import { Form, Input, InputNumber, Radio, Select } from "antd";
import React from "react";
import FormNavigation from "../form-navigation";
import FormSection from "../form-section";

interface AcademicAndapplicationFormProps {
  onNext: () => void;
  onPrevious: () => void;
  isSaving?: boolean;
}

const AcademicAndapplicationForm: React.FC<AcademicAndapplicationFormProps> = ({
  onNext,
  onPrevious,
  isSaving = false,
}) => {
  const form = Form.useFormInstance();

  const handleNext = async () => {
    const isOtherBoard =
      form.getFieldValue(["application", "board_id"]) === BOARDS.OTHER;
    const markingSystem = form.getFieldValue(["application", "marking_system"]);

    const baseFields = [
      ["application", "exam_id"],
      ["application", "year_of_passing"],
      ["application", "board_id"],
      ["application", "roll_no"],
      ["application", "marking_system"],
      ["application", "institution_name"],
      ["application", "institution_address"],
      ["application", "bank_name"],
      ["application", "branch_name"],
      ["application", "account_no"],
      ["application", "ifsc_code"],
    ];

    const markField =
      markingSystem === MARKING_SYSTEM.PERCENTAGE
        ? [["application", "percentage_of_marks"]]
        : [["application", "cgpa"]];

    const boardFields = isOtherBoard
      ? [["application", "other_board_name"]]
      : [];

    try {
      await form.validateFields([...baseFields, ...markField, ...boardFields]);
      onNext();
    } catch {
      // validation errors shown by antd
    }
  };

  return (
    <>
      <FormSection title="Examination Details">
        <Form.Item
          name={["application", "exam_id"]}
          label="Examination Passed"
          rules={[{ required: true, message: "Please select examination" }]}
        >
          <Select
            placeholder="Select Examination"
            options={EXAM_TYPE_OPTIONS}
            disabled
          />
        </Form.Item>

        <Form.Item
          name={["application", "year_of_passing"]}
          label="Year of Passing"
          initialValue={new Date().getFullYear().toString()}
          rules={[{ required: true, message: "Please enter year of passing" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={["application", "board_id"]}
          label="Board Name"
          rules={[{ required: true, message: "Please enter board name" }]}
        >
          <Select placeholder="Select Board" options={BOARD_OPTIONS} />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev?.application?.board_id !== cur?.application?.board_id
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(["application", "board_id"]) === BOARDS.OTHER ? (
              <Form.Item
                name={["application", "other_board_name"]}
                label="Other Board"
                rules={[
                  { required: true, message: "Please enter other board name" },
                ]}
              >
                <Input placeholder="Enter other board name" />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name={["application", "roll_no"]}
          label="Roll No."
          rules={[{ required: true, message: "Please enter roll number" }]}
        >
          <Input placeholder="Enter roll number" />
        </Form.Item>

        <Form.Item
          name={["application", "marking_system"]}
          label="Marking System"
          rules={[{ required: true, message: "Please select marking system" }]}
        >
          <Radio.Group>
            <Radio value={MARKING_SYSTEM.PERCENTAGE}>Percentage</Radio>
            <Radio value={MARKING_SYSTEM.CGPA}>CGPA</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev?.application?.marking_system !==
            cur?.application?.marking_system
          }
        >
          {({ getFieldValue }) => {
            const system = getFieldValue(["application", "marking_system"]);

            if (system === MARKING_SYSTEM.PERCENTAGE) {
              return (
                <Form.Item
                  name={["application", "percentage_of_marks"]}
                  label="Percentage of Marks"
                  rules={[
                    { required: true, message: "Please enter percentage" },
                    {
                      validator: (_, value) =>
                        value && Number(value) < 60
                          ? Promise.reject("Percentage must be at least 60%")
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="e.g. 85.50"
                    max={100}
                    step={0.01}
                    style={{ width: "100%" }}
                    stringMode
                  />
                </Form.Item>
              );
            }

            if (system === MARKING_SYSTEM.CGPA) {
              return (
                <Form.Item
                  name={["application", "cgpa"]}
                  label="CGPA"
                  rules={[
                    { required: true, message: "Please enter CGPA" },
                    {
                      validator: (_, value) =>
                        value && Number(value) < 6
                          ? Promise.reject(
                              "CGPA must be at least 6.0 (60% equivalent)",
                            )
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="e.g. 8.50"
                    max={10}
                    step={0.01}
                    style={{ width: "100%" }}
                    stringMode
                  />
                </Form.Item>
              );
            }

            return null;
          }}
        </Form.Item>
      </FormSection>

      <FormSection title="Institution Details">
        <Form.Item
          name={["application", "institution_name"]}
          label="Institution Name"
          rules={[{ required: true, message: "Please enter institution name" }]}
        >
          <Input placeholder="Enter institution / college name" />
        </Form.Item>

        <Form.Item
          name={["application", "institution_address"]}
          label="Institution Address"
          rules={[
            { required: true, message: "Please enter institution address" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter full institution address"
            rows={3}
          />
        </Form.Item>
      </FormSection>

      <FormSection title="Bank Account Details">
        <Form.Item
          name={["application", "bank_name"]}
          label="Bank Name"
          rules={[{ required: true, message: "Please enter bank name" }]}
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item
          name={["application", "branch_name"]}
          label="Branch Name"
          rules={[{ required: true, message: "Please enter branch name" }]}
        >
          <Input placeholder="Enter branch name" />
        </Form.Item>

        <Form.Item
          name={["application", "account_no"]}
          label="Account Number"
          rules={[
            { required: true, message: "Please enter account number" },
            {
              pattern: /^\d{9,18}$/,
              message: "Account number must be 9-18 digits",
            },
          ]}
        >
          <Input placeholder="Enter bank account number" maxLength={18} />
        </Form.Item>

        <Form.Item
          name={["application", "ifsc_code"]}
          label="IFSC Code"
          normalize={(value: string) => value?.toUpperCase()}
          rules={[
            { required: true, message: "Please enter IFSC code" },
            {
              pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: "Please enter a valid IFSC code",
            },
          ]}
        >
          <Input placeholder="e.g. SBIN0001234" maxLength={11} />
        </Form.Item>
      </FormSection>

      <FormNavigation
        onPrevious={onPrevious}
        onNext={handleNext}
        loading={isSaving}
      />
    </>
  );
};

export default AcademicAndapplicationForm;
