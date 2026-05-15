import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import type React from "react";

export type ColorVariant = "primary" | "success" | "error" | "tertiary";

export interface StatCardItem {
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactElement<AntdIconProps>;
  variant: ColorVariant;
  accentSubtitle?: boolean;
}
