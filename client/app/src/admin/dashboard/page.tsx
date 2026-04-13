"use client";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Video,
  FileText,
  Settings,
  Bell,
  Search,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 hidden lg:flex flex-col bg-white border-r p-5">
        <h1 className="text-xl font-bold text-indigo-600 mb-8">AttendX-AI</h1>

        <nav className="space-y-3">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
          />
          <SidebarItem icon={<Video size={18} />} label="Live Attendance" />
          <SidebarItem icon={<Users size={18} />} label="Students" />
          <SidebarItem icon={<UserCheck size={18} />} label="Teachers" />
          <SidebarItem icon={<FileText size={18} />} label="Reports" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="mt-auto text-sm text-gray-400">Sign Out</div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 lg:p-6">
        {/* TOPBAR */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow w-full lg:w-1/2">
            <Search size={18} />
            <input
              placeholder="Search students, teachers, reports..."
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-4 justify-end">
            <Bell />
            <div className="text-right">
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-gray-400">Super Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-500">
            Welcome back, Admin. Here&apos;s a snapshot of today&apos;s
            attendance metrics.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card title="Total Students" value="1,284" />
          <Card title="Total Teachers" value="96" />
          <Card title="Total Staff" value="42" />
          <Card title="Attendance %" value="94.2%" />
          <Card title="Active Cameras" value="14/16" />
        </div>

        {/* MIDDLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CHART */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Attendance Analysis</h3>
            <p className="text-sm text-gray-400 mb-4">
              Real-time attendance vs target threshold
            </p>

            {/* Fake Chart */}
            <div className="h-56 bg-gradient-to-t from-indigo-200 to-transparent rounded-lg flex items-end p-4">
              <div className="w-full h-2/3 bg-indigo-400 rounded-lg" />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Department Sync</h3>

            {["Engineering", "Medical", "Arts", "Business", "Law"].map(
              (d, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm">{d}</p>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-indigo-500 rounded w-[70%]" />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ACTIVITY */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Live Activity Feed</h3>

            {[
              "Sarah Jenkins - Student",
              "Dr. Robert Fox - Teacher",
              "Unknown Subject - Alert",
              "System AI Update",
              "James Wilson - Staff",
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-3 text-sm"
              >
                <span>{item}</span>
                <span className="text-gray-400">2 min ago</span>
              </div>
            ))}
          </div>

          {/* QUICK HUB */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Quick Hub</h3>

            <QuickBtn label="Start Live Attendance" primary />
            <QuickBtn label="New Student" />
            <QuickBtn label="Manage Teachers" />
            <QuickBtn label="Generate Reports" />
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="bg-white p-5 rounded-xl shadow mt-6">
          <h3 className="font-semibold mb-4">System Health</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <Health label="Database Sync" status="Stable" />
            <Health label="AI Engine v2.4" status="Optimal" />
            <Health label="Storage Capacity" status="82% Full" />
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

function QuickBtn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-lg mb-3 ${
        primary ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function Health({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">{status}</span>
    </div>
  );
}
