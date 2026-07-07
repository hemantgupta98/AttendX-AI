"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  Camera,
  Brain,
  User,
  ShieldCheck,
  CalendarClock,
  Fingerprint,
  BadgeCheck,
} from "lucide-react";

interface AttendanceData {
  attendanceId: string;
  name: string;
  status: string;
  matched: boolean;
  confidence: number;
  date: string;
  time: string;
  storedImage: string;
  liveImage: string;
  aiResponse: {
    message?: string;
    matched?: boolean;
    confidence?: number;
  };
  createdAt: string;
}

export default function AttendancePage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const stored = sessionStorage.getItem("adminAttendanceDetails");
        if (stored) {
          setAttendance(JSON.parse(stored));
          return;
        }

        const token = localStorage.getItem("auth_token");
        const res = await axios.get(
          `${apiBaseUrl}/admin/live-image/getattendance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setAttendance(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Attendance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-5 md:grid-cols-5">
          <Card
            title="Status"
            value={attendance?.status}
            icon={<ShieldCheck className="text-green-600" />}
          />

          <Card
            title="Face Match"
            value={attendance?.matched ? "Yes" : "No"}
            icon={<CheckCircle2 className="text-blue-600" />}
          />

          <Card
            title="Confidence"
            value={`${attendance?.confidence ?? 0}%`}
            icon={<Brain className="text-purple-600" />}
          />

          <Card
            title="Date"
            value={attendance?.date}
            icon={<CalendarDays className="text-orange-600" />}
          />

          <Card
            title="Time"
            value={attendance?.time}
            icon={<Clock3 className="text-pink-600" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Information */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Avatar */}

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
                  <User className="h-12 w-12 text-indigo-600" />
                </div>

                {/* Name */}

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800">
                    {attendance?.name}
                  </h2>

                  <p className="mt-2 text-gray-500">Attendance ID</p>

                  <p className="font-semibold">{attendance?.attendanceId}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      {attendance?.status}
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        attendance?.matched
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {attendance?.matched ? "Face Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}

              <div className="my-8 border-t"></div>

              {/* Details */}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <InfoCard
                  icon={<BadgeCheck className="text-green-600" />}
                  title="Status"
                  value={attendance?.status}
                />

                <InfoCard
                  icon={<Brain className="text-purple-600" />}
                  title="Confidence"
                  value={`${attendance?.confidence}%`}
                />

                <InfoCard
                  icon={<CalendarClock className="text-orange-600" />}
                  title="Check In"
                  value={`${attendance?.date} • ${attendance?.time}`}
                />
              </div>
            </div>

            {/* Captured Images */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-100 p-3">
                    <Camera className="text-indigo-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Face Verification</h2>

                    <p className="text-gray-500">
                      Stored photo vs Live captured photo
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    attendance?.matched
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {attendance?.matched ? "Matched" : "Not Matched"}
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <FaceCard
                  title="Stored Image"
                  image={attendance?.storedImage}
                  subtitle="Registration Image"
                />

                <FaceCard
                  title="Live Image"
                  image={attendance?.liveImage}
                  subtitle="Captured During Attendance"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold">AI Confidence Score</h3>

              <span className="font-semibold text-indigo-600">
                {attendance?.confidence}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-green-500 to-blue-600 transition-all duration-700"
                style={{
                  width: `${attendance?.confidence ?? 0}%`,
                }}
              />
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm mt-5">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3">
                  <Brain className="text-violet-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">AI Verification Report</h2>

                  <p className="text-gray-500">
                    Generated by Face Recognition Engine
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <ReportCard
                  icon={<ShieldCheck className="text-green-600" />}
                  title="Verification Status"
                  value={attendance?.matched ? "Verified" : "Rejected"}
                />

                <ReportCard
                  icon={<Brain className="text-indigo-600" />}
                  title="Confidence"
                  value={`${((attendance?.confidence ?? 0) * 100).toFixed(2)}%`}
                />

                <ReportCard
                  icon={<CalendarClock className="text-orange-600" />}
                  title="Verification Date"
                  value={attendance?.date}
                />

                <ReportCard
                  icon={<CalendarClock className="text-pink-600" />}
                  title="Verification Time"
                  value={attendance?.time}
                />
              </div>

              <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
                <h3 className="mb-3 text-lg font-semibold">AI Message</h3>

                <p className="text-gray-700">
                  {attendance?.aiResponse?.message ||
                    "Face verification completed successfully."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">{/* Location */}</div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-800">
            {value || "-"}
          </h3>
        </div>
        <div className="rounded-full bg-gray-100 p-3">{icon}</div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-5 transition hover:shadow-md">
      <div className="mb-3">{icon}</div>

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-1 text-lg font-bold text-slate-800">{value || "-"}</h3>
    </div>
  );
}

function FaceCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300 hover:shadow-xl">
      <div className="border-b bg-slate-50 px-5 py-4">
        <h3 className="text-lg font-bold">{title}</h3>

        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="p-5">
        <Image
          src={image || "/logo.png"}
          alt={title}
          width={600}
          height={500}
          className="h-96 w-full rounded-2xl border object-cover transition duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

function ReportCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-6 transition hover:shadow-md">
      <div className="mb-4">{icon}</div>

      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-xl font-bold text-slate-800">{value}</h2>
    </div>
  );
}
