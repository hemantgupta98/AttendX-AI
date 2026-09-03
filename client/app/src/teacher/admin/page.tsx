/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type ReactNode } from "react";

import axios from "axios";
import { ShieldCheck } from "lucide-react";

type ProfileForm = {
  name: string;
  city: string;
  state: string;
  pincode: string;
  designation: string;
  email: string;
};

const initialProfileState: ProfileForm = {
  name: "",
  city: "",
  state: "",
  pincode: "",
  email: "",
  designation: "",
};

const page = () => {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [profile, setProfile] = useState<ProfileForm>(initialProfileState);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("teacherToken");

      const res = await axios.get(`${apiBaseUrl}/employee/auth/getadmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const profile: ProfileForm = {
        name: res.data?.data?.name ?? "",
        city: res.data?.data?.city ?? "",
        state: res.data?.data?.state ?? "",
        pincode: res.data?.data?.pincode ?? "",
        designation: res.data?.data?.designation ?? "",
        email: res.data?.data?.email ?? "",
      };

      setProfile(profile);
      setProfile(profile);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="space-y-6 lg:col-span-2">
        {/* Contact Information */}
        <Section title="Contact Information" icon={<ShieldCheck size={20} />}>
          <Grid>
            <InfoCard label="Teacher Contact" value={profile.name} />

            <InfoCard label="Parent Contact" value={profile.email} />

            <InfoCard label="Address" value={profile.designation} />

            <InfoCard label="City" value={profile.city} />

            <InfoCard label="State" value={profile.state} />

            <InfoCard label="Pincode" value={profile.pincode} />
          </Grid>
        </Section>
      </div>
    </>
  );
};

export default page;

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
