"use client";

import {
  CalendarCheck2,
  CircleCheckBig,
  CircleX,
  ScanFace,
} from "lucide-react";

import { StudentAttendanceChart } from "@/components/graph/studentDashboard";
import { StudentWeeklyChart } from "@/components/graph/studentReport";

import { useStudentDashboard } from "@/lib/hook/studentDas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentDashboard() {
  const { analytics, monthlyTrend, weeklyTrend, history, loading } =
    useStudentDashboard();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>

        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s your attendance overview.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Attendance</p>

              <h2 className="mt-2 text-3xl font-bold">
                {analytics.attendance}%
              </h2>
            </div>

            <CalendarCheck2 className="h-11 w-11 text-indigo-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Present</p>

              <h2 className="mt-2 text-3xl font-bold">{analytics.present}</h2>
            </div>

            <CircleCheckBig className="h-11 w-11 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Absent</p>

              <h2 className="mt-2 text-3xl font-bold">{analytics.absent}</h2>
            </div>

            <CircleX className="h-11 w-11 text-red-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Face Match</p>

              <h2 className="mt-2 text-3xl font-bold">
                {analytics.matchRate}%
              </h2>
            </div>

            <ScanFace className="h-11 w-11 text-violet-600" />
          </CardContent>
        </Card>
      </div>

      {/* Graphs */}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border bg-background p-6">
          <StudentAttendanceChart data={monthlyTrend} />
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <StudentWeeklyChart data={weeklyTrend} />
        </div>
      </div>

      {/* Recent Attendance */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {history.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/40"
              >
                <div>
                  <h3 className="font-medium">{item.date}</h3>

                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      item.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
