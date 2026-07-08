"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface DashboardData {
  institutionName: string;
  student: number;
  teacher: number;
  workingDays: number;
  attendanceType: string;
  classTiming: number;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    institutionName: "",
    student: 0,
    teacher: 0,
    workingDays: 0,
    attendanceType: "",
    classTiming: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "https://attendx-ai-n8uq.onrender.com/api/admin/auth/getprofile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const profile = res.data.data;

      setData({
        institutionName: profile.name || "",
        student: profile.student,
        teacher: profile.employee, 
        workingDays: profile.workingDays,
        attendanceType: profile.attendenceType,
        classTiming: profile.classTiming,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
  };
}