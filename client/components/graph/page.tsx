"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Gauge,
  UserCheck,
  UserX,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface AttendanceHistory {
  _id: string;
  name: string;
  storedImage: string;
  liveImage: string;
  status: string;
  matched: boolean;
  confidence: number;
  date: string;
  time: string;
}

// Colors kept consistent with the rest of the UI (green/red status pills, indigo accents)
const COLORS = {
  present: "#16a34a", // green-600
  absent: "#dc2626", // red-600
};

export default function AttendanceReportPage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [history, setHistory] = useState<AttendanceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendanceHistory();
  }, []);

  const getAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${apiBaseUrl}/admin/live-image/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteattendance = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `${apiBaseUrl}/admin/live-image/deleteattendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getAttendanceHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?",
    );

    if (!confirmDelete) return;

    await deleteattendance(id);
  };

  // ---------- Derived report stats ----------
  const stats = useMemo(() => {
    const total = history.length;

    const presentCount = history.filter(
      (item) => item.status === "Present",
    ).length;
    const absentCount = total - presentCount;

    const matchedCount = history.filter((item) => item.matched).length;
    const unmatchedCount = total - matchedCount;

    const meanConfidence =
      total === 0
        ? 0
        : (history.reduce((sum, item) => sum + item.confidence, 0) / total) *
          100;

    const matchRate = total === 0 ? 0 : (matchedCount / total) * 100;

    return {
      total,
      presentCount,
      absentCount,
      matchedCount,
      unmatchedCount,
      meanConfidence,
      matchRate,
    };
  }, [history]);

  const chartData = [
    { name: "Present", value: stats.presentCount, fill: COLORS.present },
    { name: "Absent", value: stats.absentCount, fill: COLORS.absent },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
          <p className="text-lg font-semibold">Loading Attendance History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Attendance Report
            </h1>

            <p className="mt-1 text-gray-500">
              AI Face Recognition Attendance Records
            </p>
          </div>

          <div className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white shadow">
            Total Records : {stats.total}
          </div>
        </div>

        {/* ================= Report Summary ================= */}
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-5 lg:col-span-2 lg:grid-cols-2">
            <StatCard
              icon={<Users size={22} className="text-indigo-600" />}
              label="Total Records"
              value={stats.total.toString()}
              accent="bg-indigo-100"
            />
            <StatCard
              icon={<Gauge size={22} className="text-purple-600" />}
              label="Mean Confidence"
              value={`${stats.meanConfidence.toFixed(2)}%`}
              accent="bg-purple-100"
            />
            <StatCard
              icon={<UserCheck size={22} className="text-green-600" />}
              label="Present"
              value={stats.presentCount.toString()}
              sub={
                stats.total > 0
                  ? `${((stats.presentCount / stats.total) * 100).toFixed(1)}% of total`
                  : undefined
              }
              accent="bg-green-100"
            />
            <StatCard
              icon={<UserX size={22} className="text-red-600" />}
              label="Absent"
              value={stats.absentCount.toString()}
              sub={
                stats.total > 0
                  ? `${((stats.absentCount / stats.total) * 100).toFixed(1)}% of total`
                  : undefined
              }
              accent="bg-red-100"
            />
          </div>

          {/* Donut chart */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-1 text-lg font-bold">Present vs Absent</h2>
            <p className="mb-2 text-sm text-gray-500">
              Attendance status breakdown
            </p>

            {stats.total === 0 ? (
              <div className="flex h-[220px] items-center justify-center text-gray-400">
                No data to display
              </div>
            ) : (
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value} (${stats.total > 0 ? ((value / stats.total) * 100).toFixed(1) : 0}%)`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-3 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS.present }}
                />
                Present
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS.absent }}
                />
                Absent
              </div>
            </div>
          </div>
        </div>

        {/* ================= Desktop Table ================= */}

        <div className="hidden overflow-x-auto rounded-3xl bg-white shadow-lg lg:block">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr className="text-left text-gray-700">
                <th className="px-6 py-4">Live Photo</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Matched</th>
                <th>Confidence</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item._id}
                  className="border-t transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={item.liveImage}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />
                  </td>

                  <td className="font-semibold">{item.name}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-blue-600" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} className="text-purple-600" />
                      {item.time}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.matched ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        No
                      </span>
                    )}
                  </td>

                  <td>{(item.confidence * 100).toFixed(2)}%</td>

                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {history.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No Attendance Records Found
            </div>
          )}
        </div>

        {/* ================= Mobile Card View ================= */}

        <div className="mt-5 grid gap-5 lg:hidden">
          {history.map((item) => (
            <div key={item._id} className="rounded-2xl bg-white p-5 shadow-lg">
              <div className="flex items-center gap-4">
                <Image
                  src={item.liveImage}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={15} className="text-blue-600" />

                    {new Date(item.date).toLocaleDateString()}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                    <Clock3 size={15} className="text-purple-600" />

                    {item.time}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Status</p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                      item.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Confidence</p>

                  <p className="mt-1 font-semibold text-indigo-600">
                    {(item.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Matched</p>

                  <div className="mt-1 flex items-center gap-2">
                    {item.matched ? (
                      <>
                        <CheckCircle2 size={18} className="text-green-600" />
                        <span className="text-green-700 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-red-600" />
                        <span className="text-red-700 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow">
              No Attendance Records Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Small presentational component for the summary cards ----------
function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-lg">
      <div className={`mb-3 inline-flex rounded-xl p-2 ${accent}`}>{icon}</div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
