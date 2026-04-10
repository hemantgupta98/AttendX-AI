"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ChatBotPanel from "../agent/chatbot-panel";
export default function Home() {
  const [step, setStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const next = () => setStep((prev) => Math.min(prev + 1, 6));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-linear-to-br from-indigo-50 to-gray-100 p-8 lg:p-16 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <Image src="/logo.png" height={150} width={150} alt="logo" />
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-100 p-4 transition-all duration-300 ease-out lg:items-center">
        <div
          className={`w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl transition-transform duration-300 ease-out ${
            isChatOpen ? "-translate-y-20 lg:-translate-y-24" : "translate-y-0"
          }`}
        >
          <p className="text-sm text-gray-500 mb-2">Step {step} of 6</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>

          {/* STEP CONTENT */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Institution Details</h2>
              <Input className="input" placeholder="Institution Name" />
              <Input className="input" placeholder="Institution Type" />
              <input className="input" placeholder="Established Year" />
              <input className="input" placeholder="Affiliation / Board" />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location</h2>
              <input className="input" placeholder="Address" />
              <input className="input" placeholder="City" />
              <input className="input" placeholder="State" />
              <input className="input" placeholder="Pincode" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Admin Info</h2>
              <input className="input" placeholder="Full Name" />
              <input className="input" placeholder="Designation" />
              <input className="input" placeholder="Email" />
              <input className="input" placeholder="Phone Number" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Academic</h2>
              <input className="input" placeholder="Departments" />
              <input className="input" placeholder="Courses" />
              <input className="input" placeholder="Total Students" />
              <input className="input" placeholder="Total Staff" />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preferences</h2>
              <input className="input" placeholder="Attendance Type" />
              <input className="input" placeholder="Working Days" />
              <input className="input" placeholder="Minimum Attendance %" />
              <input className="input" placeholder="Class Timing" />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Security</h2>
              <input className="input" placeholder="Email" />
              <input className="input" type="password" placeholder="Password" />
              <input
                className="input"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={prev}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}

            {step < 6 ? (
              <button
                onClick={next}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg">
                Submit
              </button>
            )}
          </div>

          <p className=" text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <span className=" text-blue-400 cursor-pointer"> Log In</span>
          </p>
        </div>

        <style jsx>{`
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}</style>

        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="absolute bottom-5 right-5 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          aria-label="Open chatbot"
        >
          <Image src="/ai.png" height={56} width={56} alt="chatbot" />
        </button>

        {isChatOpen && (
          <div className="fixed inset-0 z-50 bg-black/20 p-4 md:p-6">
            <div className="flex h-full items-end justify-end">
              <div className="w-full max-w-md pb-4 transition-transform duration-300 ease-out md:pb-0">
                <ChatBotPanel onClose={() => setIsChatOpen(false)} />
              </div>
            </div>
          </div>
        )}
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
