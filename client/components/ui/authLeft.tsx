"use client";

import React from "react";
import Image from "next/image";
const authLeft = () => {
  return (
    <>
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
    </>
  );
};

export default authLeft;

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
