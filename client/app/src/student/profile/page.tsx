"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Camera,
  ShieldCheck,
  Moon,
  Bell,
  Laptop,
  Smartphone,
} from "lucide-react";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-500 p-1 rounded-full">
                <Camera size={14} className="text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Alex Johnson</h2>
              <p className="text-sm text-gray-500">Student ID: 2024-CS-0842</p>
              <div className="flex gap-3 text-sm text-gray-500 mt-1">
                <span>B.Tech Computer Science</span>
                <span>alex.j@university.edu</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 rounded-lg border text-sm">
              Edit Profile
            </button>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
              Export Data
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* BIOMETRIC */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  Biometric Data Management
                </h3>
                <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
                  98% Confidence
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black rounded-xl h-40 flex items-center justify-center text-white text-sm">
                  Live Camera Preview
                </div>

                <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                  <p className="text-sm text-gray-600">
                    Update your facial recognition model for better accuracy.
                  </p>
                  <button className="mt-4 bg-indigo-600 text-white py-2 rounded-lg text-sm">
                    Start New Capture
                  </button>
                </div>
              </div>
            </div>

            {/* ACADEMIC DETAILS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4">
                Academic Profile Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <Info label="Department" value="School of Computer Science" />
                <Info label="Semester" value="Semester VI (Spring 2024)" />
                <Info label="Advisor" value="Dr. Sarah Mitchell" />
                <Info label="Blood Group" value="O+" />
                <Info label="Address" value="Hostel Block C, Room 402" />
                <Info label="Emergency" value="+1 555 902 3481" />
              </div>
            </div>

            {/* ACCESS LOGS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Recent Access Logs</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="py-2">Date</th>
                      <th>Time</th>
                      <th>Device</th>
                      <th>IP</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {logs.map((log, i) => (
                      <tr key={i} className="border-b last:border-none">
                        <td className="py-2">{log.date}</td>
                        <td>{log.time}</td>
                        <td>{log.device}</td>
                        <td>{log.ip}</td>
                        <td>
                          <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* SECURITY */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-semibold">Security</h3>
              <button className="w-full border rounded-lg py-2 text-sm">
                Change Password
              </button>
              <button className="w-full border rounded-lg py-2 text-sm">
                Two-Factor Auth (Enabled)
              </button>
            </div>

            {/* PREFERENCES */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-semibold">Preferences</h3>

              <Toggle
                label="Dark Mode"
                icon={<Moon size={16} />}
                value={darkMode}
                setValue={setDarkMode}
              />

              <Toggle
                label="Notifications"
                icon={<Bell size={16} />}
                value={notifications}
                setValue={setNotifications}
              />
            </div>

            {/* LOGIN HISTORY */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-semibold">Login History</h3>

              <History icon={<Laptop size={16} />} device="MacBook Pro" />
              <History icon={<Smartphone size={16} />} device="iPhone 15" />
              <History icon={<Laptop size={16} />} device="Windows PC" />
            </div>

            {/* ATTENDANCE */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-3">Attendance Health</h3>
              <p className="text-sm text-gray-500 mb-2">84.2% Overall</p>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-indigo-600 h-2 rounded-full w-[84%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Toggle({
  label,
  icon,
  value,
  setValue,
}: {
  label: string;
  icon: React.ReactNode;
  value: boolean;
  setValue: (v: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </div>
      <button
        onClick={() => setValue(!value)}
        className={`w-10 h-5 rounded-full ${
          value ? "bg-indigo-600" : "bg-gray-300"
        } relative`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
            value ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function History({ icon, device }: { icon: React.ReactNode; device: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {icon}
      <span>{device}</span>
    </div>
  );
}

/* ================= DATA ================= */

const logs = [
  {
    date: "2024-05-20",
    time: "08:45 AM",
    device: "Chrome / Windows",
    ip: "192.168.1.45",
    status: "Success",
  },
  {
    date: "2024-05-19",
    time: "09:12 AM",
    device: "Safari / iPhone",
    ip: "10.0.0.12",
    status: "Success",
  },
  {
    date: "2024-05-18",
    time: "02:30 PM",
    device: "App / iOS",
    ip: "172.16.25.4",
    status: "Success",
  },
];
