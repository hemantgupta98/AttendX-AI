"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HomeGraph from "@/components/ui/homegraph";
import Footer from "@/components/ui/footer";
import { motion } from "motion/react";
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
  // Refs for smooth scroll navigation
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll function with Framer Motion
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Consistent button styling with responsive sizes
  const btnPrimary =
    "bg-blue-500 cursor-pointer text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base whitespace-nowrap";
  const btnSecondary =
    "bg-white cursor-pointer text-blue-500 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base whitespace-nowrap";
  const btnGradient =
    "w-full relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 text-sm sm:text-base before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-[-20deg] hover:before:left-[100%] before:transition-all before:duration-700";

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto gap-4">
        <Image
          src="/logo.png"
          height={100}
          width={100}
          alt="logo"
          className="w-24 h-24 sm:w-[150px] sm:h-[150px] cursor-pointer hover:scale-105 transition-all"
          onClick={() => scrollToSection(heroRef)}
        />
        <div className="hidden md:flex gap-6 text-lg items-center ">
          <motion.button
            onClick={() => scrollToSection(heroRef)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            Home
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(featuresRef)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            Features
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(pricingRef)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            Pricing
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(footerRef)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            Contact
          </motion.button>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className={btnPrimary}>Get Started</button>
          <button className={btnPrimary}>Login</button>
        </div>
      </nav>
      <div className=" flex items-center">
        <p className="mx-auto text-center text-blue-500 font-bold rounded-2xl text-xs px-4 py-2 shadow-2xl inline-block w-auto">
          NEXT-GEN AI ATTENDANCE
        </p>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Smart Attendance Powered by{" "}
            <span className="text-indigo-600">AI Face Recognition</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Eliminate proxies, reduce administrative overhead, and get 100%
            accurate attendance data with our enterprise-grade biometric engine.
            Designed for schools, universities and corporate offices.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className={btnPrimary}>Start Free Trial</button>
            <button className={btnSecondary}>Watch Demo</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative cursor-pointer h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <Image
            src="/scan.png"
            alt="pic"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full col-span-1 md:col-span-2 bg-transparent flex justify-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl gap-6 sm:gap-0 text-center">
            <div className="flex flex-col items-center flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ....+
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 tracking-wide">
                INSTITUTIONS
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ....+
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 tracking-wide">
                DAILY SCANS
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                99.8%
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 tracking-wide">
                ACCURACY RATE
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto text-center scroll-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold">
            Features Built for High Performance
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Everything you need to modernize you attendance tracking and{" "}
            <br className="hidden sm:block" />
            streamline campus management.
          </p>
        </motion.div>
        {/*3 feature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <ScanEye className="text-5xl sm:text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Face Recognition
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Military-grade accuracy with liveness detection to prevent photo
              spoofing.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 "
          >
            <Clock className="text-5xl sm:text-6xl text-indigo-600  p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Real-time tracking
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Instant updates to your dashboard as soon as a student or employee
              check in.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 "
          >
            <LayoutDashboard className="text-5xl sm:text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Cloud Dashboard
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Access compreshensive attendance data from any device, anywhere in
              the world.
            </p>
          </motion.div>
        </div>
        {/*3 feature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Users className="text-5xl sm:text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Student Panel
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Dedicated portal for students to track their own attendance and
              leave history.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <CalendarCheck className="text-5xl sm:text-6xl text-indigo-600  p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Leave Management
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Integrated digital leave requests and apporval workflows for
              administration.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className=" bg-gray-100 text-left p-4 sm:p-6 rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <ShieldCheck className="text-5xl sm:text-6xl text-indigo-600 p-1 bg-gray-200 mb-4 rounded-sm" />
            <h4 className="font-semibold text-base sm:text-lg">
              Data Encryption
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              All data is hashed and encrypted with industry-standard protocals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold">
          Deployment in Minutes, Not Days
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Our cloud-first architecture ensures a seamless transition from legacy
          systems <br className="hidden sm:block" /> to AI-powered tracking.
        </p>
        <div className="hidden sm:block h-0.5 w-full bg-gray-300 mt-5"></div>
        <div className="relative mt-8 sm:mt-16">
          {/* SVG Lines - Hidden on mobile */}
          <svg
            className="absolute top-0 left-0 w-full h-40 sm:h-50 pointer-events-none hidden sm:block"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            <div className="text-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl p-3 sm:p-4">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto text-sm sm:text-base font-semibold">
                01
              </div>
              <h4 className="font-semibold text-base sm:text-lg mt-3">
                Registration
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Upload student or employee database easily.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl p-3 sm:p-4">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto text-sm sm:text-base font-semibold">
                02
              </div>
              <h4 className="font-semibold text-base sm:text-lg mt-3">
                Face Enrollment
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Quick 5-second scan for each individual.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl p-3 sm:p-4">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto text-sm sm:text-base font-semibold">
                03
              </div>
              <h4 className="font-semibold text-base sm:text-lg mt-3">
                Hardware Setup
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Deploy our application compatible hardware.
              </p>
            </div>

            <div className="text-center cursor-pointer  hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl p-3 sm:p-4">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto text-sm sm:text-base font-semibold">
                04
              </div>
              <h4 className="font-semibold text-base sm:text-lg mt-3">
                Live Insights
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Start receiving real-time attendance data.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/**Graph */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto text-center">
        <HomeGraph />
      </section>

      {/* Pricing */}
      <section
        ref={pricingRef}
        className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto text-center scroll-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold">
            Transparent Pricing for Every Scale
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Choose the plan that fits your institution. NO hidden fees, no setup
            costs.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className=" bg-gray-50 rounded-xl shadow-2xl mt-0 md:mt-5 hover:scale-105 transition-all duration-75"
          >
            <h1 className=" text-center text-lg sm:text-xl font-semibold mt-5">
              Starter
            </h1>
            <p className=" text-xs sm:text-sm text-gray-600  text-center">
              Perfect for testing{" "}
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-8">
              ₹0<span className=" text-xs sm:text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-4 sm:ml-8 mt-10 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Up to 50 users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Basic Reporting</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Email Support</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">1 Admin Seat</span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-4 sm:p-5 mt-10 sm:mt-15 mx-4 sm:mx-auto sm:max-w-xs mb-4 sm:mb-5">
              <button className={btnGradient}>Get Started</button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className=" bg-gray-50 rounded-xl shadow-2xl  hover:scale-105 transition-all duration-75"
          >
            <h1 className=" text-center text-lg sm:text-2xl font-semibold mt-5">
              Popular
            </h1>
            <p className=" text-xs sm:text-sm text-gray-600  text-center">
              Most popular for small instituions.
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-8">
              ₹400<span className=" text-xs sm:text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-4 sm:ml-8 mt-10 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Up to 300 users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Real-time Dashboard</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">
                  Community and Email Support
                </span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">10 Admin Seat</span>
              </p>
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Basic Analytics </span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-4 sm:p-5 mt-10 sm:mt-15 mx-4 sm:mx-auto sm:max-w-xs mb-4 sm:mb-5">
              <button className={btnGradient}>Get Started</button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className=" bg-gray-50 rounded-xl shadow-2xl mt-0 md:mt-5  hover:scale-105 transition-all duration-75"
          >
            <h1 className=" text-center text-lg sm:text-xl font-semibold mt-5">
              Enterprise
            </h1>
            <p className=" text-xs sm:text-sm text-gray-600  text-center">
              Full-scale soltution for large groups
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-8">
              Custom
              <span className=" text-xs sm:text-sm text-gray-600">/mo</span>
            </h1>
            <div className="text-left space-y-3 ml-4 sm:ml-8 mt-10 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Unlimited users</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">24/7 Priority Support</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Custom Branding</span>
              </p>

              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Advance Scaning</span>
              </p>
              <p className="flex items-center gap-2">
                <CircleCheck className="text-blue-400 shrink-0" size={20} />
                <span className="text-gray-600">Free server Handling </span>
              </p>
            </div>
            <div className=" rounded-md shadow-4xl p-4 sm:p-5 mt-10 sm:mt-15 mx-4 sm:mx-auto sm:max-w-xs mb-4 sm:mb-5">
              <button className={btnGradient}>Contact Admin</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-linear-to-r from-indigo-600 to-blue-500 text-white rounded-2xl p-6 sm:p-10 max-w-7xl mx-auto text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-semibold ">
            Ready to transform your <br /> instituition&apos;s attendance?
          </h3>
          <p className=" text-xs sm:text-sm text-gray-100 mt-5">
            Join ....+ schools and offices already saving time and improving{" "}
            <br className="hidden sm:block" />
            security with AttendX-AI. Get started today with a free pilot
          </p>
          <div className=" flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 sm:mt-15">
            <button className={btnSecondary}>Free Pilot</button>
            <button className={btnSecondary}>Start with plan</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div ref={footerRef} className="scroll-mt-20">
        <Footer />
      </div>
    </main>
  );
}
