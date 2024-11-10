"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Chart, ChartContent, ChartHeader } from "../ui/chart";
import { useTheme } from "next-themes";
import { addSpaceBeforeCapitalLetters, getKeysExcludingField, truncateMessage } from "@/utils/root.utils";

const lightThemeColors = ["#4CAF50", "#2196F3"];

const darkThemeColors = [
  "#64B5F6", // Green
  "#81C784",
];

const TeamBarChart = ({ data: teamData }: {data: _ITopSoldItems[]}) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? lightThemeColors : darkThemeColors;
  const datakeys = getKeysExcludingField<_ITopSoldItems>(teamData, "name");

  return (
    <Chart>
      <ChartHeader headerTitle="Team Performance" headerElipses />
      <ChartContent className="h-full">
        <ResponsiveContainer width="100%" height={"90%"}>
          <BarChart data={teamData.map(data => {
            return {
              ...data, name: truncateMessage(data.name, 10)
          } })} width={500} height={300} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme === "light" ? "#ddd" : "hsl(210, 25%, 20%)"}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: theme === "light" ? "#a3a3a3" : undefined }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: theme === "light" ? "#a3a3a3" : undefined }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            />
            {datakeys.map((key, idx) => (
              <Bar
                key={key+idx}
                dataKey={key}
                fill={colors[idx]}
                name={addSpaceBeforeCapitalLetters(key)}
                legendType="rect"
                radius={[10, 10, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContent>
    </Chart>
  );
};

export default TeamBarChart;
