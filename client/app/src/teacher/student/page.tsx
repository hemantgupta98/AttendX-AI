/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";

type Students = {
  id: string;
  institutionId: string;
  name: string;
  gender: string;
  dob: string;
  photo: string;
  studentNumber: number;
  parentNumber: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  institutionName: string;
  studentID: string;
  class: string;
  stream: string;
  admissionYear: number;
  email: string;
  status: "Active";
};

export default function TeachersPage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [profile, setProfile] = useState<Students[]>([]);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${apiBaseUrl}/admin/connection/getStudents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      const rawList: any[] = Array.isArray(res.data?.student)
        ? res.data.student
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      const studentList: Students[] = rawList.map((item: any) => ({
        id: item.id ?? "",
        institutionId: item?.institutionId ?? "",
        name: item?.name ?? "",
        gender: item?.gender ?? "",
        dob: item?.dob ?? "",
        photo: item?.photo ?? "",
        studentNumber: item?.studentNumber ?? 0,
        parentNumber: item?.parentNumber ?? 0,
        address: item?.address ?? "",
        city: item?.city ?? "",
        state: item?.state ?? "",
        pincode: item?.pincode ?? "",
        institutionName: item?.institutionName ?? "",
        studentID: item?.studentID ?? "",
        class: item?.class ?? "",
        stream: item?.stream ?? "",
        admissionYear: item?.admissionYear ?? 0,
        email: item?.email ?? "",
        status: "Active",
      }));

      setProfile(studentList);
      setError("");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // FIX: now works because profile is an array.
  const filteredStudents = profile.filter((t: Students) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Student Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage student records, admission details, academic information, and
            profile updates from one place.
          </p>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700 transition"
          onClick={() => setShowPopup(true)}
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-3 text-xl font-bold text-gray-800">
              Institution Code Required
            </h2>

            <p className="text-gray-600">
              Please share your{" "}
              <span className="font-semibold">Institution Code</span> from the{" "}
              <span className="font-semibold">Profile</span> section with the
              student. They will need this code during registration to join your
              institution.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="rounded-lg bg-purple-600 cursor-pointer px-5 py-2 text-white hover:bg-purple-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        {/* Search */}

        <div className="flex flex-1 items-center rounded-xl border bg-white px-4 py-3 shadow-sm">
          <Search size={20} className="text-slate-400" />

          <input
            placeholder="Search by name, Student ID, email..."
            className="ml-3 w-full bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
      </div>

      {/* FIX: error message is now actually shown to the user */}
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {/* Cards */}

      {filteredStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            No Students Found
          </h2>
          <p className="mt-2 max-w-md text-center text-slate-500">
            There are currently no students available. Click the button below to
            add your first student.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-275 w-full">
              <thead className="bg-slate-100">
                <tr className="text-left text-sm font-semibold text-slate-700">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Student ID</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Stream</th>
                  <th className="px-6 py-4">Gender</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                  <th className="px-6 py-4 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.studentID}
                    className="border-t hover:bg-slate-50 transition-all duration-200"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={student.photo || "/logo.png"}
                          alt={student.name}
                          width={50}
                          height={50}
                          className="rounded-full border object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {student.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {student.institutionName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="px-6 py-4 font-medium">
                      {student.studentID}
                    </td>

                    {/* Class */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-indigo-700 font-medium">
                        {student.class}
                      </span>
                    </td>

                    {/* Stream */}
                    <td className="px-6 py-4">{student.stream}</td>

                    {/* Gender */}
                    <td className="px-6 py-4">{student.gender}</td>

                    {/* Phone */}
                    <td className="px-6 py-4">{student.studentNumber}</td>

                    {/* Email */}
                    <td className="px-6 py-4 text-slate-600">
                      {student.email}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        Active
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No students found.
            </div>
          )}
        </div>
      )}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-[320px_1fr]">
              {/* Left Side */}
              <div className="bg-linear-to-br from-indigo-600 via-purple-600 to-violet-700 p-8 text-white">
                <div className="flex flex-col items-center">
                  <Image
                    src={selectedStudent.photo || "/logo.png"}
                    alt={selectedStudent.name}
                    width={170}
                    height={170}
                    className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
                  />

                  <h2 className="mt-5 text-2xl font-bold">
                    {selectedStudent.name}
                  </h2>

                  <p className="mt-1 text-white/80">Student</p>

                  <span className="mt-4 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                    {selectedStudent.status}
                  </span>

                  <div className="mt-8 w-full space-y-4">
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs text-white/70">Student ID</p>
                      <p className="font-semibold">
                        {selectedStudent.studentID}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs text-white/70">Class</p>
                      <p className="font-semibold">{selectedStudent.class}</p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs text-white/70">Stream</p>
                      <p className="font-semibold">{selectedStudent.stream}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}

              <div className="max-h-[85vh] overflow-y-auto p-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Student Details
                </h2>

                <p className="mt-1 text-slate-500">
                  Complete information about the selected student.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {[
                    ["Student ID", selectedStudent.studentID],
                    ["Institution ID", selectedStudent.institutionId],
                    ["Institution Name", selectedStudent.institutionName],
                    ["Class", selectedStudent.class],
                    ["Stream", selectedStudent.stream],
                    ["Admission Year", selectedStudent.admissionYear],
                    ["Gender", selectedStudent.gender],
                    ["Date of Birth", selectedStudent.dob],
                    ["Student Number", selectedStudent.studentNumber],
                    ["Parent Number", selectedStudent.parentNumber],
                    ["Email", selectedStudent.email],
                    ["City", selectedStudent.city],
                    ["State", selectedStudent.state],
                    ["Pincode", selectedStudent.pincode],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </p>

                      <p className="mt-2 wrap-break-word text-base font-semibold text-slate-800">
                        {value || "-"}
                      </p>
                    </div>
                  ))}

                  {/* Address */}

                  <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Address
                    </p>

                    <p className="mt-2 text-base font-semibold text-slate-800">
                      {selectedStudent.address || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
