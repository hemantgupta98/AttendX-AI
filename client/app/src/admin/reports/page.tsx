"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CalendarDays, Clock3, Eye, CheckCircle2, XCircle } from "lucide-react";

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

export default function AttendanceHistoryPage() {
  const apiBaseUrl = "https://attendx-ai-n8uq.onrender.com/api";

  const [history, setHistory] = useState<AttendanceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendanceHistory();
  }, []);

  const getAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const res = await axios.get(`${apiBaseUrl}/admin/live-image/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
          <p className="text-lg font-semibold">Loading Attendance History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Attendance History
            </h1>

            <p className="mt-1 text-gray-500">
              AI Face Recognition Attendance Records
            </p>
          </div>

          <div className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white shadow">
            Total Records : {history.length}
          </div>
        </div>

        {/* ================= Desktop Table ================= */}

        <div className="hidden overflow-x-auto rounded-3xl bg-white shadow-lg lg:block">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr className="text-left text-gray-700">
                <th className="px-6 py-4">Live Photo</th>
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
                  className="border-t transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={item.liveImage}
                      alt={item.name}
                      width={60}
                      height={60}
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
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        No
                      </span>
                    )}
                  </td>

                  <td>{(item.confidence * 100).toFixed(2)}%</td>

                  <td>
                    <div className="flex justify-center">
                      <button className="rounded-lg bg-indigo-600 p-2 text-white transition hover:bg-indigo-700">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {history.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No Attendance Records Found
            </div>
          )}
        </div>

        {/* ================= Mobile Card View ================= */}

        <div className="grid gap-5 lg:hidden">
          {history.map((item) => (
            <div key={item._id} className="rounded-2xl bg-white p-5 shadow-lg">
              <div className="flex items-center gap-4">
                <Image
                  src={item.liveImage}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={15} className="text-blue-600" />

                    {new Date(item.date).toLocaleDateString()}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                    <Clock3 size={15} className="text-purple-600" />

                    {item.time}
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

                  <p className="mt-1 font-semibold text-indigo-600">
                    {(item.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Matched</p>

                  <div className="mt-1 flex items-center gap-2">
                    {item.matched ? (
                      <>
                        <CheckCircle2 size={18} className="text-green-600" />
                        <span className="text-green-700 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-red-600" />
                        <span className="text-red-700 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <button className="rounded-lg bg-indigo-600 p-3 text-white transition hover:bg-indigo-700">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow">
              No Attendance Records Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
