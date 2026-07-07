"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type LeaveForm = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  file: FileList;
};

export default function LeavePage() {
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LeaveForm>();

  const reason = watch("reason") || "";

  const onSubmit = (data: LeaveForm) => {
    console.log(data);

    alert(
      "✅ Your leave request has been sent to your assigned teacher for approval.\n\nPlease wait for the teacher's response.",
    );

    reset();
    setFileName("");
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
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Leave
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
    </div>
  );
}
