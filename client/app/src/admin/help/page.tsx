"use client";

import { Search, MapPin, Wallet, AlertCircle, Phone, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f8f8] text-gray-700 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold">
            How can we assist you with your Attendance System?
          </h1>

          <p className="text-gray-600">
            Search help articles or connect with support to resolve issues
            related to your AI face-based attendance system.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 text-gray-100" size={20} />
            <input
              placeholder="Search issues like face detection, attendance errors, reports..."
              className="w-full bg-[#0b3d6e] border border-blue-500 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Quick Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-green-400">●</span> Quick Troubleshooting
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <MapPin className="text-green-500" />
              <div>
                <h3 className="font-semibold">Face Detection Issues</h3>
                <p className="text-sm text-gray-500">
                  Camera not detecting faces or low accuracy in recognition?
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <Wallet className="text-green-500" />
              <div>
                <h3 className="font-semibold">Attendance Not Marked</h3>
                <p className="text-sm text-gray-500">
                  Students or staff attendance not getting recorded properly.
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-700 rounded-xl p-6 flex gap-4">
              <AlertCircle className="text-green-500" />
              <div>
                <h3 className="font-semibold">System Errors / Crash</h3>
                <p className="text-sm text-gray-500">
                  App freezing, crashing, or failing during attendance sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Help Topics */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* Account */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">Admin & Access Control</h3>

            <ul className="space-y-2 text-sm">
              <li>Updating admin credentials</li>
              <li>Password reset</li>
              <li>Managing staff accounts</li>
              <li>Role-based access control</li>
            </ul>

            <button className="text-green-600 text-sm font-medium">
              View all Admin & Access articles
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">Attendance & Reports</h3>

            <ul className="space-y-2 text-sm">
              <li>Manual attendance correction</li>
              <li>Viewing attendance logs</li>
              <li>Generating reports</li>
              <li>Exporting data (Excel/PDF)</li>
            </ul>

            <button className="text-green-600 text-sm font-medium">
              View all Attendance articles
            </button>
          </div>

          {/* System */}
          <div className="bg-white rounded-xl p-6 text-gray-700 space-y-4">
            <h3 className="font-semibold text-lg">System & AI Settings</h3>

            <ul className="space-y-2 text-sm">
              <li>Face data registration</li>
              <li>Camera configuration</li>
              <li>AI accuracy improvement</li>
              <li>Server connectivity issues</li>
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
            <h3 className="text-lg font-semibold">Contact Technical Support</h3>

            <p className="text-sm text-gray-500">
              Unable to resolve the issue? Raise a support ticket and our
              technical team will assist you as soon as possible.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Issue Type (Face Detection, Attendance, System)"
                className="bg-gray-100 rounded-lg p-3"
              />

              <input
                placeholder="Priority Level (Low, Medium, High)"
                className="bg-gray-100 rounded-lg p-3"
              />
            </div>

            <input
              placeholder="Subject (e.g. Attendance not updating)"
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
            {/* Policies */}
            <div className="bg-white rounded-xl p-6 text-gray-700 space-y-2">
              <h3 className="font-semibold">Policies & Guidelines</h3>

              <ul className="text-sm space-y-2">
                <li>Data Privacy Policy</li>
                <li>AI Usage Guidelines</li>
                <li>Institution Compliance Rules</li>
                <li>System Security Standards</li>
              </ul>
            </div>

            {/* Emergency */}
            <div className="bg-white rounded-xl p-6 text-gray-700 space-y-3">
              <h3 className="font-semibold">Priority Support</h3>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 1800-ATTEND-AI</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@attendx-ai.com</span>
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
