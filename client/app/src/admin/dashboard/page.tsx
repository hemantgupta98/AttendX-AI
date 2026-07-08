"use client";

import {
  useDashboardData,
  useAttendanceTrend,
  useDepartmentStats,
} from "@/lib/hook/adminDas";
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
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();
  const { trend, loading: trendLoading } = useAttendanceTrend();
  const { stats, loading: statsLoading } = useDepartmentStats();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-350 p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* HEADER */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-700 via-blue-700 to-cyan-600 shadow-xl shadow-blue-900/10">
          <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  AttendX AI · Live
                </p>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {data.institutionName || "Your Institution"}
              </h1>
              <p className="mt-2 text-sm text-blue-100/90">
                AI-powered face recognition attendance, monitored in real time
              </p>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  Attendance Mode
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {data.attendanceType || "—"}
                </h2>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  Class Timing
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {data.classTiming ? `${data.classTiming} hrs` : "—"}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Students"
            value={data.student}
            color="from-blue-500 to-indigo-600"
            icon={<GraduationCap size={24} />}
          />
          <StatCard
            title="Teachers"
            value={data.teacher}
            color="from-emerald-500 to-green-600"
            icon={<Users size={24} />}
          />
          <StatCard
            title="Working Days"
            value={data.workingDays}
            color="from-orange-500 to-red-500"
            icon={<CalendarDays size={24} />}
          />
          <StatCard
            title="Active Cameras"
            value={3}
            color="from-purple-500 to-pink-600"
            icon={<Camera size={24} />}
          />
        </div>

        {/* MIDDLE */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:col-span-2">
            {trendLoading ? <ChartSkeleton /> : <AdminDashboard data={trend} />}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              Institution Overview
            </h2>
            <OverviewItem
              icon={<School size={18} />}
              title="Institution"
              value={data.institutionName || "—"}
            />
            <OverviewItem
              icon={<ScanFace size={18} />}
              title="Attendance"
              value={data.attendanceType || "—"}
            />
            <OverviewItem
              icon={<Clock3 size={18} />}
              title="Class Timing"
              value={data.classTiming ? `${data.classTiming} Hours` : "—"}
            />
            <OverviewItem
              icon={<CalendarDays size={18} />}
              title="Working Days"
              value={`${data.workingDays} Days`}
            />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-1 text-lg font-bold text-slate-900">
              Department Performance
            </h2>
            <p className="mb-5 text-sm text-slate-500">
              Attendance sync rate by department
            </p>
            {statsLoading ? (
              <ChartSkeleton height="h-44" />
            ) : (
              <AdminBarChart data={stats} />
            )}
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
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-linear-to-br ${color} opacity-10 blur-3xl`}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${color} text-white shadow-lg`}
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
    <div className="mb-3 flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600">{icon}</div>
        <div>
          <p className="text-xs text-slate-500">{title}</p>
          <p className="text-sm font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton({ height = "h-72" }: { height?: string }) {
  return (
    <div
      className={`${height} w-full animate-pulse rounded-2xl bg-slate-100`}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-350 space-y-6">
        <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
