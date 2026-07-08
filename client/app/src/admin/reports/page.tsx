"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CalendarDays, Clock3, Eye } from "lucide-react";

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

{
  /**const initialAttendanceState: AttendanceHistory = {
  _id: "",
  name: "",
  storedImage: "",
  liveImage: "",
  status: "",
  matched: false,
  confidence: 0,
  date: "",
  time: "",
}; */
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
      const token = localStorage.getItem("auth_token");

      const res = await axios.get(`${apiBaseUrl}/admin/live-image/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Response:", res.data);
      console.log("History:", res.data.data);

      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Attendance History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Attendance History</h1>

            <p className="text-gray-500">
              AI Face Recognition Attendance Records
            </p>
          </div>

          <div className="rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold">
            Total Records : {history.length}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr className="text-left">
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
                  className="border-t hover:bg-slate-50 transition"
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

                  <td>
                    <h3 className="font-semibold">{item.name}</h3>
                  </td>

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
                      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 text-sm">
                        No
                      </span>
                    )}
                  </td>

                  <td>{(item.confidence * 100).toFixed(2)}%</td>

                  <td>
                    <div className="flex justify-center">
                      <button className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700">
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
      </div>
    </div>
  );
}
