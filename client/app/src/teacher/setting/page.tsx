"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function TeacherSettingsPage() {
  const [accuracy, setAccuracy] = useState(85);
  const [autoAttendance, setAutoAttendance] = useState(true);
  const [antiSpoofing, setAntiSpoofing] = useState(true);
  const [liveMonitoring, setLiveMonitoring] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Teacher Settings & AI Attendance Controls
          </h1>
          <p className="text-sm text-gray-500">
            Configure face recognition, attendance automation, and classroom
            monitoring.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow">
          Save Settings
        </button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recognition Accuracy */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Face Recognition Accuracy
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Adjust how strict the AI should be while detecting student faces.
          </p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Accuracy Level</span>
            <span className="text-purple-600 font-semibold">{accuracy}%</span>
          </div>

          <Input
            type="range"
            min="50"
            max="100"
            value={accuracy}
            onChange={(e) => setAccuracy(Number(e.target.value))}
            className="w-full accent-purple-600"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-3">
            <span>LOW &lt; 70%</span>
            <span className="text-purple-600 font-medium">
              MEDIUM 70% - 90%
            </span>
            <span>HIGH &gt; 90%</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Higher accuracy reduces false attendance but may require clearer
            face visibility.
          </p>
        </div>

        {/* Attendance Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Attendance Insights
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Overview of recent attendance activity and system performance.
          </p>

          <div className="text-sm text-gray-600 mb-2">
            Last session: 1 hour ago
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Classes Managed: 3 Active
          </div>

          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div className="h-2 bg-purple-600 rounded-full w-[75%]" />
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>✔ 320 total attendance records</li>
            <li>✔ 98% detection accuracy</li>
          </ul>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl">
            Start Live Attendance
          </button>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          AI System Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auto Attendance */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Automation
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Auto Attendance</span>
              <input
                type="checkbox"
                checked={autoAttendance}
                onChange={() => setAutoAttendance(!autoAttendance)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Automatically mark attendance when a face is recognized.
            </p>
          </div>

          {/* Anti-Spoofing */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Security
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Anti-Spoofing Mode</span>
              <input
                type="checkbox"
                checked={antiSpoofing}
                onChange={() => setAntiSpoofing(!antiSpoofing)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Prevent fake attendance using photos or videos.
            </p>
          </div>

          {/* Live Monitoring */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Monitoring
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Live Monitoring</span>
              <input
                type="checkbox"
                checked={liveMonitoring}
                onChange={() => setLiveMonitoring(!liveMonitoring)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              View real-time face detection during attendance sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full shadow-lg text-xl">
        +
      </button>
    </div>
  );
}
