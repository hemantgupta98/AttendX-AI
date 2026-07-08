"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { WeeklyAttendance } from "@/lib/hook/studentDas";

const chartConfig = {
  percentage: {
    label: "Attendance %",
    color: "#4f46e5",
  },
} satisfies ChartConfig;

interface StudentWeeklyChartProps {
  data: WeeklyAttendance[];
}

export function StudentWeeklyChart({ data }: StudentWeeklyChartProps) {
  if (!data.length) {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Weekly Attendance</CardTitle>
          <CardDescription>
            Your attendance performance throughout the week.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
            No attendance history available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Weekly Attendance</CardTitle>

        <CardDescription>Attendance percentage by weekday.</CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                top: 10,
                right: 25,
                left: 10,
                bottom: 10,
              }}
              barCategoryGap="28%"
              barSize={18}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />

              <YAxis
                dataKey="day"
                type="category"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                width={55}
              />

              <XAxis
                dataKey="percentage"
                type="number"
                domain={[0, 100]}
                hide
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Bar dataKey="percentage" fill="#4f46e5" radius={8}>
                <LabelList
                  dataKey="percentage"
                  position="right"
                  className="fill-foreground font-medium"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

{
  /** formatter={(value: number) => `${value}%`} */
}
