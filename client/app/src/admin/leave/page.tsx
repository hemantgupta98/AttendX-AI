"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Clock3,
  Paperclip,
  FileText,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

type LeaveRequest = {
  _id: string;
  name: string;
  email: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  attachment?: string;
  status: LeaveStatus;
  teacherRemark?: string;
  createdAt?: string;
};

const EmployeeLeaveRequests = () => {
  const [activeTab, setActiveTab] = useState<"All" | LeaveStatus>("All");

  const [search, setSearch] = useState("");
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH LEAVES
  // =========================

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://attendx-ai-n8uq.onrender.com/api/employee/leave/getLeaves",
        {
          withCredentials: true,
        },
      );

      console.log("Leave API response:", res.data);

      setLeaveHistory(res.data?.leaves || []);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLeaveHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filteredRequests = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return leaveHistory.filter((leave) => {
      // Tab filter
      const matchesTab = activeTab === "All" || leave.status === activeTab;

      // Search filter
      const matchesSearch =
        !searchValue ||
        leave.name?.toLowerCase().includes(searchValue) ||
        leave.email?.toLowerCase().includes(searchValue) ||
        leave.leaveType?.toLowerCase().includes(searchValue) ||
        leave.reason?.toLowerCase().includes(searchValue) ||
        leave.status?.toLowerCase().includes(searchValue) ||
        leave.teacherRemark?.toLowerCase().includes(searchValue);

      return matchesTab && matchesSearch;
    });
  }, [leaveHistory, activeTab, search]);

  // =========================
  // STATISTICS
  // =========================

  const totalRequests = leaveHistory.length;

  const pendingRequests = leaveHistory.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const approvedRequests = leaveHistory.filter(
    (leave) => leave.status === "Approved",
  ).length;

  const rejectedRequests = leaveHistory.filter(
    (leave) => leave.status === "Rejected",
  ).length;

  // =========================
  // STATUS CHANGE
  // =========================

  const handleStatusChange = async (id: string, status: LeaveStatus) => {
    const action = status === "Approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this leave request?`,
    );

    if (!confirmed) return;

    try {
      // IMPORTANT:
      // Replace this URL with your actual approve/reject API.

      await axios.patch(
        `https://attendx-ai-n8uq.onrender.com/api/employee/leave/${id}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );

      // Update UI immediately
      setLeaveHistory((prev) =>
        prev.map((leave) => (leave._id === id ? { ...leave, status } : leave)),
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] p-6 lg:p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Employee Leave Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View, search, and manage all employee leave requests.
        </p>
      </div>

      {/* ================= SEARCH + TABS ================= */}

      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}

        <div className="relative w-full xl:max-w-xl">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employee, email, leave type, reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Status Tabs */}

        <div className="flex rounded-xl bg-slate-200/70 p-1">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "All" | LeaveStatus)}
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

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
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
                  Attachment
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    Loading leave requests...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((leave) => (
                  <tr
                    key={leave._id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    {/* Employee */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                          {leave.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {leave.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {leave.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Leave Type */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock3 size={16} className="text-sky-500" />

                        {leave.leaveType}
                      </div>
                    </td>

                    {/* Start Date */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>

                    {/* End Date */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>

                    {/* Days */}

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {leave.totalDays}{" "}
                        {leave.totalDays === 1 ? "Day" : "Days"}
                      </span>
                    </td>

                    {/* Reason */}

                    <td className="max-w-[250px] px-5 py-4">
                      <p
                        title={leave.reason}
                        className="truncate text-sm text-slate-500"
                      >
                        {leave.reason}
                      </p>
                    </td>

                    {/* Attachment */}

                    <td className="px-5 py-4">
                      {leave.attachment ? (
                        <a
                          href={leave.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700"
                        >
                          <Paperclip size={15} />
                          View File
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">No File</span>
                      )}
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      {leave.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(leave._id, "Approved")
                            }
                            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(leave._id, "Rejected")
                            }
                            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            leave.status === "Approved"
                              ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                              : "border border-red-200 bg-red-50 text-red-600"
                          }`}
                        >
                          {leave.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredRequests.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {leaveHistory.length}
            </span>{" "}
            leave requests
          </p>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Requests
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              {totalRequests}
            </h2>

            <FileText size={20} className="text-slate-500" />
          </div>
        </div>

        {/* Pending */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pending Approval
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              {pendingRequests}
            </h2>

            <Clock3 size={20} className="text-orange-500" />
          </div>
        </div>

        {/* Approved */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Approved Leaves
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              {approvedRequests}
            </h2>

            <CheckCircle2 size={20} className="text-emerald-500" />
          </div>
        </div>

        {/* Rejected */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Rejected Leaves
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              {rejectedRequests}
            </h2>

            <CalendarDays size={20} className="text-red-500" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeLeaveRequests;
