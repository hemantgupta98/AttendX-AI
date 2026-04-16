"use client";

import { useState } from "react";
import Image from "next/image";

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  section: string;
  attendance: number;
  faceStatus: "Ready" | "Low Quality" | "Missing";
  image: string;
}

const studentsData: Student[] = [
  {
    id: "STU-2024-001",
    name: "Alexander Thompson",
    email: "alex.t@school.edu",
    class: "Grade 10",
    section: "A",
    attendance: 94,
    faceStatus: "Ready",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "STU-2024-002",
    name: "Sarah Jenkins",
    email: "sarah.j@school.edu",
    class: "Grade 10",
    section: "B",
    attendance: 88,
    faceStatus: "Ready",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "STU-2024-003",
    name: "Michael Chen",
    email: "m.chen@school.edu",
    class: "Grade 11",
    section: "A",
    attendance: 72,
    faceStatus: "Low Quality",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "STU-2024-004",
    name: "Elena Rodriguez",
    email: "elena.r@school.edu",
    class: "Grade 10",
    section: "A",
    attendance: 96,
    faceStatus: "Ready",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "STU-2024-005",
    name: "James Wilson",
    email: "j.wilson@school.edu",
    class: "Grade 12",
    section: "C",
    attendance: 45,
    faceStatus: "Missing",
    image: "https://i.pravatar.cc/100?img=5",
  },
];

export default function StudentDirectory() {
  const [search, setSearch] = useState("");

  const filtered = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Directory</h1>
          <p className="text-gray-500 text-sm">
            Manage student profiles and attendance
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm">
            Bulk Upload
          </button>
          <button className="px-4 py-2 border rounded-lg text-sm">
            Export
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">
            + Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", value: "1,248" },
          { label: "Enrolled Faces", value: "1,192" },
          { label: "Incomplete Data", value: "56" },
          { label: "Active Classes", value: "24" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-xl font-semibold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="w-full p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Attendance</th>
              <th className="p-3 text-left">Face Data</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">
                  <Image src="/logo.png" alt="logo" height={105} width={105} />
                </td>
                <td className="p-3">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-gray-400 text-xs">{s.email}</p>
                </td>
                <td className="p-3">{s.id}</td>
                <td className="p-3">
                  {s.class} {s.section}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          s.attendance > 85
                            ? "bg-green-500"
                            : s.attendance > 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${s.attendance}%` }}
                      />
                    </div>
                    <span>{s.attendance}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      s.faceStatus === "Ready"
                        ? "bg-green-100 text-green-600"
                        : s.faceStatus === "Low Quality"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.faceStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
