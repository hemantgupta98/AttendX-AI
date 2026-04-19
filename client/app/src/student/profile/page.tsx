/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

// import { api } from "@/lib/api";

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>({});
  const [error, setError] = useState("");

  {
    /** useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        // FIX THIS API CALL
        const res = await api.get("/student/profile");
        const data = res?.data?.data;

        if (!mounted) return;

        if (!data) {
          setError("Student data not found.");
          return;
        }

        setProfile(data);
      } catch {
        if (!mounted) return;
        setError("Failed to load profile.");
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []); */
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6 text-gray-700">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <p className="text-gray-600 text-sm">
            View your academic and personal details
          </p>
        </div>

        {/* Top Card */}
        <div className="bg-white text-black rounded-xl p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400">
            <Image
              src={profile.photo || "/logo.png"}
              alt="student"
              width={80}
              height={80}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {profile.name || "Student"}
            </h2>
            <p className="text-sm text-gray-600">
              {profile.class} - {profile.section}
            </p>
          </div>

          <button className="bg-[#0b2e4d] text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Section title="Personal Information" icon={<User size={18} />}>
              <Grid>
                <InputField label="Name" value={profile.name} />
                <InputField label="Gender" value={profile.gender} />
                <InputField label="Date of Birth" value={profile.dob} />
                <InputField label="Email" value={profile.email} />
                <InputField
                  label="Student Number"
                  value={profile.studentNumber}
                />
                <InputField
                  label="Parent Number"
                  value={profile.parentNumber}
                />
              </Grid>
            </Section>

            {/* Address */}
            <Section title="Address Details" icon={<MapPin size={18} />}>
              <Grid>
                <InputField label="Address" value={profile.address} />
                <InputField label="City" value={profile.city} />
                <InputField label="State" value={profile.state} />
                <InputField label="Pincode" value={profile.pincode} />
              </Grid>
            </Section>

            {/* Academic Info */}
            <Section
              title="Academic Details"
              icon={<GraduationCap size={18} />}
            >
              <Grid>
                <InputField
                  label="Institution Name"
                  value={profile.institutionName}
                />
                <InputField label="Student ID" value={profile.studentID} />
                <InputField label="Class" value={profile.class} />
                <InputField label="Stream" value={profile.stream} />
                <InputField label="Section" value={profile.section} />
                <InputField
                  label="Admission Year"
                  value={profile.admissionYear}
                />
              </Grid>
            </Section>

            {/* Security */}
            <Section title="Security Details" icon={<ShieldCheck size={18} />}>
              <Grid>
                <InputField label="Password" value="********" />
                <InputField label="Confirm Password" value="********" />
              </Grid>
            </Section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white text-black p-5 rounded-xl space-y-4">
              <h3 className="font-semibold">Quick Info</h3>

              <Stat label="Class" value={profile.class} />
              <Stat label="Section" value={profile.section} />
              <Stat label="Admission Year" value={profile.admissionYear} />
            </div>

            {/* Security Notice */}
            <div className="bg-[#1d3654] p-5 rounded-xl border border-red-400">
              <h3 className="text-red-400 font-semibold mb-2">
                Security Notice
              </h3>

              <p className="text-sm mb-3">
                Keep your account credentials safe.
              </p>

              <button className="border border-red-400 px-4 py-2 rounded-lg w-full">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-white text-black p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4 font-semibold">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function InputField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <input
        value={value || "Not provided"}
        readOnly
        className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-sm"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <b>{value || 0}</b>
    </div>
  );
}
