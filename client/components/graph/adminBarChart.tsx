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

export const description = "A bar chart with a custom label";

const chartData = [
  { department: "Engineering", sync: 94 },
  { department: "Medical", sync: 87 },
  { department: "Arts", sync: 79 },
  { department: "Business", sync: 91 },
];

const chartConfig = {
  sync: {
    label: "Sync",
    color: "#60a5fa",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function AdminBarChart() {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="px-2 pb-1 pt-0">
        <ChartContainer config={chartConfig} className="h-44 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            barCategoryGap="28%"
            barSize={16}
            margin={{
              top: 6,
              right: 22,
              bottom: 6,
              left: 6,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="department"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={90}
            />
            <XAxis dataKey="sync" type="number" domain={[0, 100]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="sync" fill="var(--color-sync)" radius={4}>
              <LabelList
                dataKey="sync"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
