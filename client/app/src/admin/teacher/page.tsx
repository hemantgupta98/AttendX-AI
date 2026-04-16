"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";

type Teacher = {
  id: string;
  name: string;
  email: string;
  empId: string;
  subject: string;
  classes: string;
  status: "Active" | "In Class" | "On Leave";
};

const teachersData: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@attendx.edu",
    empId: "EMP-8821",
    subject: "Advanced Physics",
    classes: "Grade 12-A, 11-C",
    status: "In Class",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "m.chen@attendx.edu",
    empId: "EMP-4432",
    subject: "Calculus III",
    classes: "Grade 12-B, 12-D",
    status: "Active",
  },
  {
    id: "3",
    name: "Ms. Elena Rodriguez",
    email: "e.rodriguez@attendx.edu",
    empId: "EMP-9012",
    subject: "English Literature",
    classes: "Grade 10-A, 11-A",
    status: "Active",
  },
  {
    id: "4",
    name: "Mr. David Wilson",
    email: "d.wilson@attendx.edu",
    empId: "EMP-2210",
    subject: "Biology",
    classes: "Grade 9-B, 9-C",
    status: "On Leave",
  },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachersData.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Teachers Management</h1>
          <p className="text-gray-500 text-sm">
            Manage academic staff records and class assignments
          </p>
        </div>

        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700">
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center bg-white border rounded-xl px-3 py-2 w-full">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            className="ml-2 outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 border px-4 rounded-xl bg-white">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-4">Teacher</th>
              <th className="text-left p-4">Employee ID</th>
              <th className="text-left p-4">Subject</th>
              <th className="text-left p-4">Classes</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-gray-500 text-xs">{teacher.email}</div>
                </td>

                <td className="p-4 text-gray-600">{teacher.empId}</td>

                <td className="p-4">{teacher.subject}</td>

                <td className="p-4 text-gray-600">{teacher.classes}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      teacher.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : teacher.status === "In Class"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">Total Teaching Hours</h3>
          <p className="text-xl font-bold mt-1">1,248h</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">Avg. Attendance</h3>
          <p className="text-xl font-bold mt-1">92.4%</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">Punctuality Rate</h3>
          <p className="text-xl font-bold mt-1">98.1%</p>
        </div>
      </div>
    </div>
  );
}
