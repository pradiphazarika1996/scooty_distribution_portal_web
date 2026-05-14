"use client";

import styles from "@/styles/mastersTablePage.module.scss";

import AddConstituencyDrawer from "@/components/masters/constituencies/AddCountituenciesDrawer";
import EditConstituencyDrawer from "@/components/masters/constituencies/EditConstituenciesDrawer";
import {
  useDeleteConstituencyMutation,
  useGetConstituenciesQuery,
} from "@/redux/features/masters/constituencyApi";
import { useGetDistrictsQuery } from "@/redux/features/masters/districtApi";
import { showError, showToast } from "@/utils/helpers";
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";

const ConstituenciesPage = () => {
  const [openAddConstituencyDrawer, setOpenAddConstituencyDrawer] =
    useState(false);
  const [openEditConstituencyDrawer, setOpenEditConstituencyDrawer] =
    useState(false);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [deleteConstituency] = useDeleteConstituencyMutation();
  const {
    data: constituencies = [],
    isLoading: isLoadingConstituencies,
    isFetching: isFetchingConstituencies,
    refetch: refreshConstituencies,
  } = useGetConstituenciesQuery({});
  const { data: districts = [] } = useGetDistrictsQuery();

  // Create a mapping of district IDs to district names
  const districtMap = districts.reduce((acc: any, district: any) => {
    acc[district.id] = district.name;
    return acc;
  }, {});
  const handleEditConstituency = (city: any) => {
    setSelectedConstituency(city);
    setOpenEditConstituencyDrawer(true);
  };

  const handleDeleteConstituency = async (id: number) => {
    try {
      const result = await deleteConstituency(id).unwrap();
      if (result?.status) {
        showToast("Constituency deleted successfully");
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
      width: "40%",
    },
    {
      title: "District",
      dataIndex: "district_name",
      key: "district_name",
      width: "40%",
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
            onClick={() => handleEditConstituency(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDeleteConstituency(record.id)}
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
      {openAddConstituencyDrawer && (
        <AddConstituencyDrawer
          open={openAddConstituencyDrawer}
          setOpen={setOpenAddConstituencyDrawer}
        />
      )}
      {openEditConstituencyDrawer && (
        <EditConstituencyDrawer
          open={openEditConstituencyDrawer}
          setOpen={setOpenEditConstituencyDrawer}
          data={selectedConstituency}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1>Constituencies</h1>
        </div>
        <div className={styles.actions}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddConstituencyDrawer(true);
            }}
            className="btn"
            type="primary"
          >
            Add Constituency
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => refreshConstituencies()}
            className="btn"
            loading={isFetchingConstituencies}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div>
        <Table
          loading={isLoadingConstituencies}
          columns={columns}
          dataSource={constituencies}
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

export default ConstituenciesPage;
