import {
  useGetConstituenciesQuery,
  useGetDistrictsQuery,
  useGetVillagesQuery,
} from "@/redux/apis/mastersApi";
import {
  CASTE,
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

export const VILLAGE_OTHER = -1;

const studentForm: React.FC<studentFormProps> = ({
  onNext,
  isSaving = false,
}) => {
  const form = Form.useFormInstance();

  const [addressStates, setAddressStates] = useState({
    selectedDistrict: 0,
    selectedConstituency: 0,
  });

  const { selectedDistrict, selectedConstituency } = addressStates;

  // Initialize selections from form values on mount
  useEffect(() => {
    const districtId = form.getFieldValue(["student", "district_id"]);
    const constituencyId = form.getFieldValue(["student", "constituency_id"]);

    setAddressStates({
      selectedDistrict: districtId || 0,
      selectedConstituency: constituencyId || 0,
    });
  }, [form]);

  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery(
    selectedDistrict ? { district_id: selectedDistrict } : skipToken,
  );
  const { data: villages = [] } = useGetVillagesQuery(
    selectedConstituency
      ? { constituency_id: selectedConstituency }
      : skipToken,
  );

  const handleDistrictChange = useCallback(
    (value: number) => {
      setAddressStates((prev) => ({
        ...prev,
        selectedDistrict: value,
        selectedConstituency: 0,
      }));
      form.setFieldsValue({
        student: {
          ...form.getFieldValue("student"),
          constituency_id: undefined,
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
    const isOtherCaste =
      form.getFieldValue(["student", "caste_id"]) === CASTE.OTHER;
    const isVillageOther =
      form.getFieldValue(["student", "village_id"]) === VILLAGE_OTHER;

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
          ["student", "permanent_address"],
          ["student", "present_address"],
        ]
      : [
          ["student", "district_id"],
          ["student", "constituency_id"],
          ["student", "village_id"],
          ...(isVillageOther ? [["student", "village_name"]] : []),
        ];

    const casteFields = isOtherCaste ? [["student", "other_caste_name"]] : [];

    try {
      await form.validateFields([
        ...baseFields,
        ...locationFields,
        ...casteFields,
      ]);
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
          label="Name of Father / Guardian"
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

        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev?.student?.caste_id !== cur?.student?.caste_id
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(["student", "caste_id"]) === CASTE.OTHER ? (
              <Form.Item
                name={["student", "other_caste_name"]}
                label="Other Caste"
                rules={[
                  { required: true, message: "Please enter other caste name" },
                ]}
              >
                <Input placeholder="Enter other caste name" />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </FormSection>

      <FormSection title="Address Details">
        <Form.Item
          name={["student", "is_outside_mac_area"]}
          label="Are you a resident of Mising Autonomous Council (MAC) notified village area?"
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

            if (type === false) {
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
                    name={["student", "permanent_address"]}
                    label="Permanent Address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter permanent address",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Enter permanent address"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["student", "present_address"]}
                    label="Present Address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter present address",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Enter present address"
                    />
                  </Form.Item>
                </>
              );
            }

            if (type === true) {
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
                    label="Mising Autonomous Council (MAC) Constituency"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please select Mising Autonomous Council (MAC) constituency",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select MAC Constituency"
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
                      disabled={!selectedConstituency}
                    >
                      {villages.map((v: any) => (
                        <Select.Option key={v.id} value={v.id}>
                          {v.name}
                        </Select.Option>
                      ))}
                      <Select.Option key="other" value={VILLAGE_OTHER}>
                        Other
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prev, cur) =>
                      prev?.student?.village_id !== cur?.student?.village_id
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue(["student", "village_id"]) ===
                      VILLAGE_OTHER ? (
                        <Form.Item
                          name={["student", "other_village_name"]}
                          label="Village Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter village name",
                            },
                          ]}
                        >
                          <Input placeholder="Enter village name" />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                  <Form.Item
                    name={["student", "panchayat_name"]}
                    label="Panchayat"
                  >
                    <Input placeholder="Enter panchayat name" />
                  </Form.Item>
                  <Form.Item
                    name={["student", "municipal_area"]}
                    label="Municipal Area (If applicable)"
                  >
                    <Input placeholder="Enter municipal area" />
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
