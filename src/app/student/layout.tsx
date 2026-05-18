import MainLayout from "@/components/common/StudentLayout";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const LOGIN_URL = "/auth/student/login";

export default async function StudentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect(LOGIN_URL);

  let account = null;
  try {
    const response = await axios.get(
      "http://localhost:3001/auth/student/account",
      {
        headers: { Cookie: `access_token=${accessToken}` },
        withCredentials: true,
      },
    );
    account = response.data.data;
  } catch {
    redirect(LOGIN_URL);
  }

  return <MainLayout account={account}>{children}</MainLayout>;
}
