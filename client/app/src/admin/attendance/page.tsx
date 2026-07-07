"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CheckCircle2, CalendarDays, Clock3, Camera } from "lucide-react";

interface AttendanceData {
  status: string;
  matched: boolean;

  date: string;
  time: string;
  storedImage: string;
  liveImage: string;
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
        <div>
          <h1 className="text-3xl font-bold">Attendance Details</h1>
          <p className="text-gray-500">Face verification attendance record</p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card
            title="Status"
            value={attendance?.status}
            icon={<CheckCircle2 size={26} className="text-green-600" />}
          />
          <Card
            title="Date"
            value={attendance?.date}
            icon={<CalendarDays size={26} className="text-blue-600" />}
          />
          <Card
            title="Check In"
            value={attendance?.time}
            icon={<Clock3 size={26} className="text-purple-600" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Information */}
            <Section
              title="Attendance Information"
              icon={<CheckCircle2 size={18} />}
            >
              <Grid>
                <InputField
                  label="Attendance Status"
                  value={attendance?.status}
                />
                <InputField
                  label="Face Matched"
                  value={attendance?.matched ? "No" : "Yes"}
                />

                <InputField label="Attendance Date" value={attendance?.date} />
                <InputField label="Check In Time" value={attendance?.time} />
              </Grid>
            </Section>

            {/* Captured Images */}
            <Section title="Captured Images" icon={<Camera size={18} />}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-2 text-sm font-medium">Stored Image</p>
                  <Image
                    src={attendance?.storedImage || "/logo.png"}
                    alt="Stored"
                    width={400}
                    height={300}
                    className="h-72 w-full rounded-xl border object-cover"
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Live Image</p>
                  <Image
                    src={attendance?.liveImage || "/logo.png"}
                    alt="Live"
                    width={400}
                    height={300}
                    className="h-72 w-full rounded-xl border object-cover"
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Location */}

            {/* Quick Summary */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Quick Summary</h3>
              <Stat label="Status" value={attendance?.status} />
              <Stat
                label="Face Match"
                value={attendance?.matched ? "Successful" : "Failed"}
              />

              <Stat label="Date" value={attendance?.date} />
              <Stat label="Time" value={attendance?.time} />
            </div>
          </div>
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

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function InputField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      <input
        readOnly
        value={(value as string) ?? ""}
        className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-gray-800">{value || "-"}</span>
    </div>
  );
}
