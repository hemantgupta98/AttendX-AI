"use client";

import { useState } from "react";
import { Camera, Square, Cpu, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import Admincamera from "@/components/camera/admin";

export default function LiveAttendancePage() {
  const [sensitivity, setSensitivity] = useState(85);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT PANEL */}
        <div className="col-span-3 space-y-6">
          {/* Camera Selector */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Camera size={18} /> Camera Selector
            </h2>

            <div className="space-y-2">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-700 font-medium">
                ● Main Entrance - North
              </div>
              <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                ● Staff Lounge Area
              </div>
              <div className="p-3 text-gray-400 rounded-lg">
                ● Back Parking Exit (Offline)
              </div>
            </div>
          </div>

          {/* AI Model Settings */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Cpu size={18} /> AI Model Settings
            </h2>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Sensitivity</span>
                <span className="font-medium">{sensitivity}%</span>
              </div>

              <Input
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="text-sm text-gray-500 mb-4">
              Higher sensitivity increases precision but may slow processing.
            </div>

            <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-3">
              <span className="text-sm">FaceNet_v2.4_Stable</span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Active
              </span>
            </div>

            <button className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-sm">
              Switch AI Model
            </button>
          </div>

          {/* Metrics */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Activity size={18} /> Live Stream Metrics
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between bg-gray-100 p-2 rounded">
                <span>Processing Latency</span>
                <span className="font-medium">42ms</span>
              </div>

              <div className="flex justify-between bg-gray-100 p-2 rounded">
                <span>Detections (1m)</span>
                <span className="font-medium">14</span>
              </div>

              <div className="flex justify-between bg-gray-100 p-2 rounded">
                <span>GPU Utilization</span>
                <span className="font-medium">28%</span>
              </div>

              <div className="text-green-600 text-xs mt-2">
                ● Auto-Sync Enabled
              </div>
            </div>
          </div>
        </div>

        {/* CENTER LIVE MONITOR */}
        <div className="col-span-6 bg-white rounded-2xl shadow p-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-semibold text-lg">Live Monitor</h2>
              <p className="text-sm text-gray-500">
                Monitoring: Main Entrance - North
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
                Snapshot
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg flex items-center gap-1">
                <Square size={14} /> Stop Stream
              </button>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 bg-gray-200 rounded-xl flex items-center justify-center relative">
            <Admincamera />
          </div>

          {/* Footer Controls */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex gap-4">
              <span>
                Auto-Attendance:{" "}
                <span className="text-green-600 font-medium">Enabled</span>
              </span>
              <span>
                Recording: <span className="font-medium">Encrypted</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Input type="checkbox" />
              <span>Debug Mesh</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Recognitions</h2>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
              6 Today
            </span>
          </div>

          <div className="space-y-4">
            {[
              { name: "Sarah Jenkins", match: "99.2%" },
              { name: "Michael Chen", match: "98.5%" },
              { name: "Aaliyah Thompson", match: "97.1%" },
              { name: "David Miller", match: "94.8%" },
              { name: "Emma Wilson", match: "99.8%" },
              { name: "Robert Blake", match: "89.2%" },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300" />

                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Main Entrance</p>
                </div>

                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  {user.match}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <button className="flex-1 bg-gray-200 p-2 rounded-lg text-sm">
              View Daily Log
            </button>
            <button className="flex-1 bg-gray-200 p-2 rounded-lg text-sm">
              Full Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
