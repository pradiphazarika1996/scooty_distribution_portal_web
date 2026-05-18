import {
  useGetConstituenciesQuery,
  useGetDistrictsQuery,
  useGetPanchayatsQuery,
  useGetVillagesQuery,
} from "@/redux/apis/mastersApi";
import {
  CASTE_OPTIONS,
  GENDER_OPTIONS,
  STATE_OPTIONS,
} from "@/utils/students/student";
import { skipToken } from "@reduxjs/toolkit/query";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import FormNavigation from "../form-navigation";
import FormSection from "../form-section";
interface studentFormProps {
  onNext: () => void;
  isSaving?: boolean;
}

const studentForm: React.FC<studentFormProps> = ({
  onNext,
  isSaving = false,
}) => {
  const form = Form.useFormInstance();

  const [addressStates, setAddressStates] = useState({
    selectedDistrict: 0,
    selectedConstituency: 0,
    selectedPanchayat: 0,
  });

  const { selectedDistrict, selectedConstituency, selectedPanchayat } =
    addressStates;

  // Initialize selections from form values on mount
  useEffect(() => {
    const districtId = form.getFieldValue(["student", "district_id"]);
    const constituencyId = form.getFieldValue(["student", "constituency_id"]);
    const panchayatId = form.getFieldValue(["student", "panchayat_id"]);

    setAddressStates({
      selectedDistrict: districtId || 0,
      selectedConstituency: constituencyId || 0,
      selectedPanchayat: panchayatId || 0,
    });
  }, [form]);

  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery(
    selectedDistrict ? { district_id: selectedDistrict } : skipToken,
  );
  const { data: panchayats = [] } = useGetPanchayatsQuery(
    selectedConstituency
      ? { constituency_id: selectedConstituency }
      : skipToken,
  );
  const { data: villages = [] } = useGetVillagesQuery(
    selectedPanchayat ? { panchayat_id: selectedPanchayat } : skipToken,
  );

  const handleDistrictChange = useCallback(
    (value: number) => {
      setAddressStates((prev) => ({
        ...prev,
        selectedDistrict: value,
        selectedConstituency: 0,
        selectedPanchayat: 0,
      }));
      form.setFieldsValue({
        student: {
          ...form.getFieldValue("student"),
          constituency_id: undefined,
          panchayat_id: undefined,
          village_id: undefined,
        },
      });
    },
    [form],
  );

  const handleConstituencyChange = useCallback(
    (value: number) => {
      setAddressStates((prev) => ({
        ...prev,
        selectedConstituency: value,
        selectedPanchayat: 0,
      }));
      form.setFieldsValue({
        student: {
          ...form.getFieldValue("student"),
          panchayat_id: undefined,
          village_id: undefined,
        },
      });
    },
    [form],
  );

  const handlePanchayatChange = useCallback(
    (value: number) => {
      setAddressStates((prev) => ({
        ...prev,
        selectedPanchayat: value,
      }));
      form.setFieldsValue({
        student: {
          ...form.getFieldValue("student"),
          village_id: undefined,
        },
      });
    },
    [form],
  );

  const handleNext = async () => {
    const isOutside = form.getFieldValue(["student", "is_outside_mac_area"]);

    const baseFields = [
      ["student", "name"],
      ["student", "guardian_name"],
      ["student", "gender_id"],
      ["student", "date_of_birth"],
      ["student", "caste_id"],
      ["student", "is_outside_mac_area"],
      ["student", "pin_code"],
      ["student", "aadhaar_number"],
      ["student", "phone"],
    ];

    const locationFields = isOutside
      ? [
          ["student", "state_id"],
          ["student", "city"],
          ["student", "address"],
        ]
      : [
          ["student", "district_id"],
          ["student", "constituency_id"],
          ["student", "panchayat_id"],
          ["student", "village_id"],
        ];

    try {
      await form.validateFields([...baseFields, ...locationFields]);
      onNext();
    } catch {
      // validation errors shown by antd
    }
  };

  return (
    <>
      <FormSection title="Applicant Information">
        <Form.Item
          name={["student", "name"]}
          label="Name of Applicant"
          rules={[{ required: true, message: "Please enter applicant name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name={["student", "guardian_name"]}
          label="Name of Father / Mother / Guardian"
          rules={[
            { required: true, message: "Please enter parent/guardian name" },
          ]}
        >
          <Input placeholder="Enter parent/guardian name" />
        </Form.Item>

        <Form.Item
          name={["student", "gender_id"]}
          label="Gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select placeholder="Select Gender" options={GENDER_OPTIONS} />
        </Form.Item>

        <Form.Item
          name={["student", "date_of_birth"]}
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
          name={["student", "caste_id"]}
          label="Caste"
          rules={[{ required: true, message: "Please select caste" }]}
        >
          <Select placeholder="Select Caste" options={CASTE_OPTIONS} />
        </Form.Item>
      </FormSection>

      <FormSection title="Address Details">
        <Form.Item
          name={["student", "is_outside_mac_area"]}
          label="Do you reside outside the MAC Council Area?"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev?.student?.is_outside_mac_area !==
            cur?.student?.is_outside_mac_area
          }
        >
          {({ getFieldValue }) => {
            const type = getFieldValue(["student", "is_outside_mac_area"]);

            if (type === true) {
              return (
                <>
                  <Form.Item
                    name={["student", "state_id"]}
                    label="State"
                    rules={[{ required: true, message: "Please enter state" }]}
                  >
                    <Select placeholder="Enter state" options={STATE_OPTIONS} />
                  </Form.Item>
                  <Form.Item
                    name={["student", "city"]}
                    label="City"
                    rules={[{ required: true, message: "Please enter city" }]}
                  >
                    <Input placeholder="Enter city" />
                  </Form.Item>
                  <Form.Item
                    name={["student", "address"]}
                    label="Current Address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter current address",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Enter current address"
                    />
                  </Form.Item>
                </>
              );
            }

            if (type === false) {
              return (
                <>
                  <Form.Item
                    name={["student", "district_id"]}
                    label="District"
                    rules={[
                      { required: true, message: "Please select district" },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select District"
                      onChange={handleDistrictChange}
                    >
                      {districts.map((d: any) => (
                        <Select.Option key={d.id} value={d.id}>
                          {d.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["student", "constituency_id"]}
                    label="Constituency"
                    rules={[
                      { required: true, message: "Please select constituency" },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Constituency"
                      disabled={!selectedDistrict}
                      onChange={handleConstituencyChange}
                    >
                      {constituencies.map((c: any) => (
                        <Select.Option key={c.id} value={c.id}>
                          {c.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["student", "panchayat_id"]}
                    label="Panchayat"
                    rules={[
                      { required: true, message: "Please select panchayat" },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Panchayat"
                      disabled={!selectedConstituency}
                      onChange={handlePanchayatChange}
                    >
                      {panchayats.map((p: any) => (
                        <Select.Option key={p.id} value={p.id}>
                          {p.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["student", "village_id"]}
                    label="Village"
                    rules={[
                      { required: true, message: "Please select village" },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Village"
                      disabled={!selectedPanchayat}
                    >
                      {villages.map((v: any) => (
                        <Select.Option key={v.id} value={v.id}>
                          {v.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              );
            }

            return null;
          }}
        </Form.Item>

        <Form.Item
          name={["student", "pin_code"]}
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
          name={["student", "aadhaar_number"]}
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
          name={["student", "phone"]}
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
          name={["student", "email"]}
          label="Email ID (Optional)"
          rules={[{ type: "email", message: "Please enter a valid email" }]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>
      </FormSection>

      <FormNavigation
        showPrevious={false}
        onNext={handleNext}
        loading={isSaving}
      />
    </>
  );
};

export default studentForm;
