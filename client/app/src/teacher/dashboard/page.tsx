"use client";

import { AdminDashboard } from "@/components/graph/admiDasboard";
import { AdminBarChart } from "@/components/graph/adminBarChart";
import {
  ShieldUserIcon,
  Focus,
  UserCheck2,
  User,
  UserStar,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MAIN */}
      <main className="flex-1 p-4 lg:p-6">
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
          <Card icon={UserCheck2} title="Total Students" value="1,284" />
          <Card icon={ShieldUserIcon} title="Total Teachers" value="96" />
          <Card icon={User} title="Total Staff" value="42" />
          <Card icon={UserStar} title="Attendance %" value="94.2%" />
          <Card icon={Focus} title="Active Cameras" value="14/16" />
        </div>

        {/* MIDDLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CHART */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Attendance Analysis</h3>
            <p className="text-sm text-gray-400 mb-4">
              Real-time attendance vs target threshold
            </p>

            {/*  Chart */}

            <AdminDashboard />
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-6 lg:self-start h-fit">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Department Sync</h3>
              <AdminBarChart />
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Quick Hub</h3>

              <QuickBtn label="Start Live Attendance" primary />
              <QuickBtn label="New Student" />
              <QuickBtn label="Manage Teachers" />
              <QuickBtn label="Generate Reports" />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6">
          {/* ACTIVITY */}
          <div className="bg-white p-5 rounded-xl shadow">
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

function Card({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {Icon && <Icon className="w-6 h-6 mb-2" />}
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
