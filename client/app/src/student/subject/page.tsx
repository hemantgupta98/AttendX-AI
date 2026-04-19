"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";

type Subject = {
  code: string;
  title: string;
  type: string;
  attendance: number;
  status: "Stable" | "Critical";
  instructor: string;
  avatar: string;
};

const subjects: Subject[] = [
  {
    code: "CS-AI402",
    title: "Advanced Artificial",
    type: "Core Computer Science",
    attendance: 88,
    status: "Stable",
    instructor: "Dr. Sarah Mitchell",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    code: "CS-IP305",
    title: "Digital Image Processing",
    type: "Elective",
    attendance: 72,
    status: "Critical",
    instructor: "Prof. David Chen",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    code: "CS-CC102",
    title: "Cloud Computing",
    type: "Specialization",
    attendance: 94,
    status: "Stable",
    instructor: "Dr. Elena Rodriguez",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    code: "CS-ML401",
    title: "Machine Learning Operations",
    type: "Core Computer Science",
    attendance: 81,
    status: "Stable",
    instructor: "Dr. James Wilson",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    code: "CS-HI202",
    title: "Human Computer Interaction",
    type: "Elective",
    attendance: 91,
    status: "Stable",
    instructor: "Prof. Lisa Wang",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    code: "CS-NS303",
    title: "Cryptography & Network",
    type: "Core Computer Science",
    attendance: 68,
    status: "Critical",
    instructor: "Dr. Robert Black",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Enrolled Subjects</h1>
          <p className="text-gray-500 mt-2">
            Manage your academic progress and track real-time attendance across
            your modules.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border">
          <input
            placeholder="Search subject or faculty..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none"
          />
          <select className="px-4 py-2 border rounded-lg">
            <option>Semester 7</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Instructors</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>Attendance High-Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-sm border space-y-4"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                  {sub.code}
                </span>
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </div>

              {/* Title */}
              <div>
                <h2 className="font-semibold text-lg">{sub.title}</h2>
                <p className="text-sm text-gray-500">{sub.type}</p>
              </div>

              {/* Attendance */}
              <div className="border rounded-xl p-4">
                <p className="text-xs text-gray-400">ATTENDANCE STATUS</p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      sub.status === "Critical"
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    {sub.status}
                  </span>
                  <span className="font-semibold">{sub.attendance}%</span>
                </div>

                {/* Progress */}
                <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      sub.status === "Critical" ? "bg-red-500" : "bg-indigo-500"
                    }`}
                    style={{ width: `${sub.attendance}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{sub.instructor}</p>
                    <p className="text-xs text-gray-400">Lead Instructor</p>
                  </div>
                </div>

                <button className="px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                  Details →
                </button>
              </div>
            </div>
          ))}

          {/* Add Module Card */}
          <div className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-white">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
              +
            </div>
            <h3 className="font-medium">Add New Module</h3>
            <p className="text-sm text-gray-500 mt-1">
              Can’t find a subject? Request enrollment or workshops.
            </p>
            <button className="mt-4 px-4 py-2 border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
              Browse Catalog
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl border shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total Credits</p>
            <h3 className="text-xl font-bold">24.0</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Core Subjects</p>
            <h3 className="text-xl font-bold">4</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Elective Modules</p>
            <h3 className="text-xl font-bold">2</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Faculty Hours</p>
            <h3 className="text-xl font-bold">18h/wk</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
