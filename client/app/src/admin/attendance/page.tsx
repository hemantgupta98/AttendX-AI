"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CalendarDays, Clock3, CheckCircle2, User } from "lucide-react";

interface AttendanceData {
  name: string;
  photo: string;
  date: string;
  time: string;
  status: string;
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const storedAttendance = sessionStorage.getItem(
          "adminAttendanceDetails",
        );

        if (storedAttendance) {
          setAttendance(JSON.parse(storedAttendance));
          return;
        }

        const res = await axios.get(
          "https://attendx-ai-n8uq.onrender.com/api/admin/verified/attendance",
        );

        setAttendance(res.data);
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
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading Attendance...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-10 text-center text-white">
          <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={attendance?.photo || "/logo.png"}
              alt="User"
              width={150}
              height={150}
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold">{attendance?.name}</h1>

          <p className="mt-2 flex items-center justify-center gap-2 text-green-200">
            <CheckCircle2 size={20} />
            Face Verified Successfully
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-6 p-8 md:grid-cols-3">
          {/* Status */}
          <div className="rounded-2xl border bg-green-50 p-6 text-center shadow-sm">
            <CheckCircle2 size={40} className="mx-auto text-green-600" />

            <h2 className="mt-4 text-xl font-semibold">{attendance?.status}</h2>

            <p className="text-gray-500">Attendance Status</p>
          </div>

          {/* Date */}
          <div className="rounded-2xl border bg-blue-50 p-6 text-center shadow-sm">
            <CalendarDays size={40} className="mx-auto text-blue-600" />

            <h2 className="mt-4 text-lg font-semibold">{attendance?.date}</h2>

            <p className="text-gray-500">Attendance Date</p>
          </div>

          {/* Time */}
          <div className="rounded-2xl border bg-purple-50 p-6 text-center shadow-sm">
            <Clock3 size={40} className="mx-auto text-purple-600" />

            <h2 className="mt-4 text-lg font-semibold">{attendance?.time}</h2>

            <p className="text-gray-500">Check-In Time</p>
          </div>
        </div>

        {/* Details */}
        <div className="border-t p-8">
          <h2 className="mb-6 text-2xl font-bold">Attendance Details</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
              <span className="flex items-center gap-2 font-medium">
                <User size={18} />
                Name
              </span>

              <span>{attendance?.name}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
              <span className="flex items-center gap-2 font-medium">
                <CalendarDays size={18} />
                Date
              </span>

              <span>{attendance?.date}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
              <span className="flex items-center gap-2 font-medium">
                <Clock3 size={18} />
                Time
              </span>

              <span>{attendance?.time}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 size={18} />
                Status
              </span>

              <span className="font-semibold text-green-600">
                {attendance?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
