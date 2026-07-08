"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DepartmentStat } from "@/lib/hook/adminDas";

const chartConfig = {
  percentage: { label: "Attendance", color: "#4f46e5" },
  label: { color: "var(--background)" },
} satisfies ChartConfig;

export function AdminBarChart({ data }: { data: DepartmentStat[] }) {
  if (!data.length) {
    return (
      <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400">
        No department data yet
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="px-2 pb-1 pt-0">
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            barCategoryGap="28%"
            barSize={16}
            margin={{ top: 6, right: 28, bottom: 6, left: 6 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <YAxis
              dataKey="department"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
            />
            <XAxis dataKey="percentage" type="number" domain={[0, 100]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="percentage" fill="#4f46e5" radius={6}>
              <LabelList
                dataKey="percentage"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
