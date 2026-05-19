import { useGetConstituenciesQuery } from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { useAddVillageMutation } from "@/redux/features/masters/villageApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddVillageDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedConstituency, setSelectedConstituency] = useState<number>(0);

  const [addVillage] = useAddVillageMutation();
  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery(
    selectedDistrict ? { district_id: selectedDistrict } : skipToken,
  );
  // const { data: panchayats = [] } = useGetPanchayatsQuery(
  //   selectedConstituency
  //     ? { constituency_id: selectedConstituency }
  //     : skipToken,
  // );

  const onFinish = async (payload: { name: string; description?: string }) => {
    setLoading(true);
    try {
      const result = await addVillage(payload).unwrap();
      if (result.status) {
        showToast("Village Added Successfully");
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

  return (
    <Drawer
      title="Add New Village"
      width={500}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      getContainer={false}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Select District"
          name="district_id"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            onChange={(value) => {
              setSelectedDistrict(value);
              form.setFieldValue("constituency_id", null);
              form.setFieldValue("block_id", null);
            }}
          >
            {districts.map((district: any) => {
              return (
                <Select.Option key={district.id} value={district.id}>
                  {district.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select Constituency"
          name="constituency_id"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            disabled={!selectedDistrict}
            onChange={(value) => {
              // console.log("value", value);
              setSelectedConstituency(value);
              form.setFieldValue("block_id", null);
            }}
          >
            {constituencies.map((constituency: any) => {
              return (
                <Select.Option key={constituency.id} value={constituency.id}>
                  {constituency.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Select Panchayat"
          name="panchayat_id"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            disabled={!selectedConstituency}
          >
            {panchayats.map((panchayat: any) => {
              return (
                <Select.Option key={panchayat.id} value={panchayat.id}>
                  {panchayat.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddVillageDrawer;
