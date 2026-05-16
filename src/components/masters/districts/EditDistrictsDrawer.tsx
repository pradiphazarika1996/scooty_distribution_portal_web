import { useUpdateDistrictMutation } from "@/redux/features/masters/districtApi";
import { Button, Drawer, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const EditDistrictDrawer: React.FC<DrawerProps> = ({ open, setOpen, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [updateDistrict] = useUpdateDistrictMutation();

  const onFinish = async (payload: { id: string; name: string }) => {
    try {
      setLoading(true);
      const result = await updateDistrict(payload).unwrap();
      if (result.status) {
        showToast("District Updated Successfully");
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
      title="Edit District"
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
        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDistrictDrawer;
