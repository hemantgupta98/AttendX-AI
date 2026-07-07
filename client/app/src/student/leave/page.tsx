/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

type LeaveForm = {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  file: string;
};

export default function LeavePage() {
  const [fileName, setFileName] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LeaveForm>();

  const reason = watch("reason") || "";

  const onSubmit = async (data: LeaveForm) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("leaveType", data.leaveType);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("reason", data.reason);

      if (data.file && data.file.length > 0) {
        formData.append("attachment", data.file[0]);
      }

      const res = await axios.post(
        "https://attendx-ai-n8uq.onrender.com/api/student/leave/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      alert(res.data.message);

      reset();
      setFileName("");

      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        "https://attendx-ai-n8uq.onrender.com/api/student/leave/getLeaves",
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

  const deleteLeave = async (id: string) => {
    try {
      const token = localStorage.getItem("studentToken");

      await axios.delete(`${apiBaseUrl}/student/leave/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave?",
    );

    if (!confirmDelete) return;

    await deleteLeave(id);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-gray-600 text-sm">
          Submit and track your academic leave requests.
        </p>
      </div>

      {/* Notice */}
      <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
        <p className="text-sm font-medium text-yellow-800">
          ⚠️ Important Instructions
        </p>

        <ul className="mt-2 list-disc pl-5 text-sm text-yellow-700 space-y-1">
          <li>
            You may apply for only <strong>4 leave requests</strong> in a month.
          </li>
          <li>Fill all required fields before submitting.</li>
          <li>Medical proof is mandatory for extended sick leave.</li>
          <li>Your leave request will be sent to your assigned teacher.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 shadow-sm border">
            {/* Leave Type */}
            <div className="mb-4">
              <label className="text-sm font-medium">
                Leave Type <span className="text-red-500">*</span>
              </label>

              <select
                {...register("leaveType", {
                  required: "Please select leave type",
                })}
                className="w-full mt-1 p-3 rounded-lg border"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
              </select>

              <p className="text-red-500 text-sm mt-1">
                {errors.leaveType?.message}
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">
                  Start Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  className="w-full mt-1 p-3 rounded-lg border"
                />

                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate?.message}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">
                  End Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  {...register("endDate", {
                    required: "End date is required",
                  })}
                  className="w-full mt-1 p-3 rounded-lg border"
                />

                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate?.message}
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label className="text-sm font-medium">
                Reason <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={5}
                maxLength={500}
                {...register("reason", {
                  required: "Reason is required",
                  minLength: {
                    value: 10,
                    message: "Reason should contain at least 10 characters",
                  },
                })}
                className="w-full mt-1 p-3 rounded-lg border resize-none"
                placeholder="Enter reason..."
              />

              <div className="flex justify-between mt-1">
                <p className="text-red-500 text-sm">{errors.reason?.message}</p>

                <p className="text-xs text-gray-500">{reason.length}/500</p>
              </div>
            </div>

            {/* File */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Supporting Document <span className="text-red-500">*</span>
              </label>

              <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("file", {
                    required: "Please upload a document",
                  })}
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setFileName(e.target.files[0].name);
                    } else {
                      setFileName("");
                    }
                  }}
                />

                <label htmlFor="fileUpload" className="cursor-pointer">
                  Click to Upload
                </label>

                {fileName && (
                  <div className="mt-3 text-sm bg-gray-200 inline-block px-3 py-2 rounded-lg">
                    {fileName}
                  </div>
                )}

                <p className="text-red-500 text-sm mt-2">
                  {errors.file?.message}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="border px-5 py-2 rounded-lg"
                onClick={() => {
                  reset();
                  setFileName("");
                }}
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Leave"}
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-2xl border">
              <h3 className="font-semibold mb-3">Leave Policy</h3>

              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Maximum 4 leave requests per month.</li>
                <li>• Submit at least 48 hours in advance.</li>
                <li>• Medical proof required for long sick leave.</li>
                <li>• Maintain at least 75% attendance.</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">My Leave History</h2>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Remove</th>
              </tr>
            </thead>

            <tbody>
              {leaveHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaveHistory.map((leave: any) => (
                  <tr key={leave._id} className="border-t">
                    <td className="p-3">{leave.leaveType}</td>

                    <td className="p-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{leave.totalDays}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(leave.id)}
                        className="mt-2 w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
