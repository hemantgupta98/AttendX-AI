"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AttendancePage() {
  const subjects = [
    {
      name: "Advanced Mathematics",
      code: "MA401",
      total: 42,
      attended: 38,
      progress: 90,
      status: "Healthy",
    },
    {
      name: "Data Structures & Algorithms",
      code: "CS302",
      total: 48,
      attended: 42,
      progress: 87,
      status: "Healthy",
    },
    {
      name: "Operating Systems",
      code: "CS304",
      total: 40,
      attended: 28,
      progress: 70,
      status: "Warning",
    },
    {
      name: "Database Management",
      code: "CS306",
      total: 45,
      attended: 31,
      progress: 68,
      status: "Warning",
    },
    {
      name: "Microprocessors",
      code: "EC201",
      total: 38,
      attended: 22,
      progress: 57,
      status: "Critical",
    },
    {
      name: "Full Stack Development",
      code: "CS405",
      total: 52,
      attended: 49,
      progress: 94,
      status: "Healthy",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Healthy") return "bg-green-100 text-green-600";
    if (status === "Warning") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Academic Records</h1>
            <p className="text-gray-500 text-sm">
              Detailed breakdown of your attendance
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm">
              <FileText size={16} /> PDF Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm">
              <Download size={16} /> CSV Export
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
              Export All
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Filter by subject name or code..."
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2 bg-white rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Subject-wise Breakdown</h2>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                6 Subjects Enrolled
              </span>
            </div>

            {/* Table */}
            <div className="space-y-4">
              {subjects.map((sub, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center text-sm border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-xs text-gray-400">{sub.code}</p>
                  </div>

                  <div>{sub.total}</div>
                  <div className="text-indigo-600">{sub.attended}</div>

                  {/* Progress */}
                  <div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${sub.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {sub.progress}%
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        sub.status,
                      )}`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <button className="text-indigo-600 text-sm">
                    View Detail
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-400 mt-4">
              Attendance updated on May 22, 2024 at 10:45 AM
            </p>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Avg Attendance */}
            <div className="bg-white p-5 rounded-xl">
              <p className="text-sm text-gray-500">AVG. ATTENDANCE</p>
              <h2 className="text-2xl font-semibold mt-1">81.4%</h2>
            </div>

            {/* Classes Remaining */}
            <div className="bg-white p-5 rounded-xl">
              <p className="text-sm text-gray-500">CLASSES REMAINING</p>
              <h2 className="text-2xl font-semibold mt-1">124</h2>
            </div>

            {/* Delivery Breakdown */}
            <div className="bg-white p-5 rounded-xl">
              <p className="text-sm font-medium mb-3">Delivery Breakdown</p>

              <div className="flex justify-between text-sm">
                <span>Theory Health</span>
                <span>78%</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Lab Health</span>
                <span>89%</span>
              </div>
            </div>

            {/* AI Tip */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 rounded-xl">
              <p className="text-sm font-medium mb-2">AI Tip</p>
              <p className="text-sm">
                You need to attend at least{" "}
                <span className="underline font-semibold">4 more labs</span> in
                Microprocessors to stay above the 75% threshold.
              </p>
              <button className="mt-3 text-sm underline">
                Go to Attendance Scan →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="text-green-500" />
            <div>
              <p className="text-sm font-medium">Last Attended</p>
              <p className="text-xs text-gray-500">
                Full Stack Development - Today, 09:30 AM
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl flex items-center gap-3">
            <XCircle className="text-red-500" />
            <div>
              <p className="text-sm font-medium">Missed Session</p>
              <p className="text-xs text-gray-500">
                Operating Systems - Yesterday, 02:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
