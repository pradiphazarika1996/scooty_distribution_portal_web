import {
  useGetConstituenciesQuery,
  useGetDistrictsQuery,
  useGetPanchayatsQuery,
  useGetVillagesQuery,
} from "@/redux/apis/mastersApi";
import { useUpdateProfileMutation } from "@/redux/apis/studentProfileApi";
import styles from "@/styles/Profile.module.css";
import { StudentProfile } from "@/types/students/profile";
import { STATE_OPTIONS } from "@/utils/students/application";
import { CASTE_OPTIONS, GENDER_OPTIONS } from "@/utils/students/student";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, DatePicker, Form, Input, message, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

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

  const isOutside = Form.useWatch("is_outside_mac_area", form);
  const stateId = Form.useWatch("state_id", form);
  const districtId = Form.useWatch("district_id", form);
  const constituencyId = Form.useWatch("constituency_id", form);
  const panchayatId = Form.useWatch("panchayat_id", form);

  const { data: districtsData } = useGetDistrictsQuery();
  const { data: constituenciesData } = useGetConstituenciesQuery(
    districtId ? { district_id: districtId } : skipToken,
  );
  const { data: panchayatsData } = useGetPanchayatsQuery(
    constituencyId ? { constituency_id: constituencyId } : skipToken,
  );
  const { data: villagesData } = useGetVillagesQuery(
    panchayatId ? { panchayat_id: panchayatId } : skipToken,
  );

  const districts = districtsData ?? [];
  const constituencies = constituenciesData ?? [];
  const panchayats = panchayatsData ?? [];
  const villages = villagesData ?? [];

  // Reset dependent fields on parent change
  useEffect(() => {
    if (stateId !== profile.state_id) {
      form.setFieldsValue({
        district_id: undefined,
        constituency_id: undefined,
        panchayat_id: undefined,
        village_id: undefined,
      });
    }
  }, [stateId]);

  useEffect(() => {
    if (districtId !== profile.district_id) {
      form.setFieldsValue({
        constituency_id: undefined,
        panchayat_id: undefined,
        village_id: undefined,
      });
    }
  }, [districtId]);

  useEffect(() => {
    if (constituencyId !== profile.constituency_id) {
      form.setFieldsValue({ panchayat_id: undefined, village_id: undefined });
    }
  }, [constituencyId]);

  useEffect(() => {
    if (panchayatId !== profile.panchayat_id) {
      form.setFieldsValue({ village_id: undefined });
    }
  }, [panchayatId]);

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
        is_outside_mac_area: profile.is_outside_mac_area,
        state_id: profile.state_id,
        district_id: profile.district_id,
        constituency_id: profile.constituency_id,
        constituency_number: profile.constituency_number,
        panchayat_id: profile.panchayat_id,
        village_id: profile.village_id,
        city: profile.city,
        address: profile.address,
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

          <Form.Item name="email" label="Email">
            <Input placeholder="email@example.com" type="email" />
          </Form.Item>
        </div>
      </div>

      {/* ── Address ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Address &amp; Location</h3>

        <Form.Item
          name="is_outside_mac_area"
          label="Outside MAC Area"
          valuePropName="checked"
        >
          <Switch disabled />
        </Form.Item>

        <div className={styles.formGrid}>
          {isOutside ? (
            <>
              <Form.Item
                name="address"
                label="Address"
                className={styles.formFull}
              >
                <Input.TextArea rows={2} placeholder="Full address" />
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

              <Form.Item name="panchayat_id" label="Panchayat">
                <Select
                  placeholder="Select panchayat"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={toSelectOptions(panchayats)}
                />
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
