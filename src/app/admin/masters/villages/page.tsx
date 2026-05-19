"use client";

import styles from "@/styles/mastersTablePage.module.scss";

import AddClusterDrawer from "@/components/masters/villages/AddVillagesDrawer";
import EditClusterDrawer from "@/components/masters/villages/EditVillagesDrawer";
import {
  useDeleteVillageMutation,
  useGetVillagesQuery,
} from "@/redux/features/masters/villageApi";
import { showError, showToast } from "@/utils/helpers";
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";

const VillagesPage = () => {
  const [openAddClusterDrawer, setOpenAddClusterDrawer] = useState(false);
  const [openEditClusterDrawer, setOpenEditClusterDrawer] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [deleteVillage] = useDeleteVillageMutation();
  const {
    data: clusters = [],
    isLoading: isLoadingClusters,
    isFetching: isFetchingClusters,
    refetch: refreshClusters,
  } = useGetVillagesQuery({});

  const handleEditCluster = (city: any) => {
    setSelectedCluster(city);
    setOpenEditClusterDrawer(true);
  };

  const handleDeleteCluster = async (id: number) => {
    try {
      const result = await deleteVillage(id).unwrap();
      if (result?.status) {
        showToast("Village deleted successfully");
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
      width: "20%",
    },
    {
      title: "District",
      dataIndex: "district_name",
      key: "district_name",
      width: "20%",
    },
    {
      title: "Constituency",
      dataIndex: "constituency_name",
      key: "constituency_name",
      width: "20%",
    },
    // {
    //   title: "Panchayat",
    //   dataIndex: "panchayat_name",
    //   key: "panchayat_name",
    //   width: "30%",
    // },
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
            onClick={() => handleEditCluster(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDeleteCluster(record.id)}
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
      {openAddClusterDrawer && (
        <AddClusterDrawer
          open={openAddClusterDrawer}
          setOpen={setOpenAddClusterDrawer}
        />
      )}
      {openEditClusterDrawer && (
        <EditClusterDrawer
          open={openEditClusterDrawer}
          setOpen={setOpenEditClusterDrawer}
          data={selectedCluster}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1>Villages</h1>
        </div>
        <div className={styles.actions}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddClusterDrawer(true);
            }}
            className="btn"
            type="primary"
          >
            Add Villages
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => refreshClusters()}
            className="btn"
            loading={isFetchingClusters}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div>
        <Table
          loading={isLoadingClusters}
          dataSource={clusters}
          columns={columns}
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

export default VillagesPage;
