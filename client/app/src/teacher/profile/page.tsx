"use client";

import { useState } from "react";
import { Mail, Phone, Lock, ShieldCheck, Key } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-200 to-blue-200" />

          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {/**<
                  src="https://i.pravatar.cc/100"
                  className="w-20 h-20 rounded-full border-4 border-white -mt-12"
                /> */}

                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Dr. Sarah Wilson</h2>
                <p className="text-gray-500 text-sm">
                  Computer Science Department • EMP-882910
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
                Contact
              </button>
              <button className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex gap-2 w-fit">
          {["account", "preferences", "security", "update"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-lg capitalize ${
                activeTab === tab ? "bg-gray-100 font-medium" : "text-gray-500"
              }`}
            >
              {tab === "update" ? "Update Profile" : tab}
            </button>
          ))}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock size={18} /> Password & Security
            </h3>
            <p className="text-gray-500 text-sm">
              Manage your authentication methods and password recovery.
            </p>
          </div>

          {/* Password */}
          <div className="border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Account Password</p>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
              <Key size={16} /> Update
            </button>
          </div>

          {/* 2FA */}
          <div className="border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
              Active
            </span>
          </div>

          {/* Recovery */}
          <div>
            <h4 className="font-semibold mb-4">Recovery Methods</h4>

            <div className="border rounded-xl divide-y">
              {/* Email */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Mail size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Recovery Email</p>
                    <p className="text-sm text-gray-500">
                      sarah.wilson@university.edu
                    </p>
                  </div>
                </div>

                <button className="text-sm text-gray-500 hover:text-black">
                  Edit
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Phone size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Recovery Phone</p>
                    <p className="text-sm text-gray-500">+1 (555) 012-3456</p>
                  </div>
                </div>

                <button className="text-sm text-gray-500 hover:text-black">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 flex justify-between">
          <p>© 2024 AttendX-AI. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>v2.1.0-stable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
