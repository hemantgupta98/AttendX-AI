"use client";

import React from "react";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const RoleSelection = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Center Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to AttendX-AI <br /> Smart Attendance starts here
        </h1>
        <p className="text-gray-500 mb-6">
          Continue as Admin, Teacher, or Student
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            As Admin
          </button>

          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            As Teacher
          </button>

          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            As Student
          </button>
        </div>
        <p
          onClick={() => router.push("/")}
          className="flex justify-center items-center mt-5 text-center gap-2 cursor-pointer"
        >
          <ChevronsLeft className=" shrink-0" size={20} />
          <span className="text-gray-600 text-sm text-center">Go back</span>
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
