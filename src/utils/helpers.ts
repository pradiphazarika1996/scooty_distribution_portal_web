import { message } from "antd";

export const showToast = (text: string) => {
  if (typeof text === "string") {
    message.success(text);
  } else {
    message.error("Something went wrong");
  }
};

export const showError = (text: string) => {
  if (typeof text === "string") {
    message.error(text);
  } else {
    message.error("Something went wrong");
  }
};

export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
