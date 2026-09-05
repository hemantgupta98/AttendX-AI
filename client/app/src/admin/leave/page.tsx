/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Clock3,
  Paperclip,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { useForm } from "react-hook-form";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

type LeaveForm = {
  _id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  file: string;
};

const StudentLeaveRequests = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const filteredRequests = requests.filter((item) => {
    const matchesTab = activeTab === "All" ? true : item.status === activeTab;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.leaveType.toLowerCase().includes(searchValue) ||
      item.reason.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue);

    return matchesTab && matchesSearch;
  });

  const handleStatusChange = (id: number, status: LeaveStatus) => {
    const action = status === "Approved" ? "accept" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this leave request?`,
    );

    if (!confirmed) return;

    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    );
  };
  const statusStyles = {
    Pending: "bg-orange-50 text-orange-600 border border-orange-200",
    Approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    Rejected: "bg-red-50 text-red-600 border border-red-200",
  };

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        "https://attendx-ai-n8uq.onrender.com/api/employee/leave/getLeaves",
        {
          withCredentials: true,
        },
      );

      setLeaveHistory(res.data.leaves || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f8fc] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Teacher Leave Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View, search, and manage all teacher leave requests and leave records.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative w-full xl:max-w-xl">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search student, leave type, reason, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl bg-slate-200/70 p-1">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-white text-slate-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-262.5">
            <thead className="border-b border-slate-200 bg-slate-50/70">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Teacher
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Leave Type
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Start Date
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  End Date
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Days
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Reason
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Files
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                >
                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                        {teacher.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {teacher.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {teacher.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Leave Type */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 size={16} className="text-sky-500" />

                      <span>{teacher.leaveType}</span>
                    </div>
                  </td>

                  {/* Start Date */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {teacher.startDate}
                  </td>

                  {/* End Date */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {teacher.endDate}
                  </td>

                  {/* Days */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {teacher.days} {teacher.days === 1 ? "Day" : "Days"}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="max-w-42.5 truncate px-5 py-4 text-sm text-slate-500">
                    {teacher.reason}
                  </td>

                  {/* Files */}
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700">
                      <Paperclip size={15} />

                      <span>{teacher.files || "No"} Files</span>
                    </button>
                  </td>

                  {/* Status */}
                  {/* Action */}
                  <td className="px-5 py-4">
                    {teacher.status === "Pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(teacher.id, "Approved")
                          }
                          className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-600"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(teacher.id, "Rejected")
                          }
                          className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          teacher.status === "Approved"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "border border-red-200 bg-red-50 text-red-600"
                        }`}
                      >
                        {teacher.status === "Approved"
                          ? "Accepted"
                          : "Rejected"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-sm text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing 1-{filteredRequests.length} of {filteredRequests.length}{" "}
            requests
          </p>

          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronLeft size={17} />
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-medium text-white">
              1
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-600 hover:bg-slate-100">
              2
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-600 hover:bg-slate-100">
              3
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Requests
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">1,284</h2>
            </div>

            <FileText size={19} className="text-slate-500" />
          </div>

          <p className="mt-2 text-sm text-slate-500">+12% from last month</p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pending Approval
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">24</h2>
            </div>

            <Clock3 size={19} className="text-orange-500" />
          </div>

          <p className="mt-2 text-sm text-slate-500">Requires your attention</p>
        </div>

        {/* Approved */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Approved Leaves
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">842</h2>
            </div>

            <CheckCircle2 size={19} className="text-emerald-500" />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Confirmed attendance impact
          </p>
        </div>

        {/* Students on Leave */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Students on Leave
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">8</h2>
            </div>

            <CalendarDays size={19} className="text-sky-500" />
          </div>

          <p className="mt-2 text-sm text-slate-500">Active for today</p>
        </div>
      </div>
    </main>
  );
};

export default StudentLeaveRequests;
