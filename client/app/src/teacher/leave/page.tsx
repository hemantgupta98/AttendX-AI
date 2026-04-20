"use client";

import { useState } from "react";
import { X, Calendar, Paperclip } from "lucide-react";

export default function LeavePage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Modal */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">
            {/* Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Apply for Leave
                </h2>
                <p className="text-sm text-gray-500">
                  Submit a new request for time off
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="mt-6 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leave Type */}
                <div>
                  <label className="text-sm text-gray-600">Leave Type</label>
                  <input
                    type="text"
                    placeholder=""
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Backup Person */}
                <div>
                  <label className="text-sm text-gray-600">
                    Backup Person (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Search colleague..."
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                  <label className="text-sm text-gray-600">Start Date</label>
                  <div className="relative mt-1">
                    <Calendar
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      type="date"
                      defaultValue="2024-05-20"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="text-sm text-gray-600">End Date</label>
                  <div className="relative mt-1">
                    <Calendar
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      type="date"
                      defaultValue="2024-05-24"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-sm text-gray-600">
                  Reason for Leave
                </label>
                <textarea
                  placeholder="Please provide a brief explanation for your request..."
                  rows={4}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="text-sm text-gray-600">
                  Supporting Documents
                </label>

                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                  <Paperclip className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
