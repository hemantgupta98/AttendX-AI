"use client";

import { useDashboardData } from "@/lib/hook/adminDas";
import { AdminDashboard } from "@/components/graph/admiDasboard";
import { AdminBarChart } from "@/components/graph/adminBarChart";
import {
  GraduationCap,
  Users,
  CalendarDays,
  Camera,
  School,
  Clock3,
  ScanFace,
} from "lucide-react";

export default function Dashboard() {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="p-6">
        {/* ================= HEADER ================= */}

        <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-blue-100">
                AttendX AI Dashboard
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                {data.institutionName}
              </h1>

              <p className="mt-3 text-blue-100">
                AI Powered Face Recognition Attendance System
              </p>
            </div>

            <div className="mt-6 lg:mt-0 rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100">Attendance Type</p>

              <h2 className="text-2xl font-bold">{data.attendanceType}</h2>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Students"
            value={data.student}
            color="from-blue-500 to-indigo-600"
            icon={<GraduationCap size={28} />}
          />

          <StatCard
            title="Teachers"
            value={data.teacher}
            color="from-emerald-500 to-green-600"
            icon={<Users size={28} />}
          />

          <StatCard
            title="Working Days"
            value={data.workingDays}
            color="from-orange-500 to-red-500"
            icon={<CalendarDays size={28} />}
          />

          <StatCard
            title="Active Cameras"
            value={3}
            color="from-purple-500 to-pink-600"
            icon={<Camera size={28} />}
          />
        </div>

        {/* ================= MIDDLE ================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Attendance Graph */}
          <div className="rounded-3xl bg-white p-6 shadow lg:col-span-2">
            <h2 className="text-xl font-bold">Attendance Analytics</h2>

            <p className="mb-5 text-gray-500">Daily attendance monitoring</p>

            <AdminDashboard />
          </div>

          {/* Institution Overview */}
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold">Institution Overview</h2>

            <OverviewItem
              icon={<School size={20} />}
              title="Institution"
              value={data.institutionName}
            />

            <OverviewItem
              icon={<ScanFace size={20} />}
              title="Attendance"
              value={data.attendanceType}
            />

            <OverviewItem
              icon={<Clock3 size={20} />}
              title="Class Timing"
              value={`${data.classTiming} Hours`}
            />

            <OverviewItem
              icon={<CalendarDays size={20} />}
              title="Working Days"
              value={`${data.workingDays} Days`}
            />
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div className="mt-8">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">Department Performance</h2>

            <AdminBarChart />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Background Glow */}
      <div
        className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${color} opacity-10 blur-3xl`}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">{value}</h2>
        </div>
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function OverviewItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
