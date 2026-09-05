/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
  XCircle,
  Brain,
  Trash2,
} from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttendanceHistory {
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

export default function AdminReportPage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [history, setHistory] = useState<AttendanceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendanceHistory();
    handleDownloadPDF();
  }, []);

  const getAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiBaseUrl}/admin/live-image/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setHistory(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAttendance = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${apiBaseUrl}/admin/live-image/deleteattendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getAttendanceHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this attendance?");
    if (!confirmDelete) return;
    deleteAttendance(id);
  };

  const total = history.length;
  const present = history.filter((item) => item.status === "Present").length;
  const absent = history.filter((item) => item.status !== "Present").length;
  const matched = history.filter((item) => item.matched).length;
  const unmatched = total - matched;

  const averageConfidence =
    total === 0
      ? 0
      : Number(
          (
            (history.reduce((sum, item) => sum + item.confidence, 0) / total) *
            100
          ).toFixed(1),
        );

  const attendanceRate =
    total === 0 ? 0 : Number(((present / total) * 100).toFixed(1));

  const attendanceChart = [
    {
      name: "Present",
      value: present,
      color: "#22c55e",
    },
    {
      name: "Absent",
      value: absent,
      color: "#ef4444",
    },
  ];

  const matchChart = [
    {
      name: "Matched",
      value: matched,
      color: "#3b82f6",
    },
    {
      name: "Failed",
      value: unmatched,
      color: "#f59e0b",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Reports...</div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${apiBaseUrl}/admin/report/attendance-report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,

          responseType: "blob",
        },
      );

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "Attendance_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Failed to download attendance report");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className=" flex justify-between">
            <h1 className="text-4xl font-bold">Attendance Analytics</h1>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-lg  px-4 py-2 text-black cursor-pointer shadow-2xl bg-gray-100"
            >
              📥 Download PDF
            </button>
          </div>

          <p className="text-slate-500 mt-2">AI Face Recognition Dashboard</p>
        </div>

        {/* ================= Stat Cards ================= */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Records</p>
                  <h2 className="mt-2 text-3xl font-bold">{total}</h2>
                </div>
                <Users className="text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Present</p>
                  <h2 className="mt-2 text-3xl font-bold text-green-600">
                    {present}
                  </h2>
                </div>
                <CheckCircle2 className="text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Absent</p>
                  <h2 className="mt-2 text-3xl font-bold text-red-600">
                    {absent}
                  </h2>
                </div>
                <XCircle className="text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <h2 className="mt-2 text-3xl font-bold">{attendanceRate}%</h2>
                </div>
                <Brain className="text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Confidence</p>
                  <h2 className="mt-2 text-3xl font-bold">
                    {averageConfidence}%
                  </h2>
                </div>
                <Brain className="text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= Charts ================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* ================= Attendance Chart ================= */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                      label={({ name, percent }) =>
                        `${name} ${(percent! * 100).toFixed(0)}%`
                      }
                    >
                      {attendanceChart.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-5 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span>Present ({present})</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <span>Absent ({absent})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ================= Face Match Chart ================= */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Face Recognition</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={matchChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                      label={({ name, percent }) =>
                        `${name} ${(percent! * 100).toFixed(0)}%`
                      }
                    >
                      {matchChart.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-5 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <span>Matched ({matched})</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                  <span>Failed ({unmatched})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ================= Confidence ================= */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>AI Confidence</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-40">
                  <svg viewBox="0 0 120 120" className="h-full w-full">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={327}
                      strokeDashoffset={327 - (327 * averageConfidence) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {averageConfidence}%
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-center text-gray-500">
                  Average confidence generated by AI Face Recognition.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span>Recognition Success</span>
                    <span>{attendanceRate}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{
                        width: `${attendanceRate}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between">
                    <span>AI Confidence</span>
                    <span>{averageConfidence}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{
                        width: `${averageConfidence}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= Attendance History ================= */}
        <div className="mt-10">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Attendance History</CardTitle>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                {history.length} Records
              </span>
            </CardHeader>

            <CardContent>
              {/* ================= Desktop Table ================= */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full">
                  <thead className="border-b bg-slate-100">
                    <tr className="text-left text-sm font-semibold text-slate-700">
                      <th className="px-5 py-4">Photo</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Matched</th>
                      <th>Confidence</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <Image
                            src={item.liveImage}
                            alt={item.name}
                            width={55}
                            height={55}
                            className="rounded-xl object-cover"
                          />
                        </td>

                        <td className="font-semibold">{item.name}</td>

                        <td>
                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-blue-600" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </td>

                        <td>
                          <div className="flex items-center gap-2">
                            <Clock3 size={16} className="text-purple-600" />
                            {item.time}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              item.status === "Present"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          {item.matched ? (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm">
                              Matched
                            </span>
                          ) : (
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700 text-sm">
                              Failed
                            </span>
                          )}
                        </td>

                        <td>
                          <span className="font-semibold text-indigo-600">
                            {(item.confidence * 100).toFixed(2)}%
                          </span>
                        </td>

                        <td>
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {history.length === 0 && (
                  <div className="py-10 text-center text-gray-500">
                    No attendance records found.
                  </div>
                )}
              </div>

              {/* ================= Mobile Cards ================= */}
              <div className="grid gap-5 lg:hidden">
                {history.map((item) => (
                  <Card
                    key={item._id}
                    className="rounded-2xl border-0 shadow-md"
                  >
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <Image
                          src={item.liveImage}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h2 className="text-lg font-bold">{item.name}</h2>

                          <div className="mt-3 space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarDays
                                size={15}
                                className="text-blue-600"
                              />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock3 size={15} className="text-purple-600" />
                              {item.time}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                              item.status === "Present"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Confidence</p>
                          <p className="mt-1 font-bold text-indigo-600">
                            {(item.confidence * 100).toFixed(2)}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Face Match</p>
                          <p
                            className={`mt-1 font-semibold ${
                              item.matched
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {item.matched ? "Matched" : "Failed"}
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg bg-red-600 p-3 text-white transition hover:bg-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
