"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Typography } from "../ui/typography";
import { Chart, ChartContent, ChartFooter, ChartHeader } from "../ui/chart";
import { useTheme } from "next-themes";
import { calculatePercentage } from "@/utils/root.utils";

const lightThemeColors = [
  "hsl(150,60%,45%)", // Green
  "#f5f5f5", // Light grey
  "hsl(45,100%,55%)", // Yellow
  "hsl(30,70%,50%)", // Orange
  // Add more colors as needed
];

const darkThemeColors = [
  "hsl(150,60%,55%)", // Green
  "#262626", // Dark grey
  "hsl(45,100%,45%)", // Yellow
  "hsl(30,70%,60%)", // Orange
];

interface _IC extends _ICountData {
  fill: string;
}

const applyColorsToCountData = (
  countData: _ICountData[],
  total: number,
  theme: string = "light"
):  _IC[] => {
  const colors = theme === "light" ? lightThemeColors : darkThemeColors;

  const newData = countData.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  return [...newData, { fill: 'gray', name: 'Total', count: total}];
};


const CountChart = ({ countData }: { countData: _ICountData[] }) => {
  const { theme } = useTheme();

  // Extracting data for easier access
  const total = countData.reduce((acc, newItem) => acc + newItem.count, 0);
  const chartData = applyColorsToCountData(countData, total);

  return (
    <Chart className="">
      {/* TITLE */}
      <ChartHeader headerElipses headerTitle="Top Sellers" />
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
              background={{ fill: theme === "dark" ? "#404040" : "#FFF" }}
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
        {chartData.map((item) => (
          <>
            {item.name === "Total" ? undefined : (
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
            )}
          </>
        ))}
      </ChartFooter>
    </Chart>
  );
};

export default CountChart;
