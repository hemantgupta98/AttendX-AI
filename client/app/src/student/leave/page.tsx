"use client";

import { useState } from "react";

export default function LeavePage() {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white p-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-gray-400 text-sm">
          Submit and track your academic leave requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - FORM */}
        <div className="lg:col-span-2 bg-[#1a1a22] rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-1">Apply for Leave</h2>
          <p className="text-gray-400 text-sm mb-6">
            Please provide accurate details for official records.
          </p>

          {/* Leave Type */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#0f0f14] border border-gray-700 focus:outline-none"
            >
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400">Start Date</label>
              <input
                type="date"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f0f14] border border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">End Date</label>
              <input
                type="date"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f0f14] border border-gray-700"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">Reason for Leave</label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason..."
              className="w-full mt-1 p-3 rounded-lg bg-[#0f0f14] border border-gray-700 resize-none"
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              {reason.length}/500
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="text-sm text-gray-400">
              Supporting Documents (Optional)
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500 transition">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <p className="text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG or PNG (Max 5MB)
                </p>
              </label>

              {file && (
                <div className="mt-4 text-sm bg-[#0f0f14] p-2 rounded-lg inline-block">
                  {file.name}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white text-sm">
              ← Back to Dashboard
            </button>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-sm">
                Save Draft
              </button>
              <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-medium">
                Submit Application →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Attendance Card */}
          <div className="bg-[#1a1a22] p-5 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-400">Current Standing</p>
            <h2 className="text-3xl font-bold mt-1">84.2%</h2>
            <p className="text-green-400 text-sm mt-1">Safe Zone</p>

            <div className="w-full h-2 bg-gray-700 rounded-full mt-3">
              <div className="w-[84%] h-full bg-purple-500 rounded-full"></div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Applying for 2 days will reduce this to approx 82.8%
            </p>
          </div>

          {/* Policy */}
          <div className="bg-[#1a1a22] p-5 rounded-2xl border border-purple-500">
            <h3 className="font-semibold mb-3">Leave Policy</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Submit requests at least 48 hours in advance</li>
              <li>• Medical proof required for 2+ sick days</li>
              <li>• Maintain 75% attendance</li>
            </ul>
          </div>

          {/* Help */}
          <div className="bg-[#1a1a22] p-5 rounded-2xl">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-400 mb-3">
              Unsure about leave type? Contact academic office.
            </p>
            <button className="text-purple-400 text-sm hover:underline">
              View Academic Handbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
