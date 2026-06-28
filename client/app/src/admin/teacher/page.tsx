/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import axios from "axios";
import Image from "next/image";

type Teachers = {
  institutionId: string;
  name: string;
  gender: string;
  dob: string;
  photo: string;
  teacherNumber: number;
  parentNumber: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  institutionName: string;
  employeeID: string;
  class: string;
  subject: string;
  joiningYear: number;
  email: string;
  status: "Active";
};

export default function TeachersPage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";
  const [search, setSearch] = useState("");
  // FIX: profile should be an array of teachers, not a single object,
  // since we call .filter() on it and render a list of cards.
  const [profile, setProfile] = useState<Teachers[]>([]);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${apiBaseUrl}/admin/connection/getTeachers`,
        {
          headers: {
            // FIX: missing space before the token broke the Authorization header
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      // FIX: the API returns a LIST of teachers, so we map over
      // res.data.data (an array) instead of reading it as one object.
      const rawList: any[] = Array.isArray(res.data?.data) ? res.data.data : [];

      const teachersList: Teachers[] = rawList.map((item: any) => ({
        institutionId: item?.institutionId ?? "",
        name: item?.name ?? "",
        gender: item?.gender ?? "",
        dob: item?.dob ?? "",
        photo: item?.photo ?? "",
        teacherNumber: item?.teacherNumber ?? 0,
        parentNumber: item?.parentNumber ?? 0,
        address: item?.address ?? "",
        city: item?.city ?? "",
        state: item?.state ?? "",
        pincode: item?.pincode ?? "",
        institutionName: item?.institutionName ?? "",
        employeeID: item?.employeeID ?? "",
        class: item?.class ?? "",
        subject: item?.subject ?? "",
        joiningYear: item?.joiningYear ?? 0,
        email: item?.email ?? "",
        status: "Active",
      }));

      setProfile(teachersList);
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
  const filteredTeachers = profile.filter((t: Teachers) =>
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

      {/* FIX: error message is now actually shown to the user */}
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {/* Cards */}

      <div className="bg-white rounded-2xl shadow overflow-hidden p-4">
        {filteredTeachers.length === 0 ? (
          <p className="text-center text-gray-500 py-8 text-sm">
            No teachers found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTeachers.map((teacher: Teachers) => (
              <div
                // FIX: "teacher.id" doesn't exist on the Teachers type.
                // employeeID is the actual unique field available.
                key={teacher.employeeID}
                className="rounded-3xl bg-white p-6 shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top */}
                <div className="flex items-center gap-4">
                  <Image
                    src={teacher.photo || "/logo.png"}
                    alt={teacher.name}
                    // FIX: next/image requires width/height (or fill).
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border-4 border-purple-100 object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-800">
                      {teacher.name}
                    </h2>

                    <p className="text-sm text-slate-500">{teacher.subject}</p>
                  </div>
                </div>

                {/* Information */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Employee ID</span>
                    <span className="font-medium">{teacher.employeeID}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Class</span>
                    <span className="font-medium">{teacher.class}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-medium">{teacher.teacherNumber}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Gender</span>
                    <span className="font-medium">{teacher.gender}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Joining Year</span>
                    <span className="font-medium">{teacher.joiningYear}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-2">Email</span>
                    <p className="font-medium break-all">{teacher.email}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Status
                  </label>

                  <select
                    defaultValue="Active"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Active</option>
                    <option>In Class</option>
                    <option>On Leave</option>
                  </select>
                </div>

                {/* Button */}
                <button className="mt-6 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-700 transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
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
