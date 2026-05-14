"use client";

import AddPanchayatDrawer from "@/components/masters/panchayat/AddPanchayatsDrawer";
import EditPanchayatDrawer from "@/components/masters/panchayat/EditPanchayatsDrawer";
import {
  useDeletePanchayatMutation,
  useGetPanchayatsQuery,
} from "@/redux/features/masters/panchayatApi";
import { useGetConstituenciesQuery } from "@/redux/features/masters/constituencyApi";
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
import styles from "@/styles/mastersTablePage.module.scss";


const PanchayatsPage = () => {
  const [openAddPanchayatDrawer, setOpenAddPanchayatDrawer] = useState(false);
  const [openEditPanchayatDrawer, setOpenEditPanchayatDrawer] = useState(false);
  const [selectedPanchayat, setSelectedPanchayat] = useState(null);
  const [deletePanchayat] = useDeletePanchayatMutation();
  const {
    data: panchayats = [],
    isLoading: isLoadingPanchayats,
    isFetching: isFetchingPanchayats,
    refetch: refreshPanchayats,
  } = useGetPanchayatsQuery({});
  console.log("data panchayats", panchayats);
  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: constituencies = [] } = useGetConstituenciesQuery({});

  // Create a mapping of district IDs to district names
  const districtMap = districts.reduce((acc: any, district: any) => {
    acc[district.id] = district.name;
    return acc;
  }, {});

  const constituencyMap = constituencies.reduce(
    (acc: any, constituency: any) => {
      acc[constituency.id] = constituency.name;
      return acc;
    },
    {},
  );

  const handleEditPanchayat = (panchayat: any) => {
    setSelectedPanchayat(panchayat);
    setOpenEditPanchayatDrawer(true);
  };

  const handleDeletePanchayat = async (id: number) => {
    try {
      const result = await deletePanchayat(id).unwrap();
      if (result?.status) {
        showToast("Panchayat deleted successfully");
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
      width: "27%",
    },
    {
      title: "District",
      dataIndex: "district_id",
      key: "district_id",
      width: "27%",
      render: (districtId: number) => districtMap[districtId] || "N/A",
    },
    {
      title: "Constituency",
      dataIndex: "constituency_id",
      key: "constituency_id",
      width: "27%",
      render: (constituency_id: number) =>
        constituencyMap[constituency_id] || "N/A",
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
            onClick={() => handleEditPanchayat(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDeletePanchayat(record.id)}
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
      {openAddPanchayatDrawer && (
        <AddPanchayatDrawer
          open={openAddPanchayatDrawer}
          setOpen={setOpenAddPanchayatDrawer}
        />
      )}
      {openEditPanchayatDrawer && (
        <EditPanchayatDrawer
          open={openEditPanchayatDrawer}
          setOpen={setOpenEditPanchayatDrawer}
          data={selectedPanchayat}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1>Panchayats</h1>
        </div>
        <div className={styles.actions}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddPanchayatDrawer(true);
            }}
            className="btn"
            type="primary"
          >
            Add Panchayat
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => refreshPanchayats()}
            className="btn"
            loading={isFetchingPanchayats}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingPanchayats}
          dataSource={panchayats}
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

export default PanchayatsPage;
