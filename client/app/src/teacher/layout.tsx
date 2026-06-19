import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AppShellRider from "@/components/layout/AppshellTeacher";

type RiderLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RiderLayout({ children }: RiderLayoutProps) {
  const token = (await cookies()).get("token");
  if (!token) {
    redirect("/src/teacher/auth/signup");
  }
  return <AppShellRider>{children}</AppShellRider>;
}
