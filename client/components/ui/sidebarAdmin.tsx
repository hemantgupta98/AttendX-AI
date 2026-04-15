"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  ShieldUserIcon,
  Settings,
  HelpCircle,
  LogOut,
  Focus,
  UserCheck2,
  User,
  CircleUserIcon,
  ChartColumn,
} from "lucide-react";
const links = [
  { name: "Dashboard", href: "/src/admin/dashboard", icon: LayoutDashboard },
  { name: "Live Attendance", href: "/src/admin/dashboard", icon: Focus },
  { name: "Teacher", href: "/src/admin/dashboard", icon: ShieldUserIcon },
  { name: "Student", href: "/src/admin/dashboard", icon: UserCheck2 },
  { name: "Staff", href: "/src/admin/dashboard", icon: User },
  { name: "Reports", href: "/src/admin/reports", icon: ChartColumn },
  { name: "Profile", href: "/src/admin/profile", icon: CircleUserIcon },
  { name: "Setting", href: "/src/admin/setting", icon: Settings },
  { name: "Help", href: "/src/admin/Help", icon: HelpCircle },
  { name: "Logout", href: "/src/admin/logout", icon: LogOut },
];

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-64 max-w-full shrink-0 overflow-y-auto bg-gray-700 text-[#E5E7EB] shadow-xl border-r flex flex-col cursor-pointer ",
        className,
      )}
    >
      <div className="p-6 text-2xl font-bold text-white">AttendX-AI</div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-600"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
