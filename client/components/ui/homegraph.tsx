import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Chart from "react-apexcharts";
import Image from "next/image";
import type { ApexAxisChartSeries, ApexOptions } from "apexcharts";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts

const chartConfig: {
  type: "line";
  height: number;
  series: ApexAxisChartSeries;
  options: ApexOptions;
} = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Average Attandance",
      data: [55, 48, 30, 81, 70, 88, 85, 46, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function Example() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
        <Image src="/logo.png" height={150} width={150} alt="logo" />

        <div>
          <h1 className=" text-gray-600 font-semibold">
            Your Attendance reports
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-light">
            See how AttendX-AI is changing the daily workflow <br />
            for eductors and students.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardContent>
    </Card>
  );
}
