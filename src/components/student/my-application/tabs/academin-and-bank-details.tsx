import { EXAMINATION_OPTIONS } from "@/utils/students/scholarship";
import type { FormInstance } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import React from "react";
import FormNavigation from "../form-navigation";
import FormSection from "../form-section";

interface AcademicAndBankDetailsFormProps {
  form: FormInstance;
  onNext: () => void;
  onPrevious: () => void;
}

const AcademicAndBankDetailsForm: React.FC<AcademicAndBankDetailsFormProps> = ({
  form,
  onNext,
  onPrevious,
}) => {
  const handleNext = async () => {
    try {
      await form.validateFields([
        ["academicDetails", "examinationPassed"],
        ["academicDetails", "yearOfPassing"],
        ["academicDetails", "boardName"],
        ["academicDetails", "rollNo"],
        ["academicDetails", "percentageOfMarks"],
        ["academicDetails", "institutionName"],
        ["academicDetails", "institutionAddress"],
        ["bankDetails", "bankName"],
        ["bankDetails", "branchName"],
        ["bankDetails", "accountNo"],
        ["bankDetails", "ifscCode"],
      ]);
      onNext();
    } catch {
      // validation errors shown by antd
    }
  };

  return (
    <>
      <FormSection title="Examination Details">
        <Form.Item
          name={["academicDetails", "examinationPassed"]}
          label="Examination Passed"
          rules={[{ required: true, message: "Please select examination" }]}
        >
          <Select
            placeholder="Select Examination"
            options={EXAMINATION_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          name={["academicDetails", "yearOfPassing"]}
          label="Year of Passing"
          rules={[{ required: true, message: "Please enter year of passing" }]}
        >
          <Input placeholder="e.g. 2024" maxLength={4} />
        </Form.Item>

        <Form.Item
          name={["academicDetails", "boardName"]}
          label="Board Name"
          rules={[{ required: true, message: "Please enter board name" }]}
        >
          <Input placeholder="e.g. SEBA, AHSEC" />
        </Form.Item>

        <Form.Item
          name={["academicDetails", "rollNo"]}
          label="Roll No."
          rules={[{ required: true, message: "Please enter roll number" }]}
        >
          <Input placeholder="Enter roll number" />
        </Form.Item>

        <Form.Item
          name={["academicDetails", "percentageOfMarks"]}
          label="Percentage of Marks"
          rules={[{ required: true, message: "Please enter percentage" }]}
        >
          <InputNumber
            placeholder="e.g. 85.50"
            min={0}
            max={100}
            step={0.01}
            style={{ width: "100%" }}
            stringMode
          />
        </Form.Item>
      </FormSection>

      <FormSection title="Institution Details">
        <Form.Item
          name={["academicDetails", "institutionName"]}
          label="Institution Name"
          rules={[{ required: true, message: "Please enter institution name" }]}
        >
          <Input placeholder="Enter institution / college name" />
        </Form.Item>

        <Form.Item
          name={["academicDetails", "institutionAddress"]}
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
          name={["bankDetails", "bankName"]}
          label="Bank Name"
          rules={[{ required: true, message: "Please enter bank name" }]}
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item
          name={["bankDetails", "branchName"]}
          label="Branch Name"
          rules={[{ required: true, message: "Please enter branch name" }]}
        >
          <Input placeholder="Enter branch name" />
        </Form.Item>

        <Form.Item
          name={["bankDetails", "accountNo"]}
          label="Account Number"
          rules={[{ required: true, message: "Please enter account number" }]}
        >
          <Input placeholder="Enter bank account number" />
        </Form.Item>

        <Form.Item
          name={["bankDetails", "ifscCode"]}
          label="IFSC Code"
          rules={[
            { required: true, message: "Please enter IFSC code" },
            {
              pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: "Please enter a valid IFSC code",
            },
          ]}
        >
          <Input
            placeholder="e.g. SBIN0001234"
            style={{ textTransform: "uppercase" }}
            maxLength={11}
          />
        </Form.Item>
      </FormSection>

      <FormNavigation onPrevious={onPrevious} onNext={handleNext} />
    </>
  );
};

export default AcademicAndBankDetailsForm;
