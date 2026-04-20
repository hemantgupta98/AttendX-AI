"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";

type Subject = {
  code: string;
  title: string;
  type: string;
  performance: number;
  status: "Healthy" | "Needs Attention";
  students: number;
  nextClass: string;
};

const subjects: Subject[] = [
  {
    code: "CS-AI402",
    title: "Advanced Artificial Intelligence",
    type: "Core Computer Science",
    performance: 88,
    status: "Healthy",
    students: 62,
    nextClass: "Tomorrow, 10:00 AM",
  },
  {
    code: "CS-IP305",
    title: "Digital Image Processing",
    type: "Elective",
    performance: 72,
    status: "Needs Attention",
    students: 48,
    nextClass: "Today, 2:00 PM",
  },
  {
    code: "CS-CC102",
    title: "Cloud Computing",
    type: "Specialization",
    performance: 94,
    status: "Healthy",
    students: 75,
    nextClass: "Wed, 11:30 AM",
  },
  {
    code: "CS-ML401",
    title: "Machine Learning Operations",
    type: "Core Computer Science",
    performance: 81,
    status: "Healthy",
    students: 58,
    nextClass: "Thu, 9:00 AM",
  },
  {
    code: "CS-HI202",
    title: "Human Computer Interaction",
    type: "Elective",
    performance: 91,
    status: "Healthy",
    students: 44,
    nextClass: "Fri, 1:00 PM",
  },
];

export default function TeacherSubjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Teaching Subjects</h1>
          <p className="text-gray-500 mt-2">
            Manage your classes, monitor student performance, and organize your
            teaching schedule.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border">
          <input
            placeholder="Search subject..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none"
          />
          <select className="px-4 py-2 border rounded-lg">
            <option>All Courses</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>Performance High-Low</option>
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

              {/* Class Performance */}
              <div className="border rounded-xl p-4">
                <p className="text-xs text-gray-400">CLASS PERFORMANCE</p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      sub.status === "Needs Attention"
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    {sub.status}
                  </span>
                  <span className="font-semibold">{sub.performance}%</span>
                </div>

                {/* Progress */}
                <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      sub.status === "Needs Attention"
                        ? "bg-red-500"
                        : "bg-indigo-500"
                    }`}
                    style={{ width: `${sub.performance}%` }}
                  />
                </div>
              </div>

              {/* Extra Info */}
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <p className="text-xs text-gray-400">Students</p>
                  <p className="font-medium">{sub.students}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Next Class</p>
                  <p className="font-medium">{sub.nextClass}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="teacher"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">You</p>
                    <p className="text-xs text-gray-400">Instructor</p>
                  </div>
                </div>

                <button className="px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                  Manage →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl border shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total Subjects</p>
            <h3 className="text-xl font-bold">5</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <h3 className="text-xl font-bold">287</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg Performance</p>
            <h3 className="text-xl font-bold">85%</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weekly Classes</p>
            <h3 className="text-xl font-bold">14</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
