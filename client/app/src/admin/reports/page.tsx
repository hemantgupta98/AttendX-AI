"use client";

import React from "react";
import { AdminReport } from "@/components/graph/adminReport";
import { AdminBarChart } from "@/components/graph/adminBarChart";
import { Plus } from "lucide-react";

const stats = [
  { title: "Avg. Attendance Rate", value: "94.2%", change: "+2.4%" },
  { title: "Total Late Arrivals", value: "42", change: "-12%" },
  { title: "Unique People Logged", value: "1,284", change: "+5.1%" },
  { title: "Anomaly Alerts", value: "3", change: "+1" },
];

const logs = [
  {
    name: "Sarah Jenkins",
    role: "Student",
    time: "Oct 24, 2024 08:05 AM",
    status: "Present",
    confidence: "99.2%",
  },
  {
    name: "Marcus Chen",
    role: "Student",
    time: "Oct 24, 2024 08:42 AM",
    status: "Late",
    confidence: "98.5%",
  },
  {
    name: "Dr. Elena Rossi",
    role: "Teacher",
    time: "Oct 24, 2024 07:55 AM",
    status: "Present",
    confidence: "99.8%",
  },
  {
    name: "James Wilson",
    role: "Staff",
    time: "Oct 24, 2024 ---",
    status: "Absent",
    confidence: "0%",
  },
  {
    name: "Amara Okafor",
    role: "Student",
    time: "Oct 24, 2024 08:12 AM",
    status: "Present",
    confidence: "97.4%",
  },
];

const btnGradient =
  "w-full relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 text-sm sm:text-base before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-[-20deg] hover:before:left-[100%] before:transition-all before:duration-700";

export default function ReportsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Report Analysis</h1>
          <p className="text-gray-500 text-sm">
            Deep dive into attendance patterns and system performance.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700">
          <Plus size={18} />
          Add Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-xl font-semibold mt-1">{item.value}</h2>
            <span className="text-xs text-green-500">{item.change}</span>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends */}
        <div className="col-span-2 bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-4">Attendance Trends</h2>

          {/*  chart */}
          <AdminReport />
        </div>

        {/* Department Stats */}
        <div className="flex flex-col gap-6 lg:self-start h-fit">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Department Sync</h3>
            <AdminBarChart />
          </div>

          <div className="space-y-4">
            {/* Export */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="font-semibold mb-3">Export Options</h2>

              <div className="space-y-2">
                <button className="w-full border rounded-lg py-2 text-sm">
                  Download PDF Report
                </button>
                <button className="w-full border rounded-lg py-2 text-sm">
                  Export to Excel
                </button>
                <button className="w-full border rounded-lg py-2 text-sm">
                  Print Summary
                </button>
              </div>
            </div>

            {/* Auto Scheduling */}
            <div className="bg-purple-50 p-5 rounded-xl border">
              <h2 className="font-semibold mb-2">Auto-Scheduling</h2>

              <p className="text-sm text-gray-600 mb-2">Weekly Summary</p>

              <p className="text-xs text-gray-500 mb-3">
                Next send: Monday, 8:00 AM
              </p>

              <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm">
                Email Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 mt-5">
        {/* Attendance Log */}
        <div className="col-span-2 bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-4">Today Attendance Log</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="py-2">Person</th>
                  <th>Role</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>AI Confidence</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3">{log.name}</td>
                    <td>{log.role}</td>
                    <td>{log.time}</td>
                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          log.status === "Present"
                            ? "bg-green-100 text-green-600"
                            : log.status === "Late"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td>{log.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
