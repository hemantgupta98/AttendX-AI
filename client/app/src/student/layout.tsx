import type { ReactNode } from "react";

import AppShellRider from "@/components/layout/AppshellStudent";

type RiderLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RiderLayout({ children }: RiderLayoutProps) {
  return <AppShellRider>{children}</AppShellRider>;
}
