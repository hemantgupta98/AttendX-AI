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
import type { AttendanceTrendPoint } from "@/lib/hook/adminDas";

const chartConfig = {
  attendance: { label: "Attendance", color: "#4f46e5" },
} satisfies ChartConfig;

export function AdminDashboard({ data }: { data: AttendanceTrendPoint[] }) {
  const hasData = data.length > 0;
  const last = data[data.length - 1]?.attendance ?? 0;
  const prev = data[data.length - 2]?.attendance ?? last;
  const delta = prev ? (((last - prev) / prev) * 100).toFixed(1) : "0.0";
  const isUp = last >= prev;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Attendance Trend</CardTitle>
        <CardDescription>
          Institution-wide daily average, last {data.length || 6} months
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ left: 12, right: 12 }}
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="attendance"
                type="natural"
                fill="url(#attendanceFill)"
                stroke="#4f46e5"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400">
            No attendance data yet
          </div>
        )}
      </CardContent>
      {hasData && (
        <CardFooter className="px-0 pb-0">
          <div className="grid gap-1 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              {isUp ? "Trending up" : "Trending down"} by{" "}
              {Math.abs(Number(delta))}%
              {isUp ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="leading-none text-muted-foreground">
              Compared to previous month
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
