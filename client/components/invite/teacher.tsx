"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Mail,
  User,
  KeyRound,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  XIcon,
} from "lucide-react";

type Teacher = {
  name: string;
  email: string;
  code: string;
};

export default function StudentInviteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Teacher>();

  const onSubmit: SubmitHandler<Teacher> = async (data) => {
    try {
      setStatus("idle");

      const res = await axios.post(
        "https://attendx-ai-n8uq.onrender.com/api/admin/invite/teacher/mail",
        data,
        {
          withCredentials: true,
        },
      );

      console.log("Invitation sent:", res.data);

      setStatus("success");

      reset();

      // Remove success message after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.error("Failed to send invitation:", error);

      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  };

  return (
    <div className="min-h-45 rounded-2xl shadow-2xl bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-6">
          <div className=" flex justify-between">
            <p className="text-sm font-medium text-indigo-600 mb-2">
              ATTENDANCE MANAGEMENT
            </p>
            <XIcon
              className=" cursor-pointer hover:text-red-500"
              onClick={() => router.back()}
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Invite a Teacher
          </h1>

          <p className="mt-2 text-slate-500">
            Send an invitation email to allow a teacher to join your attendance
            management system.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Teacher Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the teacher information and invitation code.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Student Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Teacher Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Enter Teacher name"
                  {...register("name", {
                    required: "Teacher name is required",
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm outline-none transition
                    ${
                      errors.name
                        ? "border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    }`}
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Teacher Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="teacher@example.com"
                  {...register("email", {
                    required: "Teacher email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm outline-none transition
                    ${
                      errors.email
                        ? "border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    }`}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Invitation Code */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Teacher Invitation Code
              </label>

              <div className="relative">
                <KeyRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Example: SCH-8ZT2BBBB"
                  {...register("code", {
                    required: "Invitation code is required",
                    minLength: {
                      value: 6,
                      message: "Code must contain at least 6 characters",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm outline-none transition
                    ${
                      errors.code
                        ? "border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    }`}
                />
              </div>

              {errors.code && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.code.message}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Get this invitation code from your Profile section.
              </p>
            </div>

            {/* Success Message */}
            {status === "success" && (
              <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <CheckCircle2 size={20} className="text-green-600" />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    Invitation sent successfully!
                  </p>

                  <p className="text-xs text-green-600">
                    The Teacher will receive the invitation email shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertCircle size={20} className="text-red-600" />

                <div>
                  <p className="text-sm font-medium text-red-700">
                    Failed to send invitation
                  </p>

                  <p className="text-xs text-red-600">
                    Please check the email address and try again.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Invitation
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-xs text-slate-400">
          An invitation email containing the signup link and teacher code will
          be sent to the provided email address.
        </p>
      </div>
    </div>
  );
}
