"use client";

import React from "react";
import Image from "next/image";
import HomeGraph from "@/components/ui/homegraph";
import Footer from "@/components/ui/footer";
import {
  ScanEye,
  Clock,
  LayoutDashboard,
  Users,
  CalendarCheck,
  ShieldCheck,
  CircleCheck,
} from "lucide-react";

export default function Home() {
  const buttonStyle =
    " bg-blue-500 cursor-pointer  text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300";
  const buttonStyle2 =
    " bg-white cursor-pointer  text-blue-500 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300";

  const buttonStyle4 =
    "w-full relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-[-20deg] hover:before:left-[100%] before:transition-all before:duration-700";

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
      <div>
        <p className=" mx-auto text-center text-blue-500 font-bold  rounded-2xl text-xs w-50 shadow-2xl">
          NEXT-GEN AI ATTENDANCE
        </p>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 py-16 max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Smart Attendance Powered by{" "}
            <span className="text-indigo-600">AI Face Recognition</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Eliminate proxies, reduce administrative overhead, and get 100%
            accurate attendance data with our enterprise-grade biometric engine.
            Designed for schools, universities and corporate offices.
          </p>
          <div className="mt-6 flex gap-4">
            <button className={buttonStyle}>Start Free Trial</button>
            <button className={buttonStyle2}>Watch Demo</button>
          </div>
        </div>

        <div className="relative cursor-pointer h-100 w-full overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl hover:scale-105 transform-3d duration-300">
          <Image
            src="/scan.png"
            alt="pic"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="w-full  bg-transparent flex justify-center">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl gap-6 sm:gap-0 text-center">
            <div className="flex flex-col  items-center flex-1">
              <h2 className="text-md sm:text-xl font-bold text-gray-900">
                ....+
              </h2>
              <p className="text-sm text-gray-500 tracking-wide">
                INSTITUTIONS
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center flex-1">
              <h2 className="text-md sm:text-xl font-bold text-gray-900">
                ....+
              </h2>
              <p className="text-sm text-gray-500 tracking-wide">DAILY SCANS</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center flex-1">
              <h2 className="text-md sm:text-xl  font-bold text-gray-900">
                99.8%
              </h2>
              <p className="text-sm text-gray-500 tracking-wide">
                ACCURACY RATE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          Features Built for High Performance
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Everything you need to modernize you attendance tracking and <br />
          streamline campus management.
        </p>
        {/*3 feature */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <ScanEye className="text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Face Recognition</h4>
            <p className="text-sm text-gray-600 mt-2">
              Military-grade accuracy with liveness detection to prevent photo
              spoofing.
            </p>
          </div>
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 ">
            <Clock className="text-6xl text-indigo-600  p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Real-time tracking</h4>
            <p className="text-sm text-gray-600 mt-2">
              Instant updates to your dashboard as soon as a student or employee
              check in.
            </p>
          </div>
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 ">
            <LayoutDashboard className="text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Cloud Dashboard</h4>
            <p className="text-sm text-gray-600 mt-2">
              Access compreshensive attendance data from any device, anywhere in
              the world.
            </p>
          </div>
        </div>
        {/*3 feature */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <Users className="text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Student Panel</h4>
            <p className="text-sm text-gray-600 mt-2">
              Dedicated portal for students to track their own attendance and
              leave history.
            </p>
          </div>
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CalendarCheck className="text-6xl text-indigo-600  p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Leave Management</h4>
            <p className="text-sm text-gray-600 mt-2">
              Integrated digital leave requests and apporval workflows for
              administration.
            </p>
          </div>
          <div className=" bg-gray-100 text-left p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <ShieldCheck className="text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-lg">Data Encryption</h4>
            <p className="text-sm text-gray-600 mt-2">
              All data is hashed and encrypted with industry-standard protocals.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          Deployment in Minutes, Not Days
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Our cloud-first architecture ensures a seamless transition from legacy
          systems <br /> to AI-powered tracking.
        </p>
        <div className="hidden sm:block h-0.5 w-full bg-gray-300 mt-5"></div>
        <div className="relative mt-16">
          {/* SVG Lines */}
          <svg
            className="absolute top-0 left-0 w-full h-50 pointer-events-none"
            viewBox="0 0 1000 200"
            fill="none"
          >
            {/* Arrow Marker */}
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="#4f46e5" />
              </marker>
            </defs>

            {/* Curved dashed paths */}
            <path
              d="M120,40 C220,120 280,0 380,40"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeDasharray="6,6"
              markerEnd="url(#arrow)"
            />
            <path
              d="M380,40 C480,120 540,0 640,40"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeDasharray="6,6"
              markerEnd="url(#arrow)"
            />
            <path
              d="M640,40 C740,120 800,0 900,40"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeDasharray="6,6"
              markerEnd="url(#arrow)"
            />
          </svg>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            <div className="text-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto ">
                01
              </div>
              <h4 className="font-semibold text-lg mt-3">Registration</h4>
              <p className="text-sm text-gray-600 mt-2">
                Upload student or employee database easily.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto">
                02
              </div>
              <h4 className="font-semibold text-lg mt-3">Face Enrollment</h4>
              <p className="text-sm text-gray-600 mt-2">
                Quick 5-second scan for each individual.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto">
                03
              </div>
              <h4 className="font-semibold text-lg mt-3">Hardware Setup</h4>
              <p className="text-sm text-gray-600 mt-2">
                Deploy our application compatible hardware.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto">
                04
              </div>
              <h4 className="font-semibold text-lg mt-3">Live Insights</h4>
              <p className="text-sm text-gray-600 mt-2">
                Start receiving real-time attendance data.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/**Graph */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <HomeGraph />
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          Transparent Pricing for Every Scale
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Choose the plan that fits your institution. NO hidden fees, no setup
          costs.
        </p>
        <div className=" grid grid-cols-3   mt-5 gap-6  ">
          <div className=" bg-gray-50 rounded-2xl shadow-2xl mt-5 hover:scale-105 transition-all duration-75">
            <h1 className=" text-center text-xl font-semibold mt-5">Starter</h1>
            <p className=" text-sm text-gray-600  text-center">
              Perfect for testing{" "}
            </p>
            <h1 className="text-4xl font-bold mt-8">
              ₹0<span className=" text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-8 mt-10">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Up to 50 users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Basic Reporting</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Email Support</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">1 Admin Seat</span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-5 mt-15">
              <button className={buttonStyle4}>Get Started</button>
            </div>
          </div>
          <div className=" bg-gray-50 rounded-2xl shadow-2xl  hover:scale-105 transition-all duration-75">
            <h1 className=" text-center text-2xl font-semibold mt-5">
              Popular
            </h1>
            <p className=" text-sm text-gray-600  text-center">
              Most popular for small instituions.
            </p>
            <h1 className="text-4xl font-bold mt-8">
              ₹400<span className=" text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-8 mt-10">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Up to 300 users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">
                  Real-time Dashboard
                </span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">
                  Community and Email Support
                </span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">10 Admin Seat</span>
              </p>
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Basic Analytics </span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-5 mt-15">
              <button className={buttonStyle4}>Get Started</button>
            </div>
          </div>
          <div className=" bg-gray-50 rounded-2xl shadow-2xl mt-5  hover:scale-105 transition-all duration-75">
            <h1 className=" text-center text-xl font-semibold mt-5">
              Enterprise
            </h1>
            <p className=" text-sm text-gray-600  text-center">
              Full-scale soltution for large groups
            </p>
            <h1 className="text-3xl font-bold mt-8">
              Custom<span className=" text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-8 mt-10">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Unlimited users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">
                  24/7 Priority Support
                </span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Custom Branding</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">Advance Scaning</span>
              </p>
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400" size={20} />
                <span className="text-md text-gray-600">
                  Free server Handling{" "}
                </span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-5 mt-15">
              <button className={buttonStyle4}>Contact Admin</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="bg-linear-to-r from-indigo-600 to-blue-500 text-white rounded-2xl p-10 max-w-7xl mx-auto text-center space-y-5">
          <h3 className="text-3xl font-semibold ">
            Ready to transform your <br /> instituition&apos;s attendance?
          </h3>
          <p className=" text-sm text-gray-100 mt-5">
            Join ....+ schools and offices already saving time and improving{" "}
            <br />
            security with AttendX-AI. Get started today with a free pilot
          </p>
          <div className=" grid grid-cols-2 gap-5 mt-15">
            <button className={buttonStyle2}>Free Pilot</button>
            <button className={buttonStyle2}>Start with plan</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </main>
  );
}
