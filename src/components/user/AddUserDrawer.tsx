import { useAddUserMutation } from "@/redux/features/adminDashboard/adminUserApi";
import { Button, Drawer, Form, Input } from "antd";
import React, { useState } from "react";
import { showError, showToast } from "../../utils/helpers";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddUserDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [addUser] = useAddUserMutation();

  const onFinish = async (payload: { name: string }) => {
    setLoading(true);
    console.log(payload);
    try {
      const result = await addUser(payload).unwrap();
      if (result.status) {
        showToast("User Added Successfully");
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
      title="Add New User"
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
              message: "Please enter name",
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone",
            },
          ]}
        >
          <Input placeholder="Enter Phone" />
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

export default AddUserDrawer;
