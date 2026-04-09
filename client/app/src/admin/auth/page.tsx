"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ScanFace } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-linear-to-br from-indigo-50 to-gray-100 p-8 lg:p-16 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg">
            ⚡
          </div>
          <h1 className="text-2xl font-bold text-indigo-600">AttendX-AI</h1>
        </div>

        {/* Badge */}
        <div className="mb-4">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            ENTERPRISE READY V2.4
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900">
          Next-Generation <br />
          <span className="text-indigo-600 italic">Face Recognition</span>{" "}
          <br />
          Attendance Ecosystem
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-6 max-w-lg">
          Harness the power of high-precision AI to automate tracking, enhance
          security, and generate real-time insights for your institution.
        </p>

        {/* Features */}
        <div className="mt-10 space-y-6">
          <Feature
            title="99.9% Recognition Accuracy"
            desc="Our proprietary neural engine identifies faces in milliseconds, even in varied lighting conditions."
          />
          <Feature
            title="Privacy First Architecture"
            desc="End-to-end encryption and decentralized data storage ensure privacy."
          />
          <Feature
            title="Real-time Synchronization"
            desc="Instant updates across all campus devices and central dashboard."
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 mb-6">
            Please enter your credentials or use face authentication.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email or Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="admin@attendx.ai"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600">
              <label>Password</label>
              <span className="text-indigo-600 cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <Lock size={18} className="text-gray-400 mr-2" />
              <Input
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 text-sm text-gray-600 my-4">
            <Input type="checkbox" />
            <span>Remember this device for 30 days</span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition">
            Sign In to Dashboard →
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">
              OR USE BIOMETRICS
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Face Login */}
          <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <ScanFace size={20} />
            Fast Face Login
          </button>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 mt-8 space-x-4">
            <span>Help Center</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Feature Component */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg">
        ✓
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}
