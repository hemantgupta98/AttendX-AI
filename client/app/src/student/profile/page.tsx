/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import axios from "axios";
import { User, ShieldCheck, GraduationCap } from "lucide-react";

interface ProfileForm {
  name: string;
  gender: string;
  dob: string;
  photo: string;
  studentNumber: number;
  parentNumber: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  institutionName: string;
  studentID: string;
  class: string;
  stream: string;
  section: string;
  admissionYear: number;
  email: string;
}

const initialProfileState: ProfileForm = {
  name: "",
  gender: "",
  dob: "",
  photo: "",
  studentNumber: 0,
  parentNumber: 0,
  address: "",
  city: "",
  state: "",
  pincode: "",
  institutionName: "",
  studentID: "",
  class: "",
  stream: "",
  section: "",
  admissionYear: 0,
  email: "",
};

const page = () => {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [profile, setProfile] = useState<ProfileForm>(initialProfileState);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${apiBaseUrl}/student/auth/getprofile`, {
        headers: {
          Authorization: `Bearer${token}`,
        },
        withCredentials: true,
      });

      const profile: ProfileForm = {
        name: res.data?.data?.name ?? "",
        gender: res.data?.data?.gender ?? "",
        dob: res.data?.data?.dob ?? "",
        photo: res.data?.data?.photo ?? "",
        studentNumber: res.data?.data?.studentNumber ?? 0,
        parentNumber: res.data?.data?.parentNumber ?? 0,
        address: res.data?.data?.address ?? "",
        city: res.data?.data?.city ?? "",
        state: res.data?.data?.state ?? "",
        pincode: res.data?.data?.pincode ?? "",
        institutionName: res.data?.data?.institutionName ?? "",
        studentID: res.data?.data?.studentID ?? "",
        class: res.data?.data?.class ?? "",
        stream: res.data?.data?.stream ?? "",
        section: res.data?.data?.section ?? "",
        admissionYear: res.data?.data?.admissionYear ?? 0,
        email: res.data?.data?.email ?? "",
      };

      setProfile(profile);
      setProfile(profile);
      setError("");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="rounded-3xl bg-linear-to-r from-blue-700 via-indigo-600 to-cyan-600 p-8 text-white shadow-xl">
            <h1 className="text-4xl font-bold">Student Profile</h1>

            <p className="mt-2 text-blue-100">
              View your personal and academic information.
            </p>
          </div>

          {/* Hero Card */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500" />

            <div className="-mt-16 flex flex-col gap-6 p-8 lg:flex-row lg:items-center">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-8 border-white shadow-xl">
                <Image
                  src="/logo.png"
                  alt="Student"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-800">
                  {profile.name || "Student"}
                </h2>

                <p className="mt-2 text-lg font-medium text-blue-600">
                  {profile.institutionName}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    Student ID : {profile.studentID}
                  </span>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Class : {profile.class}
                  </span>

                  <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                    Stream : {profile.stream}
                  </span>

                  <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
                    Section : {profile.section}
                  </span>

                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                    Admission : {profile.admissionYear}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Side */}
            <div className="space-y-6 lg:col-span-2">
              {/* Personal Information */}
              <Section title="Personal Information" icon={<User size={20} />}>
                <Grid>
                  <InfoCard label="Full Name" value={profile.name} />
                  <InfoCard label="Gender" value={profile.gender} />
                  <InfoCard label="Date of Birth" value={profile.dob} />
                  <InfoCard label="Email Address" value={profile.email} />
                </Grid>
              </Section>

              {/* Contact Information */}
              <Section
                title="Contact Information"
                icon={<ShieldCheck size={20} />}
              >
                <Grid>
                  <InfoCard
                    label="Student Contact"
                    value={profile.studentNumber}
                  />

                  <InfoCard
                    label="Parent Contact"
                    value={profile.parentNumber}
                  />

                  <InfoCard label="Address" value={profile.address} />

                  <InfoCard label="City" value={profile.city} />

                  <InfoCard label="State" value={profile.state} />

                  <InfoCard label="Pincode" value={profile.pincode} />
                </Grid>
              </Section>

              {/* Academic Information */}
              <Section
                title="Academic Information"
                icon={<GraduationCap size={20} />}
              >
                <Grid>
                  <InfoCard
                    label="Institution Name"
                    value={profile.institutionName}
                  />

                  <InfoCard label="Student ID" value={profile.studentID} />

                  <InfoCard label="Class" value={profile.class} />

                  <InfoCard label="Stream" value={profile.stream} />

                  <InfoCard label="Section" value={profile.section} />

                  <InfoCard
                    label="Admission Year"
                    value={profile.admissionYear}
                  />
                </Grid>
              </Section>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Quick Overview */}
              <div className="rounded-3xl bg-white p-6 shadow-xl">
                <h3 className="mb-6 text-xl font-bold text-slate-700">
                  Quick Overviews.
                </h3>

                <div className="space-y-4">
                  <StatCard title="Student ID" value={profile.studentID} />

                  <StatCard
                    title="Institution"
                    value={profile.institutionName}
                  />

                  <StatCard title="Class" value={profile.class} />

                  <StatCard title="Stream" value={profile.stream} />

                  <StatCard title="Section" value={profile.section} />

                  <StatCard
                    title="Admission Year"
                    value={profile.admissionYear}
                  />
                </div>
              </div>

              {/* Student Notice */}
              <div className="rounded-3xl bg-linear-to-br from-blue-700 to-indigo-700 p-6 text-white shadow-xl">
                <h3 className="text-xl font-bold">Student Notice</h3>

                <p className="mt-4 leading-7 text-blue-100">
                  Please verify your profile information regularly. If you
                  notice any incorrect details such as your contact information,
                  class, stream, section, or institution details, please contact
                  the administrator immediately to have them updated.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-100 p-4 text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

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
    <div className="rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500">Employee information</p>
        </div>
      </div>

      {children}
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function InfoCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-lg">
      <p className="mb-2 text-sm font-medium text-slate-500">{label}</p>

      <p className="wrap-break-word text-base font-semibold text-slate-800">
        {value || "Not Available"}
      </p>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-slate-50 to-blue-50 p-5 transition-all duration-300 hover:shadow-lg">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h3 className="mt-2 text-xl font-bold text-slate-800">{value || "--"}</h3>
    </div>
  );
}
