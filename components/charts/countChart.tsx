"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Typography } from "../ui/typography";
import { Chart, ChartContent, ChartFooter, ChartHeader } from "../ui/chart";
import { useTheme } from "next-themes";
import { calculatePercentage } from "@/utils/root.utils";

// Updated data to reflect projects
const data = (theme: string = "light") => [
  {
    name: "Total",
    count: 300,
    fill: theme === "light" ? "#f5f5f5" : "#262626",
  },
  {
    name: "Completed",
    count: 195, // Adjust this value as needed
    fill: theme === "light" ? "hsl(150,60%,45%)" : "hsl(150,60%,55%)",
  },
  {
    name: "In Progress",
    count: 90, // Adjust this value as needed
    fill: theme === "light" ? "hsl(45,100%,55%)" : "hsl(45, 100%, 45%)",
  },
  {
    name: "Not Started",
    count: 15, // Adjust this value as needed
    fill: theme === "light" ? "hsl(30,70%,50%)" : "hsl(30,70%,60%)",
  },
];

const CountChart = () => {
  const { theme } = useTheme();

  // Extracting data for easier access
  const chartData = data(theme);
  const total = chartData[0].count; // Total projects

  return (
    <Chart className="">
      {/* TITLE */}
      <ChartHeader headerElipses headerTitle="Projects" />
      {/* CHART */}
      <ChartContent>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={chartData}
          >
            <RadialBar
              dataKey="count"
              background={{ fill: theme === "dark" ? "#404040" : "#FFF" }} // Dark or light background
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/avatars.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </ChartContent>
      {/* BOTTOM */}
      <ChartFooter className="gap-5">
        {chartData.slice(1).map((item) => (
          <div key={item.name} className="flex flex-col">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <Typography variant="h1" className="text-lg">
              {item.count}
            </Typography>
            <Typography
              variant="h4"
              className="text-xs text-neutral-400 dark:text-neutral-400"
            >
              {`${item.name} (${calculatePercentage(total, item.count)}%)`}
            </Typography>
          </div>
        ))}
      </ChartFooter>
    </Chart>
  );
};

export default CountChart;
