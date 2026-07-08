"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://attendx-ai-n8uq.onrender.com/api/admin";

export interface DashboardData {
  institutionName: string;
  student: number;
  teacher: number;
  workingDays: number;
  attendanceType: string;
  classTiming: number;
}

export interface AttendanceTrendPoint {
  month: string;
  attendance: number;
}

export interface DepartmentStat {
  department: string;
  percentage: number;
}

function getAuthHeader() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  return { Authorization: `Bearer ${token}` };
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDashboard() {
      try {
        const res = await axios.get(`${API_BASE}/auth/getprofile`, {
          headers: getAuthHeader(),
          withCredentials: true,
        });

        const profile = res.data.data;
        if (!mounted) return;

        setData({
          institutionName: profile.name || "",
          student: profile.student ?? 0,
          teacher: profile.employee ?? 0,
          workingDays: profile.workingDays ?? 0,
          attendanceType: profile.attendenceType || "",
          classTiming: profile.classTiming ?? 0,
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError("Couldn't load institution profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

export function useAttendanceTrend() {
  const [trend, setTrend] = useState<AttendanceTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchTrend() {
      try {
        // TODO: point this at your real analytics endpoint.
        // Expected: [{ month: "Jan", attendance: 92 }, ...]
        const res = await axios.get(`${API_BASE}/attendance/monthly`, {
          headers: getAuthHeader(),
          withCredentials: true,
        });
        if (mounted) setTrend(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchTrend();
    return () => {
      mounted = false;
    };
  }, []);

  return { trend, loading };
}

export function useDepartmentStats() {
  const [stats, setStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      try {
       
        const res = await axios.get(`${API_BASE}/attendance/department`, {
          headers: getAuthHeader(),
          withCredentials: true,
        });
        if (mounted) setStats(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  return { stats, loading };
}