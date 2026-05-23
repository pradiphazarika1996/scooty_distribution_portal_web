"use client";

import AddUserDrawer from "@/components/user/AddUserDrawer";
import EditUserDrawer from "@/components/user/EditUserDrawer";

import styles from "@/styles/mastersTablePage.module.scss";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/adminDashboard/adminUserApi";
import { showError, showToast } from "@/utils/helpers";
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";
import { getUserRoleName } from "@/utils/students/application";

const UserPage = () => {
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);
  const [openEditUserDrawer, setOpenEditUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateUser] = useUpdateUserMutation();

  const [deleteUser] = useDeleteUserMutation();
  const {
    data: users = [],
    isLoading: isLoadingExams,
    isFetching: isFetchingExams,
    refetch: refreshExams,
  } = useGetUsersQuery();

  const handleEditUser = (stream: any) => {
    setSelectedUser(stream);
    setOpenEditUserDrawer(true);
  };

  const handleDeleteExam = async (id: number) => {
    try {
      const result = await deleteUser(id).unwrap();
      if (result?.status) {
        showToast("User deleted successfully");
      } else {
        showError(result.message);
      }
    } catch (err: any) {
      showError(err?.data?.message);
    }
  };


  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "6%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "6%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "12%",
      align: "center",
      render: (role: number) => getUserRoleName(role),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      width: "14%",
      render: (record: any) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button
            icon={<EditOutlined />}
            className="btn"
            onClick={() => handleEditUser(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDeleteExam(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} className="btn" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {openAddUserDrawer && (
        <AddUserDrawer
          open={openAddUserDrawer}
          setOpen={setOpenAddUserDrawer}
        />
      )}
      {openEditUserDrawer && (
        <EditUserDrawer
          open={openEditUserDrawer}
          setOpen={setOpenEditUserDrawer}
          data={selectedUser}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1>Users</h1>
        </div>
        <div className={styles.actions}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddUserDrawer(true);
            }}
            className="btn"
            type="primary"
          >
            Add User
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => refreshExams()}
            className="btn"
            loading={isFetchingExams}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingExams}
          columns={columns}
          dataSource={users}
          size="middle"
          bordered={false}
          rowKey={(data) => data.id}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
