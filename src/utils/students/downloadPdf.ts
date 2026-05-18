import axios from "axios";

export const downloadApplicationPdf = async (applicationId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/student/application/${applicationId}/pdf`,
    {
      responseType: "blob",
      withCredentials: true,
    },
  );

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Application_${applicationId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
