"use client";

import {
  GraduationCap,
  User,
  Bell,
  BookOpen,
  CalendarDays,
  Settings,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Welcome Student 👋</h1>

        <p className="mt-3 max-w-2xl text-indigo-100">
          Welcome to your student portal. Use the shortcuts below to navigate
          through your account, profile, attendance, leave requests, and other
          academic services.
        </p>

        <Button
          className="mt-6 bg-white text-indigo-700 hover:bg-gray-100"
          asChild
        >
          <Link href="/student/profile">
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="mb-5 text-2xl font-bold">Quick Access</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/student/profile">
            <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-indigo-100 p-4">
                  <User className="h-7 w-7 text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Profile</h3>

                  <p className="text-sm text-muted-foreground">
                    View and update your profile.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/attendance">
            <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-green-100 p-4">
                  <CalendarDays className="h-7 w-7 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Attendance</h3>

                  <p className="text-sm text-muted-foreground">
                    Check your attendance records.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/leave">
            <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-orange-100 p-4">
                  <BookOpen className="h-7 w-7 text-orange-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Leave Requests</h3>

                  <p className="text-sm text-muted-foreground">
                    Apply and manage leaves.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/notifications">
            <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-pink-100 p-4">
                  <Bell className="h-7 w-7 text-pink-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Notifications</h3>

                  <p className="text-sm text-muted-foreground">
                    View latest announcements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/settings">
            <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-gray-100 p-4">
                  <Settings className="h-7 w-7 text-gray-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Settings</h3>

                  <p className="text-sm text-muted-foreground">
                    Manage your account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-dashed">
            <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
              <GraduationCap className="mb-4 h-12 w-12 text-indigo-600" />

              <h3 className="text-lg font-semibold">Welcome to AttendX AI</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Your student portal for attendance, leave management, profile,
                and academic services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>Student Portal</CardTitle>

          <CardDescription>
            Everything you need is available from the quick access cards above.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <h4 className="font-semibold">Profile</h4>

              <p className="mt-2 text-sm text-muted-foreground">
                Keep your personal information updated.
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h4 className="font-semibold">Attendance</h4>

              <p className="mt-2 text-sm text-muted-foreground">
                Track your attendance and reports.
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h4 className="font-semibold">Leave</h4>

              <p className="mt-2 text-sm text-muted-foreground">
                Submit and monitor leave applications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
