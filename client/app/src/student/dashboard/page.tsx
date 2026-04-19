"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { StudentReport } from "@/components/graph/studentReport";
import { StudentDashboard } from "@/components/graph/studentDashboard";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(24);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-2 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, Alex! 👋</h1>
            <p className="text-sm text-gray-500">
              You have <span className="text-indigo-600">3 classes</span>{" "}
              scheduled for today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-sm">
              Live Session: Physics II
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <Calendar size={16} /> Oct 24, 2024
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            title="Overall Attendance"
            value="84.2%"
            color="bg-indigo-500"
          />
          <Card title="Total Present" value="42 Days" color="bg-green-500" />
          <Card title="Total Absent" value="08 Days" color="bg-red-500" />
          <Card title="Pending Leaves" value="02" color="bg-yellow-500" />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Attendance Calendar</h2>

            <div className="grid grid-cols-7 gap-3 text-center text-sm">
              {days.map((day) => (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`p-3 rounded-lg cursor-pointer border 
                    ${
                      selectedDate === day
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Smart Attendance */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-5 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">Smart Attendance</h3>
              <p className="text-sm opacity-90 mb-4">
                Use AI-powered face recognition to mark attendance.
              </p>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg w-full font-medium">
                Scan Face Now
              </button>
            </div>
          </div>

          {/* Chart (Simple Placeholder) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-5 shadow-sm">
            <div>
              <StudentReport />
            </div>
            <div>
              <StudentDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg ${color}`} />
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-lg font-semibold">{value}</h2>
      </div>
    </div>
  );
}
