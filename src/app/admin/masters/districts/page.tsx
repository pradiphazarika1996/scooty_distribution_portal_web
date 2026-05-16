"use client";

import AddDistrictDrawer from "@/components/masters/districts/AddDistrictsDrawer";
import EditDistrictDrawer from "@/components/masters/districts/EditDistrictsDrawer";
import {
  useDeleteDistrictMutation,
  useGetDistrictsQuery,
} from "@/redux/features/masters/districtApi";
import styles from "@/styles/mastersTablePage.module.scss";
import { showError, showToast } from "@/utils/helpers";
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";

const DistrictsPage = () => {
  const [openAddDistrictDrawer, setOpenAddDistrictDrawer] = useState(false);
  const [openEditDistrictDrawer, setOpenEditDistrictDrawer] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [deleteDistrict] = useDeleteDistrictMutation();
  const {
    data: districts = [],
    isLoading: isLoadingDistricts,
    isFetching: isFetchingDistricts,
    refetch: refreshDistricts,
  } = useGetDistrictsQuery();

  const handleEditDistrict = (city: any) => {
    setSelectedDistrict(city);
    setOpenEditDistrictDrawer(true);
  };

  const handleDeleteDistrict = async (id: number) => {
    try {
      const result = await deleteDistrict(id).unwrap();
      if (result?.status) {
        showToast("District deleted successfully");
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
      width: "80%",
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
            onClick={() => handleEditDistrict(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDeleteDistrict(record.id)}
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
      {openAddDistrictDrawer && (
        <AddDistrictDrawer
          open={openAddDistrictDrawer}
          setOpen={setOpenAddDistrictDrawer}
        />
      )}
      {openEditDistrictDrawer && (
        <EditDistrictDrawer
          open={openEditDistrictDrawer}
          setOpen={setOpenEditDistrictDrawer}
          data={selectedDistrict}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1>Districts</h1>
        </div>
        <div className={styles.actions}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddDistrictDrawer(true);
            }}
            className="btn"
            type="primary"
          >
            Add District
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => refreshDistricts()}
            className="btn"
            loading={isFetchingDistricts}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div>
        <Table
          loading={isLoadingDistricts}
          columns={columns}
          dataSource={districts}
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

export default DistrictsPage;
