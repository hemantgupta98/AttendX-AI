"use client";

import React from "react";
import { Plus } from "lucide-react";
import { AdminReport } from "@/components/graph/adminReport"; // reuse for student trend
import { AdminBarChart } from "@/components/graph/adminBarChart"; // reuse for subject stats

const stats = [
  { title: "Avg. Class Performance", value: "78.6%", change: "+3.2%" },
  { title: "Avg. Attendance", value: "91.4%", change: "+1.8%" },
  { title: "Assignments Submitted", value: "342", change: "+6.5%" },
  { title: "Students Needing Attention", value: "8", change: "-2" },
];

const students = [
  {
    name: "Aarav Sharma",
    class: "10-A",
    attendance: "95%",
    marks: "88%",
    status: "Good",
  },
  {
    name: "Priya Singh",
    class: "10-A",
    attendance: "82%",
    marks: "74%",
    status: "Average",
  },
  {
    name: "Rohan Das",
    class: "10-B",
    attendance: "68%",
    marks: "60%",
    status: "Needs Attention",
  },
  {
    name: "Ananya Gupta",
    class: "10-A",
    attendance: "98%",
    marks: "92%",
    status: "Excellent",
  },
  {
    name: "Kunal Verma",
    class: "10-B",
    attendance: "88%",
    marks: "79%",
    status: "Good",
  },
];

export default function TeacherStudentReportPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Reports</h1>
          <p className="text-gray-500 text-sm">
            Track student performance, attendance, and academic insights.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700">
          <Plus size={18} />
          Create Report Card
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
        {/* Student Progress Trend */}
        <div className="col-span-2 bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-4">Class Performance Trend</h2>
          <AdminReport />
        </div>

        {/* Subject Performance */}
        <div className="flex flex-col gap-6 lg:self-start h-fit">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Subject-wise Performance</h3>
            <AdminBarChart />
          </div>

          {/* Export */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h2 className="font-semibold mb-3">Export Reports</h2>

            <div className="space-y-2">
              <button className="w-full border rounded-lg py-2 text-sm">
                Download Report Cards (PDF)
              </button>
              <button className="w-full border rounded-lg py-2 text-sm">
                Export Student Data (Excel)
              </button>
              <button className="w-full border rounded-lg py-2 text-sm">
                Print Summary
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-red-50 p-5 rounded-xl border">
            <h2 className="font-semibold mb-2 text-red-600">
              Attention Needed
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              8 students are below performance threshold.
            </p>

            <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm">
              View Students
            </button>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="mt-6 bg-white p-5 rounded-xl border shadow-sm">
        <h2 className="font-semibold mb-4">Student Performance List</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Student</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.attendance}</td>
                  <td>{s.marks}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        s.status === "Excellent"
                          ? "bg-green-100 text-green-600"
                          : s.status === "Good"
                            ? "bg-blue-100 text-blue-600"
                            : s.status === "Average"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
