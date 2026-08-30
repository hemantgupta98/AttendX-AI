/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import Teacher from "@/components/invite/teacher";

type Teachers = {
  id: string;
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
  const [showPopup, setShowPopup] = useState(false);
  const [profile, setProfile] = useState<Teachers[]>([]);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teachers | null>(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${apiBaseUrl}/admin/connection/getTeachers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      const rawList: any[] = Array.isArray(res.data?.teachers)
        ? res.data.teachers
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      const teachersList: Teachers[] = rawList.map((item: any) => ({
        id: item?.id ?? "",
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
  const deleteTeacher = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`${apiBaseUrl}/admin/connection/deleteTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?",
    );

    if (!confirmDelete) return;

    await deleteTeacher(id);
  };

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

        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700"
          onClick={() => setShowPopup(true)}
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 rounded-2xl shadow-2xl">
          <Teacher />
        </div>
      )}

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
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="mt-6 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-700 transition cursor-pointer"
                >
                  View Profile
                </button>
                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(teacher.id)}
                  className="mt-6 w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close teacher details"
            >
              <X size={18} />
            </button>

            <div className="grid gap-0 md:grid-cols-[280px_1fr]">
              <div className="bg-linear-to-br from-purple-600 to-indigo-700 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={selectedTeacher.photo || "/logo.png"}
                    alt={selectedTeacher.name}
                    width={160}
                    height={160}
                    className="h-40 w-40 rounded-full border-4 border-white/40 object-cover shadow-lg"
                  />

                  <h2 className="mt-5 text-2xl font-bold">
                    {selectedTeacher.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    {selectedTeacher.subject}
                  </p>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
                    {selectedTeacher.status}
                  </div>
                </div>
              </div>

              <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8">
                <h3 className="text-xl font-semibold text-slate-900">
                  Teacher Details
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Full profile information for the selected teacher.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Employee ID", selectedTeacher.employeeID],
                    ["Institution ID", selectedTeacher.institutionId],
                    ["Institution Name", selectedTeacher.institutionName],
                    ["Class", selectedTeacher.class],
                    ["Subject", selectedTeacher.subject],
                    ["Joining Year", String(selectedTeacher.joiningYear)],
                    ["Gender", selectedTeacher.gender],
                    ["Date of Birth", selectedTeacher.dob],
                    ["Phone", String(selectedTeacher.teacherNumber)],
                    ["Parent Phone", String(selectedTeacher.parentNumber)],
                    ["Email", selectedTeacher.email],
                    ["Pincode", selectedTeacher.pincode],
                    ["City", selectedTeacher.city],
                    ["State", selectedTeacher.state],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="mt-2 wrap-break-word text-sm font-semibold text-slate-900">
                        {value || "-"}
                      </p>
                    </div>
                  ))}

                  <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Address
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {selectedTeacher.address || "-"}
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
