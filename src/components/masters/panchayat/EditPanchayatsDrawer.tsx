import { useGetConstituenciesQuery } from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { useUpdatePanchayatMutation } from "@/redux/features/masters/panchayatApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const EditPanchayatDrawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const [updatePanchayat] = useUpdatePanchayatMutation();
  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery(
    selectedDistrict ? { district_id: selectedDistrict } : skipToken,
  );

  const onFinish = async (payload: { id: string; name: string }) => {
    try {
      setLoading(true);
      const result = await updatePanchayat(payload).unwrap();
      if (result.status) {
        showToast("Panchayat Updated Successfully");
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

      form.setFieldsValue({
        id: data.id,
        name: data.name,
        code: data.code,
        district_id: data.district_id,
        constituency_id: data.constituency_id,
      });
    }
  }, [data, open, form, constituencies]);

  return (
    <Drawer
      title="Edit Panchayat"
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
            onChange={(value) => setSelectedDistrict(value)}
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
            placeholder="Select a constituency"
            disabled={!selectedDistrict}
            optionLabelProp="label"
          >
            {constituencies.map((constituency: any) => {
              return (
                <Select.Option
                  key={constituency.id}
                  value={constituency.id}
                  label={constituency.name}
                >
                  {constituency.name}
                </Select.Option>
              );
            })}
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

export default EditPanchayatDrawer;
