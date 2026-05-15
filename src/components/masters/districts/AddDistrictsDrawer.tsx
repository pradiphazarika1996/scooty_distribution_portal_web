import { useAddDistrictMutation } from "@/redux/features/masters/districtApi";
import { Button, Drawer, Form, Input } from "antd";
import React, { useState } from "react";
import { showError, showToast } from "../../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddDistrictDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [addDistrict] = useAddDistrictMutation();

  const onFinish = async (payload: { name: string }) => {
    setLoading(true);
    try {
      const result = await addDistrict(payload).unwrap();
      if (result.status) {
        showToast("District Added Successfully");
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
      title="Add New District"
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

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddDistrictDrawer;
