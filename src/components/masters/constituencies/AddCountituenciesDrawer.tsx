import { useAddConstituencyMutation } from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddConstituencyDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [addConstituency] = useAddConstituencyMutation();
  const {
    data: districts = [],
    isLoading: isLoadingDistricts,
    isFetching: isFetchingDistricts,
  } = useGetDistrictsQuery();
  console.log("data districts", districts);
  const onFinish = async (payload: { name: string }) => {
    setLoading(true);
    try {
      const result = await addConstituency(payload).unwrap();
      if (result.status) {
        showToast("Constituency Added Successfully");
        form.resetFields();
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err: any) {
      showError(err?.data?.message);
      console.log("Error adding constituency:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add New Constituency"
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
          <Select showSearch optionFilterProp="children">
            {districts.map((district: any) => {
              return (
                <Select.Option key={district.id} value={district.id}>
                  {district.name}
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

export default AddConstituencyDrawer;
