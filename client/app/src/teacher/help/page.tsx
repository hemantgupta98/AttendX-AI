"use client";

import { Search, MapPin, Wallet, AlertCircle, Phone, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f8f8] text-gray-700 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold">
            How can we assist you with Attendance Management?
          </h1>

          <p className="text-gray-600">
            Find solutions or contact support for issues related to your
            AI-based face attendance system as a teacher.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 text-gray-100" size={20} />
            <input
              placeholder="Search issues like student face not detected, attendance sync errors, class reports..."
              className="w-full bg-[#0b3d6e] border border-blue-500 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Quick Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-green-400">●</span> Quick Help for Teachers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <MapPin className="text-green-500" />
              <div>
                <h3 className="font-semibold">Student Face Not Detected</h3>
                <p className="text-sm text-gray-500">
                  Issues detecting or recognizing student faces during
                  attendance sessions.
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <Wallet className="text-green-500" />
              <div>
                <h3 className="font-semibold">Attendance Sync Problems</h3>
                <p className="text-sm text-gray-500">
                  Attendance not syncing to dashboard or showing incorrect
                  records.
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <AlertCircle className="text-green-500" />
              <div>
                <h3 className="font-semibold">Session or App Issues</h3>
                <p className="text-sm text-gray-500">
                  Problems starting attendance sessions, app crashes, or system
                  lag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Help Topics */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* Account */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">Teacher Account Help</h3>

            <ul className="space-y-2 text-sm">
              <li>Login issues</li>
              <li>Password reset</li>
              <li>Updating profile & subjects</li>
              <li>Access to assigned classes</li>
            </ul>

            <button className="text-green-600 text-sm font-medium">
              View all Account articles
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">Attendance Management</h3>

            <ul className="space-y-2 text-sm">
              <li>Manual attendance override</li>
              <li>Incorrect student marking</li>
              <li>Viewing class attendance reports</li>
              <li>Editing attendance records</li>
            </ul>

            <button className="text-green-600 text-sm font-medium">
              View all Attendance articles
            </button>
          </div>

          {/* System */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">System & AI Help</h3>

            <ul className="space-y-2 text-sm">
              <li>Camera setup for classroom</li>
              <li>Face registration issues</li>
              <li>Low recognition accuracy</li>
              <li>Network or server delays</li>
            </ul>

            <button className="text-green-600 text-sm font-medium">
              View all System articles
            </button>
          </div>
        </section>

        {/* Bottom Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* Contact Support Form */}
          <div className="md:col-span-2 bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="text-lg font-semibold">Contact Support</h3>

            <p className="text-sm text-gray-500">
              Facing issues while managing attendance? Submit your concern and
              our team will assist you.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Issue Type (Detection, Sync, Reports, System)"
                className="bg-gray-100 rounded-lg p-3"
              />

              <input
                placeholder="Priority (Low, Medium, High)"
                className="bg-gray-100 rounded-lg p-3"
              />
            </div>

            <input
              placeholder="Subject (e.g. Attendance report not generating)"
              className="bg-gray-100 rounded-lg p-3 w-full"
            />

            <textarea
              placeholder="Describe the issue in detail..."
              rows={5}
              className="bg-gray-100 rounded-lg p-3 w-full"
            />

            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium">
              Submit Request
            </button>
          </div>

          {/* Right Side Info */}
          <div className="space-y-6">
            {/* Guidelines */}
            <div className="bg-white rounded-xl p-6 text-gray-700 space-y-2">
              <h3 className="font-semibold">Teacher Guidelines</h3>

              <ul className="text-sm space-y-2">
                <li>Attendance policies & rules</li>
                <li>Best practices for face recognition setup</li>
                <li>Using attendance dashboard effectively</li>
                <li>Data privacy & compliance</li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl p-6 text-gray-700 space-y-3">
              <h3 className="font-semibold">Need Immediate Help?</h3>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 1800-TEACH-AI</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>teacher.support@attendx-ai.com</span>
              </div>

              <p className="text-green-500 text-sm">
                Average Response: Within 30 mins
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
