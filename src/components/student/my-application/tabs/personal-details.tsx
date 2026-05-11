import { CASTE_OPTIONS, GENDER_OPTIONS } from "@/utils/students/scholarship";
import type { FormInstance } from "antd";
import { DatePicker, Form, Input, Select } from "antd";
import React from "react";
import FormNavigation from "../form-navigation";
import FormSection from "../form-section";

interface PersonalDetailsFormProps {
  form: FormInstance;
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  form,
  onNext,
}) => {
  const handleNext = async () => {
    try {
      await form.validateFields();
      onNext();
    } catch {
      // validation errors shown by antd
    }
  };

  return (
    <>
      <FormSection title="Applicant Information">
        <Form.Item
          name={["personalDetails", "applicantName"]}
          label="Name of Applicant"
          rules={[{ required: true, message: "Please enter applicant name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "parentGuardianName"]}
          label="Name of Father / Mother / Guardian"
          rules={[
            { required: true, message: "Please enter parent/guardian name" },
          ]}
        >
          <Input placeholder="Enter parent/guardian name" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "gender"]}
          label="Gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select placeholder="Select Gender" options={GENDER_OPTIONS} />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "dateOfBirth"]}
          label="Date of Birth (DD/MM/YYYY)"
          rules={[{ required: true, message: "Please select date of birth" }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Select date"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "caste"]}
          label="Caste"
          rules={[{ required: true, message: "Please select caste" }]}
        >
          <Select placeholder="Select Caste" options={CASTE_OPTIONS} />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "macConstituencyName"]}
          label="Name of MAC Constituency"
          rules={[
            { required: true, message: "Please enter constituency name" },
          ]}
        >
          <Input placeholder="Constituency name" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "macConstituencyNo"]}
          label="No. of MAC Constituency"
          rules={[
            { required: true, message: "Please enter constituency number" },
          ]}
        >
          <Input placeholder="Constituency number" />
        </Form.Item>
      </FormSection>

      <FormSection title="Address Details">
        <Form.Item
          name={["personalDetails", "state"]}
          label="State"
          rules={[{ required: true, message: "Please enter state" }]}
        >
          <Input placeholder="Enter state" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "city"]}
          label="City"
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "district"]}
          label="District"
          rules={[{ required: true, message: "Please enter district" }]}
        >
          <Input placeholder="Enter district" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "constituency"]}
          label="Constituency"
          rules={[{ required: true, message: "Please enter constituency" }]}
        >
          <Input placeholder="Enter constituency" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "panchayat"]}
          label="Panchayat"
          rules={[{ required: true, message: "Please enter panchayat" }]}
        >
          <Input placeholder="Enter panchayat" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "village"]}
          label="Village"
          rules={[{ required: true, message: "Please enter village" }]}
        >
          <Input placeholder="Enter village" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "pinCode"]}
          label="PIN Code"
          rules={[
            { required: true, message: "Please enter PIN code" },
            { pattern: /^\d{6}$/, message: "PIN code must be 6 digits" },
          ]}
        >
          <Input placeholder="6-digit PIN code" maxLength={6} />
        </Form.Item>
      </FormSection>

      <FormSection title="Contact & Login Details">
        <Form.Item
          name={["personalDetails", "aadhaarNumber"]}
          label="Aadhaar Number"
          rules={[
            { required: true, message: "Please enter Aadhaar number" },
            {
              pattern: /^\d{12}$/,
              message: "Aadhaar number must be 12 digits",
            },
          ]}
        >
          <Input placeholder="12-digit Aadhaar number" maxLength={12} />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "phoneNumber"]}
          label="Phone No. (WhatsApp Integrated)"
          rules={[
            { required: true, message: "Please enter phone number" },
            {
              pattern: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <Input placeholder="10-digit mobile number" maxLength={10} />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "emailId"]}
          label="Email ID (Optional)"
          rules={[{ type: "email", message: "Please enter a valid email" }]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          name={["personalDetails", "password"]}
          label="Password (for Portal Login)"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password placeholder="Minimum 8 characters" />
        </Form.Item>
      </FormSection>

      <FormNavigation showPrevious={false} onNext={handleNext} />
    </>
  );
};

export default PersonalDetailsForm;
