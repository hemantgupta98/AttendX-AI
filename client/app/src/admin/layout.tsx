import type { ReactNode } from "react";

import AppShellRider from "@/components/layout/AppshellAdmin";

type RiderLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RiderLayout({ children }: RiderLayoutProps) {
  return <AppShellRider>{children}</AppShellRider>;
}
