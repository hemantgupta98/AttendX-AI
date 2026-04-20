"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Upload, Plus } from "lucide-react";

type Student = {
  id: number;
  name: string;
  email: string;
  roll: string;
  class: string;
  section: string;
  status: "Encoded" | "Missing Samples";
  avatar: string;
};

const studentsData: Student[] = [
  {
    id: 1,
    name: "Benjamin Thompson",
    email: "b.thompson@school.edu",
    roll: "2024-CS-01",
    class: "12th Grade",
    section: "A",
    status: "Encoded",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "e.rodriguez@school.edu",
    roll: "2024-CS-02",
    class: "12th Grade",
    section: "B",
    status: "Missing Samples",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Marcus Chen",
    email: "m.chen@school.edu",
    roll: "2024-CS-03",
    class: "11th Grade",
    section: "A",
    status: "Encoded",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Sophie Müller",
    email: "s.muller@school.edu",
    roll: "2024-CS-04",
    class: "12th Grade",
    section: "A",
    status: "Encoded",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "David Okoro",
    email: "d.okoro@school.edu",
    roll: "2024-CS-05",
    class: "10th Grade",
    section: "C",
    status: "Missing Samples",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];

export default function StudentDirectoryPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Student Directory
            </h1>
            <p className="text-gray-500 text-sm">
              Manage student profiles and biometric face data enrollment.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
              <Upload size={16} />
              Upload Face Data
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm">
              <Plus size={16} />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Total Students", value: "1,284", sub: "+12 this month" },
            { title: "Biometric Health", value: "94.2%", sub: "Target: 98%" },
            { title: "Missing Samples", value: "42", sub: "-5 from last week" },
            { title: "Average Attendance", value: "88.5%", sub: "" },
          ].map((card, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-xl font-semibold mt-1">{card.value}</h2>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full max-w-lg">
            <div className="flex items-center w-full border rounded-lg px-3 py-2 bg-white">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, roll no, or email..."
                className="ml-2 w-full outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="p-2 border rounded-lg bg-white">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm border rounded-lg bg-white">
              Active
            </button>
            <button className="px-3 py-2 text-sm border rounded-lg bg-white">
              Archived
            </button>
            <button className="px-3 py-2 text-sm border rounded-lg bg-white">
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="p-3">
                  <input type="checkbox" />
                </th>
                <th className="p-3">Student</th>
                <th className="p-3">Roll Number</th>
                <th className="p-3">Class / Section</th>
                <th className="p-3">Face Data Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>

                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </td>

                  <td className="p-3 text-gray-600">{student.roll}</td>

                  <td className="p-3 text-gray-600">
                    {student.class}
                    <div className="text-xs text-gray-400">
                      Section {student.section}
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        student.status === "Encoded"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button>
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 text-sm text-gray-500">
            <p>Showing 1–5 of 1,284 students</p>

            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded">{"<"}</button>
              <button className="px-3 py-1 bg-gray-200 rounded">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <span>...</span>
              <button className="px-3 py-1 border rounded">128</button>
              <button className="px-2 py-1 border rounded">{">"}</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-xs text-gray-400 pt-4">
          <p>© 2024 AttendX-AI. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>v2.1.0-stable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
