"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
  const buttonStyle =
    "bg-linear-to-r cursor-pointer from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300";
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Image src="/logo.png" height={150} width={150} alt="logo" />
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#id">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className={buttonStyle}>Get Started</button>
          <button className={buttonStyle}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 py-16 max-w-7xl mx-auto">
        <div id="home">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Smart Attendance Powered by{" "}
            <span className="text-indigo-600">AI Face Recognition</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Eliminate proxies, reduce administrative overhead, and get accurate
            attendance data with biometric AI.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
              Start Free Trial
            </button>
            <button className="border px-6 py-3 rounded-xl">Watch Demo</button>
          </div>
          <div className="flex gap-6 mt-8 text-sm text-gray-600">
            <div>
              <strong>500+</strong>
              <br />
              Institutions
            </div>
            <div>
              <strong>1M+</strong>
              <br />
              Daily Scans
            </div>
            <div>
              <strong>99.8%</strong>
              <br />
              Accuracy
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <img
            src="/visily-desktop-homepage.png"
            alt="AI Face Recognition"
            className="rounded-xl w-full"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          Features Built for High Performance
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            "Face Recognition",
            "Real-Time Tracking",
            "Cloud Dashboard",
            "Student Panel",
            "Leave Management",
            "Data Encryption",
          ].map((item) => (
            <div key={item} className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold">{item}</h4>
              <p className="text-sm text-gray-500 mt-2">
                High performance and secure system
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          Deployment in Minutes, Not Days
        </h3>
        <div className="flex flex-col md:flex-row justify-between mt-10 gap-6">
          {[
            "Registration",
            "Face Enrollment",
            "Hardware Setup",
            "Live Insights",
          ].map((step, i) => (
            <div key={i} className="flex-1">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto">
                {i + 1}
              </div>
              <p className="mt-3">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">Transparent Pricing</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {["Starter", "Basic", "Enterprise"].map((plan) => (
            <div key={plan} className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold">{plan}</h4>
              <p className="text-3xl font-bold mt-2">$0</p>
              <ul className="text-sm text-gray-500 mt-4 space-y-2">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
              <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-xl">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl p-10 max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold">
            Ready to transform your attendance?
          </h3>
          <button className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-xl">
            Start Free Pilot
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 text-center text-sm text-gray-600">
        <p>© 2026 AttendX-AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
