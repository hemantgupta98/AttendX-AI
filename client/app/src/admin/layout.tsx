import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AppShellRider from "@/components/layout/AppshellAdmin";

type RiderLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RiderLayout({ children }: RiderLayoutProps) {
  const token = (await cookies()).get("token");

  if (!token) {
    redirect("/src/admin/auth");
  }

  return <AppShellRider>{children}</AppShellRider>;
}
