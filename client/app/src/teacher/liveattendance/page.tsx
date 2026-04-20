"use client";

import Image from "next/image";
import { Bell, Camera, Settings, Maximize } from "lucide-react";

type Person = {
  name: string;
  id: string;
  time: string;
  status?: string;
};

const activityData: Person[] = [
  { name: "Michael Chen", id: "CS-2024-042", time: "14:22:05" },
  { name: "Sophia Rodriguez", id: "CS-2024-118", time: "14:21:48" },
  {
    name: "Unknown Subject",
    id: "UNIDENTIFIED",
    time: "14:20:12",
    status: "42.5%",
  },
  { name: "James Wilson", id: "CS-2024-009", time: "14:19:55" },
];

export default function FaceRecognitionUI() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f10] text-white flex">
      {/* MAIN CONTENT */}
      <div className="flex-1 relative bg-[#f5f5f5] text-black">
        {/* TOP SEARCH BAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <input
            placeholder="Search students, classes, or records..."
            className="w-full max-w-lg px-4 py-2 rounded-lg border text-sm outline-none"
          />
          <div className="flex items-center gap-4 ml-4">
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="text-sm">
                <p className="font-medium">Dr. Sarah Wilson</p>
                <p className="text-gray-500 text-xs">Senior Faculty</p>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE LABEL */}
        <div className="absolute top-20 left-6 bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
          LIVE • 1080p @ 60FPS
        </div>

        {/* SESSION CARD */}
        <div className="absolute top-32 left-6 bg-gray-800 text-white p-4 rounded-xl w-64">
          <p className="text-xs text-gray-400">ACTIVE SESSION</p>
          <p className="font-semibold mt-1">Advanced Computer Science</p>
          <p className="text-xs text-gray-400 mt-1">14:00 - 15:30 • Rm 402</p>
        </div>

        {/* CAMERA VIEW */}
        <div className="relative mt-20 flex justify-center">
          <Image
            src="/visily-face-recognition-live.png"
            alt="camera"
            width={900}
            height={500}
            className="rounded-xl"
          />

          {/* FACE BOXES */}
          <div className="absolute top-10 left-40 border-2 border-green-400 w-40 h-48">
            <div className="bg-black/70 text-white text-xs p-1 absolute bottom-0 w-full">
              CONF: 98.4% • ID: MATCH
            </div>
          </div>

          <div className="absolute top-40 right-40 border-2 border-green-400 w-36 h-40">
            <div className="bg-black/70 text-white text-xs p-1 absolute bottom-0 w-full">
              CONF: 82.1% • ID: MATCH
            </div>
          </div>

          <div className="absolute top-0 left-20 border-2 border-red-400 w-32 h-36">
            <div className="bg-black/70 text-white text-xs p-1 absolute bottom-0 w-full">
              CONF: 42.5% • ID: ???
            </div>
          </div>
        </div>

        {/* OPERATOR GUIDE */}
        <div className="absolute bottom-28 left-6 bg-black text-white p-4 rounded-xl w-64">
          <p className="font-semibold mb-3">Operator Guide</p>
          <div className="text-sm space-y-2">
            <p>Confirm Match — ENTER</p>
            <p>Flag Unknown — SPACE</p>
            <p>Manual Search — S</p>
            <p>Switch Camera — TAB</p>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Auto-confirm enabled (≥95%)
          </p>
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-200 px-6 py-3 rounded-xl">
          <Camera className="w-5 h-5" />
          <Maximize className="w-5 h-5" />
          <Settings className="w-5 h-5" />
          <button className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
            Stop Session
          </button>
        </div>
      </div>

      {/* RIGHT ACTIVITY PANEL */}
      <div className="w-80 bg-[#111] p-4 border-l border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold">Activity Log</p>
          <span className="text-xs bg-purple-600 px-2 py-1 rounded">4 New</span>
        </div>

        {/* STATS */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-[#1c1c1c] p-3 rounded-lg text-center">
            <p className="text-xs text-gray-400">TODAY TOTAL</p>
            <p className="text-lg font-semibold">1,248</p>
          </div>
          <div className="flex-1 bg-[#1c1c1c] p-3 rounded-lg text-center">
            <p className="text-xs text-gray-400">SUCCESS RATE</p>
            <p className="text-lg font-semibold text-green-400">99.2%</p>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {activityData.map((person, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm">{person.name}</p>
                <p className="text-xs text-gray-400">ID: {person.id}</p>
              </div>
              <div className="text-xs text-gray-400 text-right">
                <p>{person.time}</p>
                {person.status && (
                  <p className="text-red-400">{person.status}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <button className="w-full mt-6 bg-white text-black py-2 rounded-lg">
          View Full History
        </button>
      </div>
    </div>
  );
}
