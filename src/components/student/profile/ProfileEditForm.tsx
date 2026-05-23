import {
  useGetConstituenciesQuery,
  useGetDistrictsQuery,
  useGetVillagesQuery,
} from "@/redux/apis/mastersApi";
import { useUpdateProfileMutation } from "@/redux/apis/studentProfileApi";
import styles from "@/styles/Profile.module.css";
import { StudentProfile } from "@/types/students/profile";
import { STATE_OPTIONS } from "@/utils/students/application";
import { CASTE, CASTE_OPTIONS, GENDER_OPTIONS } from "@/utils/students/student";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, DatePicker, Form, Input, message, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { VILLAGE_OTHER } from "../application/tabs/personal-details";

interface ProfileEditFormProps {
  profile: StudentProfile;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profile,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const isResident = Form.useWatch("is_resident_of_mac_area", form);
  const stateId = Form.useWatch("state_id", form);
  const districtId = Form.useWatch("district_id", form);
  const constituencyId = Form.useWatch("constituency_id", form);

  const { data: districtsData } = useGetDistrictsQuery();
  const { data: constituenciesData } = useGetConstituenciesQuery(
    districtId ? { district_id: districtId } : skipToken,
  );
  const { data: villagesData } = useGetVillagesQuery(
    constituencyId ? { constituency_id: constituencyId } : skipToken,
  );

  const districts = districtsData ?? [];
  const constituencies = constituenciesData ?? [];
  const villages = villagesData ?? [];

  // Reset dependent fields on parent change
  useEffect(() => {
    if (stateId !== profile.state_id) {
      form.setFieldsValue({
        district_id: undefined,
        constituency_id: undefined,
        village_id: undefined,
      });
    }
  }, [stateId]);

  useEffect(() => {
    if (districtId !== profile.district_id) {
      form.setFieldsValue({
        constituency_id: undefined,
        village_id: undefined,
      });
    }
  }, [districtId]);

  useEffect(() => {
    if (constituencyId !== profile.constituency_id) {
      form.setFieldsValue({ village_id: undefined });
    }
  }, [constituencyId]);

  const handleFinish = async (values: Record<string, unknown>) => {
    const payload = {
      ...values,
      date_of_birth: values.date_of_birth
        ? (values.date_of_birth as dayjs.Dayjs).format("YYYY-MM-DD")
        : undefined,
    };

    try {
      await updateProfile(payload).unwrap();
      message.success("Profile updated successfully");
      onCancel();
    } catch {
      message.error("Failed to update profile");
    }
  };

  const toSelectOptions = (list: { id: number; name: string }[]) =>
    list.map((o) => ({ value: o.id, label: o.name }));

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className={styles.editForm}
      initialValues={{
        name: profile.name,
        guardian_name: profile.guardian_name,
        email: profile.email,
        gender_id: profile.gender_id,
        date_of_birth: profile.date_of_birth
          ? dayjs(profile.date_of_birth)
          : undefined,
        caste_id: profile.caste_id,
        other_caste_name: profile.other_caste_name,
        is_resident_of_mac_area: profile.is_resident_of_mac_area,
        state_id: profile.state_id,
        district_id: profile.district_id,
        constituency_id: profile.constituency_id,
        village_id: profile.village_id,
        other_village_name: profile.other_village_name,
        panchayat_name: profile.panchayat_name,
        municipal_area: profile.municipal_area,
        city: profile.city,
        permanent_address: profile.permanent_address,
        present_address: profile.present_address,
        pin_code: profile.pin_code,
      }}
    >
      {/* ── Personal Details ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Details</h3>
        <div className={styles.formGrid}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item name="guardian_name" label="Guardian Name">
            <Input placeholder="Father / Guardian name" />
          </Form.Item>

          <Form.Item name="gender_id" label="Gender">
            <Select
              placeholder="Select gender"
              allowClear
              options={GENDER_OPTIONS}
            />
          </Form.Item>

          <Form.Item name="date_of_birth" label="Date of Birth">
            <DatePicker
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
              disabledDate={(d) => d.isAfter(dayjs())}
            />
          </Form.Item>

          <Form.Item name="caste_id" label="Caste">
            <Select
              placeholder="Select caste"
              allowClear
              options={CASTE_OPTIONS}
            />
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
                    {
                      required: true,
                      message: "Please enter other caste name",
                    },
                  ]}
                >
                  <Input placeholder="Enter other caste name" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input placeholder="email@example.com" type="email" />
          </Form.Item>
        </div>
      </div>

      {/* ── Address ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Address &amp; Location</h3>

        <Form.Item
          name="is_resident_of_mac_area"
          label="Non resident of Mising Autonomous Council (MAC) notified village area"
          valuePropName="checked"
        >
          <Switch disabled />
        </Form.Item>

        <div className={styles.formGrid}>
          {!isResident ? (
            <>
              <Form.Item
                name="permanent_address"
                label="Permanent Address"
                className={styles.formFull}
              >
                <Input.TextArea rows={2} placeholder="Permanent address" />
              </Form.Item>

              <Form.Item
                name="present_address"
                label="Present Address"
                className={styles.formFull}
              >
                <Input.TextArea rows={2} placeholder="Present address" />
              </Form.Item>

              <Form.Item name="city" label="City">
                <Input placeholder="City name" />
              </Form.Item>

              <Form.Item name="state_id" label="State">
                <Select
                  placeholder="Select state"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={STATE_OPTIONS}
                />
              </Form.Item>

              <Form.Item name="pin_code" label="PIN Code">
                <Input placeholder="6-digit PIN" maxLength={6} />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="district_id" label="District">
                <Select
                  placeholder="Select district"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={toSelectOptions(districts)}
                />
              </Form.Item>

              <Form.Item name="constituency_id" label="Constituency">
                <Select
                  placeholder="Select constituency"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={toSelectOptions(constituencies)}
                />
              </Form.Item>

              <Form.Item name="constituency_number" label="Constituency Number">
                <Input placeholder="e.g. 12" type="number" />
              </Form.Item>

              <Form.Item name="village_id" label="Village">
                <Select
                  placeholder="Select village"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={toSelectOptions(villages)}
                />
              </Form.Item>

              {/* <Form.Item
                name={["student", "village_id"]}
                label="Village"
                rules={[{ required: true, message: "Please select village" }]}
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
              </Form.Item> */}

              <Form.Item
                noStyle
                shouldUpdate={(prev, cur) =>
                  prev?.student?.village_id !== cur?.student?.village_id
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue(["student", "village_id"]) === VILLAGE_OTHER ? (
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

              <Form.Item name="panchayat_name" label="Panchayat">
                <Input placeholder="Enter panchayat name" />
              </Form.Item>

              <Form.Item name="municipal_area" label="Municipal Area">
                <Input placeholder="Municipal area" />
              </Form.Item>

              <Form.Item name="pin_code" label="PIN Code">
                <Input placeholder="6-digit PIN" maxLength={6} />
              </Form.Item>
            </>
          )}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className={styles.formActions}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles.saveBtn}
        >
          Save Profile Changes
        </Button>
        <Button onClick={onCancel} className={styles.discardBtn}>
          Discard
        </Button>
      </div>
    </Form>
  );
};

export default ProfileEditForm;
