"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { AttendanceTrendPoint } from "@/lib/hook/studentDas";

const chartConfig = {
  attendance: {
    label: "Attendance %",
    color: "#4f46e5",
  },
} satisfies ChartConfig;

interface StudentAttendanceChartProps {
  data: AttendanceTrendPoint[];
}

export function StudentAttendanceChart({ data }: StudentAttendanceChartProps) {
  const hasData = data.length > 0;

  const last = data[data.length - 1]?.attendance ?? 0;
  const prev = data[data.length - 2]?.attendance ?? last;

  const delta = prev ? (((last - prev) / prev) * 100).toFixed(1) : "0.0";

  const isUp = last >= prev;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">
          Monthly Attendance
        </CardTitle>

        <CardDescription>
          Your attendance performance over the last {data.length || 6} months.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                top: 10,
                left: 12,
                right: 12,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Area
                type="natural"
                dataKey="attendance"
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#attendanceFill)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
            No attendance history available.
          </div>
        )}
      </CardContent>

      {hasData && (
        <CardFooter className="px-0 pb-0">
          <div className="grid gap-1 text-sm">
            <div className="flex items-center gap-2 font-medium">
              {isUp ? (
                <>
                  Trending Up by {Math.abs(Number(delta))}%
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </>
              ) : (
                <>
                  Trending Down by {Math.abs(Number(delta))}%
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </>
              )}
            </div>

            <p className="text-muted-foreground">
              Compared with your previous month&apos;s attendance.
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
