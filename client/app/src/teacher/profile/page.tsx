/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import axios from "axios";
import { User, ShieldCheck, GraduationCap } from "lucide-react";

type ProfileForm = {
  name: string;
  gender: string;
  dob: string;
  photo: string;
  teacherNumber: number;
  parentNumber: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  institutionName: string;
  employeeID: string;
  class: string;
  subject: string;
  joiningYear: number;
  email: string;
};

const initialProfileState: ProfileForm = {
  name: "",
  gender: "",
  dob: "",
  photo: "",
  teacherNumber: 0,
  parentNumber: 0,
  address: "",
  city: "",
  state: "",
  pincode: "",
  institutionName: "",
  employeeID: "",
  class: "",
  subject: "",
  joiningYear: 0,
  email: "",
};

const page = () => {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [profile, setProfile] = useState<ProfileForm>(initialProfileState);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${apiBaseUrl}/employee/auth/getprofile`, {
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
        teacherNumber: res.data?.data?.teacherNumber ?? 0,
        parentNumber: res.data?.data?.parentNumber ?? 0,
        address: res.data?.data?.address ?? "",
        city: res.data?.data?.city ?? "",
        state: res.data?.data?.state ?? "",
        pincode: res.data?.data?.pincode ?? "",
        institutionName: res.data?.data?.institutionName ?? "",
        employeeID: res.data?.data?.employeeID ?? "",
        class: res.data?.data?.class ?? "",
        subject: res.data?.data?.subject ?? "",
        joiningYear: res.data?.data?.joiningYear ?? 0,
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
            <h1 className="text-4xl font-bold">Employee Profile</h1>

            <p className="mt-2 text-blue-100">
              View your personal and professional information
            </p>
          </div>

          {/* Hero Card */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500" />

            <div className="-mt-16 flex flex-col gap-6 p-8 lg:flex-row lg:items-center">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-8 border-white shadow-xl">
                <Image
                  src="/logo.png"
                  alt="Employee"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-800">
                  {profile.name || "Employee"}
                </h2>

                <p className="mt-2 text-lg font-medium text-blue-600">
                  {profile.institutionName}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    Employee ID : {profile.employeeID}
                  </span>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Subject : {profile.subject}
                  </span>

                  <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                    Class : {profile.class}
                  </span>

                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                    Joined : {profile.joiningYear}
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
                    label="Teacher Contact"
                    value={profile.teacherNumber}
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

              {/* Professional Information */}
              <Section
                title="Professional Information"
                icon={<GraduationCap size={20} />}
              >
                <Grid>
                  <InfoCard
                    label="Institution Name"
                    value={profile.institutionName}
                  />

                  <InfoCard label="Employee ID" value={profile.employeeID} />

                  <InfoCard label="Subject" value={profile.subject} />

                  <InfoCard label="Assigned Class" value={profile.class} />

                  <InfoCard label="Joining Year" value={profile.joiningYear} />
                </Grid>
              </Section>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Quick Overview */}
              <div className="rounded-3xl bg-white p-6 shadow-xl">
                <h3 className="mb-6 text-xl font-bold text-slate-700">
                  Quick Overview
                </h3>

                <div className="space-y-4">
                  <StatCard title="Employee ID" value={profile.employeeID} />

                  <StatCard
                    title="Institution"
                    value={profile.institutionName}
                  />

                  <StatCard title="Subject" value={profile.subject} />

                  <StatCard title="Assigned Class" value={profile.class} />

                  <StatCard title="Joining Year" value={profile.joiningYear} />
                </div>
              </div>

              {/* Notice */}
              <div className="rounded-3xl bg-linear-to-br from-blue-700 to-indigo-700 p-6 text-white shadow-xl">
                <h3 className="text-xl font-bold">Employee Notice</h3>

                <p className="mt-4 leading-7 text-blue-100">
                  Please verify your profile information regularly. If you
                  notice any incorrect details such as your contact information,
                  assigned class, subject, or institution, please contact the
                  administrator immediately to get them updated.
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
