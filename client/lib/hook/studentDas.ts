"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE = "https://attendx-ai-n8uq.onrender.com/api/student";

export interface AttendanceHistory {
  _id: string;
  name: string;
  storedImage: string;
  liveImage: string;
  status: string;
  matched: boolean;
  confidence: number;
  date: string;
  time: string;
}

export interface AttendanceTrendPoint {
  month: string;
  attendance: number;
}

export interface WeeklyAttendance {
  day: string;
  percentage: number;
}

function getAuthHeader() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("studentToken")
      : null;

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function useStudentDashboard() {
  const [history, setHistory] = useState<AttendanceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(
          `${API_BASE}/live-image/history`,
          {
            headers: getAuthHeader(),
            withCredentials: true,
          }
        );

        setHistory(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const analytics = useMemo(() => {
    const total = history.length;

    const present = history.filter(
      (item) => item.status.toLowerCase() === "present"
    ).length;

    const absent = history.filter(
      (item) => item.status.toLowerCase() === "absent"
    ).length;

    const matched = history.filter((item) => item.matched).length;

    const attendance =
      total === 0 ? 0 : Number(((present / total) * 100).toFixed(1));

    const matchRate =
      total === 0 ? 0 : Number(((matched / total) * 100).toFixed(1));

    return {
      total,
      present,
      absent,
      attendance,
      matchRate,
    };
  }, [history]);

  const monthlyTrend = useMemo(() => {
    const map = new Map<
      string,
      {
        total: number;
        present: number;
      }
    >();

    history.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short",
      });

      if (!map.has(month))
        map.set(month, {
          total: 0,
          present: 0,
        });

      const current = map.get(month)!;

      current.total++;

      if (item.status.toLowerCase() === "present") {
        current.present++;
      }
    });

    return [...map.entries()].map(([month, value]) => ({
      month,
      attendance: Number(
        ((value.present / value.total) * 100).toFixed(1)
      ),
    }));
  }, [history]);

  const weeklyTrend = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const map = new Map<
      string,
      {
        total: number;
        present: number;
      }
    >();

    days.forEach((day) =>
      map.set(day, {
        total: 0,
        present: 0,
      })
    );

    history.forEach((item) => {
      const day = new Date(item.date).toLocaleString("en-US", {
        weekday: "short",
      });

      const current = map.get(day);

      if (!current) return;

      current.total++;

      if (item.status.toLowerCase() === "present") {
        current.present++;
      }
    });

    return [...map.entries()].map(([day, value]) => ({
      day,
      percentage:
        value.total === 0
          ? 0
          : Number(((value.present / value.total) * 100).toFixed(0)),
    }));
  }, [history]);

  return {
    loading,
    history,
    analytics,
    monthlyTrend,
    weeklyTrend,
  };
}