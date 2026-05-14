import { useUpdateConstituencyMutation } from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const EditConstituencyDrawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { data: districts = [] } = useGetDistrictsQuery();

  const [updateConstituency] = useUpdateConstituencyMutation();
  const onFinish = async (payload: { id: string; name: string }) => {
    try {
      setLoading(true);
      const result = await updateConstituency(payload).unwrap();
      if (result.status) {
        showToast("Constituency Updated Successfully");
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
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Drawer
      title="Edit Constituency"
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

export default EditConstituencyDrawer;
