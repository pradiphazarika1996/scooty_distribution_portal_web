import ReduxProvider from "@/redux/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "../styles/antd-overrides.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAC Scholarship Portal",
  description:
    "A web application for monitoring and improving indoor air quality.",
  manifest: "/site.webmanifest",
};

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = false;
  return (
    <html lang="en" className={publicSans.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm: darkMode
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
              token: {
                colorPrimary: "#8900d4",
                colorInfo: "#8900d4",
                colorSuccess: "#52c41a",
                colorError: "#ba1a1a",
                colorBgBase: "#fff7fd",
                colorTextBase: "#201924",
                borderRadius: 0,
                fontFamily: "'Public Sans', sans-serif",
              },
            }}
          >
            <ReduxProvider>
              <App>{children}</App>
            </ReduxProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
