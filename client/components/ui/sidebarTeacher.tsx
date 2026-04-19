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
  CircleUserIcon,
  ChartColumn,
} from "lucide-react";
const links = [
  { name: "Dashboard", href: "/src/teacher/dashboard", icon: LayoutDashboard },
  { name: "Live Attendance", href: "/src/teacher/liveattendance", icon: Focus },
  { name: "Students", href: "/src/teacher/student", icon: UserCheck2 },
  { name: "Salary", href: "/src/teacher/salary", icon: ShieldUserIcon },
  { name: "Report", href: "/src/teacher/reports", icon: ChartColumn },
  { name: "Leave", href: "/src/teacher/leave", icon: ChartColumn },
  { name: "Profile", href: "/src/teacher/profile", icon: CircleUserIcon },
  { name: "Setting", href: "/src/teacher/setting", icon: Settings },
  { name: "Help", href: "/src/teacher/help", icon: HelpCircle },
  { name: "Logout", href: "/src/teacher/logout", icon: LogOut },
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
