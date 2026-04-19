"use client";

import { useState } from "react";
import { RefreshCw, HelpCircle, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";

export default function FaceAttendancePage() {
  const [scanning, setScanning] = useState(true);

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              AI Biometric Verification
            </h1>
            <p className="text-gray-500 text-sm">
              Please ensure you are in a well-lit environment for optimal
              recognition.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm shadow-sm hover:bg-gray-50">
              <RefreshCw size={16} />
              Retake Scan
            </button>

            <button className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT - Camera */}
          <div className="lg:col-span-2 space-y-4">
            {/* Camera Box */}
            <div className="relative bg-white rounded-2xl p-4 shadow-sm">
              <div className="relative rounded-xl overflow-hidden border border-indigo-200">
                <Image src="/logo.png" alt="camera" height={105} width={200} />

                {/* LIVE badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  🔴 LIVE FEED
                </div>

                {/* Overlay corners */}
                <div className="absolute inset-0 border-2 border-indigo-400 rounded-xl pointer-events-none"></div>

                {/* Bottom labels */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="text-xs bg-black/70 text-white px-3 py-1 rounded-full">
                    EXPOSURE: OPTIMAL
                  </span>
                  <span className="text-xs bg-black/70 text-white px-3 py-1 rounded-full">
                    DEPTH: LIDAR ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Scanning Status */}
            <div className="bg-indigo-50 text-indigo-600 rounded-xl px-4 py-3 flex items-center gap-2 text-sm">
              <div className="animate-spin">
                <RefreshCw size={16} />
              </div>
              AI Scanning... Stay still and look at the camera
            </div>

            {/* Button */}
            <button
              disabled={scanning}
              className={`w-full py-3 rounded-xl font-medium transition ${
                scanning
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Confirm & Mark Attendance
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-800">Instructions</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs">
                    1
                  </span>
                  Remove any glasses, masks, or hats that might obstruct facial
                  features.
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs">
                    2
                  </span>
                  Keep a neutral expression and look directly into the camera
                  lens.
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs">
                    3
                  </span>
                  Hold your position until the scanning line completes the full
                  cycle.
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Recent History</h3>
                <button className="text-sm text-indigo-600">View All</button>
              </div>

              <div className="space-y-4 text-sm">
                <HistoryItem
                  subject="Data Structures"
                  time="Yesterday, 10:30 AM"
                  status="present"
                />
                <HistoryItem
                  subject="Mathematics III"
                  time="Oct 22, 09:00 AM"
                  status="present"
                />
                <HistoryItem
                  subject="Digital Electronics"
                  time="Oct 21, 02:15 PM"
                  status="absent"
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-indigo-50 rounded-2xl p-5 text-center space-y-2">
              <ShieldCheck className="mx-auto text-indigo-600" />
              <p className="text-sm text-indigo-600">
                Biometric data is encrypted and never stored on local servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* History Item Component */
function HistoryItem({
  subject,
  time,
  status,
}: {
  subject: string;
  time: string;
  status: "present" | "absent";
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-800 font-medium">{subject}</p>
        <p className="text-gray-400 text-xs">{time}</p>
      </div>

      <span
        className={`px-3 py-1 text-xs rounded-full ${
          status === "present"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {status === "present" ? "Present" : "Absent"}
      </span>
    </div>
  );
}
