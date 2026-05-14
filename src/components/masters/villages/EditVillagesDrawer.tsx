import { useGetConstituenciesQuery } from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { useGetPanchayatsQuery } from "@/redux/features/masters/panchayatApi";
import { useUpdateVillageMutation } from "@/redux/features/masters/villageApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const EditVillageDrawer: React.FC<DrawerProps> = ({ open, setOpen, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedConstituency, setSelectedConstituency] = useState<number>(0);

  const [updateVillage] = useUpdateVillageMutation();
  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery(
    selectedDistrict ? { district_id: selectedDistrict } : skipToken,
  );
  const { data: panchayats = [] } = useGetPanchayatsQuery(
    selectedConstituency
      ? { constituency_id: selectedConstituency }
      : skipToken,
  );

  const onFinish = async (payload: any) => {
    try {
      setLoading(true);
      const result = await updateVillage(payload).unwrap();
      if (result.status) {
        showToast("Village Updated Successfully");
        form.resetFields();
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err: any) {
      showError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && open) {
      setSelectedDistrict(data?.district_id);
      setSelectedConstituency(data?.constituency_id);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        code: data.code,
        district_id: data.district_id,
        constituency_id: data.constituency_id,
        block_id: data.block_id,
      });
    }
  }, [data, open, form]);

  const handleDistrictChange = (value: number) => {
    setSelectedDistrict(value);
    setSelectedConstituency(0);
    form.setFieldValue("constituency_id", undefined);
    form.setFieldValue("panchayat_id", undefined);
  };

  const handleConstituencyChange = (value: number) => {
    setSelectedConstituency(value);
    form.setFieldValue("panchayat_id", undefined);
  };

  return (
    <Drawer
      title="Edit Village"
      width={450}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={(error) => console.log("Failed:", error)}
        autoComplete="off"
      >
        <Form.Item name="id" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter village name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Select District"
          name="district_id"
          rules={[{ required: true, message: "Please select a district" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select a district"
            onChange={handleDistrictChange}
          >
            {districts.map((district: any) => (
              <Select.Option key={district.id} value={district.id}>
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Constituency"
          name="constituency_id"
          rules={[{ required: true, message: "Please select a constituency" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select a constituency"
            disabled={!selectedDistrict}
            onChange={handleConstituencyChange}
          >
            {constituencies.map((constituency: any) => (
              <Select.Option
                key={constituency.id}
                value={constituency.id}
                label={constituency.name}
              >
                {constituency.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Panchayat"
          name="panchayat_id"
          rules={[{ required: true, message: "Please select a panchayat" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select a panchayat"
            disabled={!selectedConstituency}
            optionLabelProp="label"
          >
            {panchayats.map((panchayat: any) => (
              <Select.Option
                key={panchayat.id}
                value={panchayat.id}
                label={panchayat.name}
              >
                {panchayat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditVillageDrawer;
