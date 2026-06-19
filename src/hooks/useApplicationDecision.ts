import {
  useApproveApplicationMutation,
  useRejectApplicationMutation,
} from "@/redux/features/adminDashboard/applicationApi";
import { App } from "antd";
import { useCallback, useState } from "react";

export function useApplicationDecision(id: number) {
  const { message } = App.useApp();
  const [remarks, setRemarks] = useState("");

  const [approveApplication, { isLoading: approving }] =
    useApproveApplicationMutation();
  const [rejectApplication, { isLoading: rejecting }] =
    useRejectApplicationMutation();

  const handleApprove = useCallback(async () => {
    try {
      await approveApplication({
        id,
        remarks: remarks.trim() || undefined,
      }).unwrap();
      message.success("Application approved successfully");
      setRemarks("");
    } catch (err: any) {
      message.error(err?.data?.message ?? "Failed to approve application");
    }
  }, [approveApplication, id, remarks, message]);

  const handleReject = useCallback(async () => {
    try {
      await rejectApplication({
        id,
        remarks: remarks.trim() || undefined,
      }).unwrap();
      message.success("Application rejected successfully");
      setRemarks("");
    } catch (err: any) {
      message.error(err?.data?.message ?? "Failed to reject application");
    }
  }, [rejectApplication, id, remarks, message]);

  return {
    remarks,
    setRemarks,
    approving,
    rejecting,
    handleApprove,
    handleReject,
  };
}
