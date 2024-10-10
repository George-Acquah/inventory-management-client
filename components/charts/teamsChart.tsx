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

// Sample team data
const teamData = [
  {
    name: "Team Alpha",
    completedProjects: 30,
    totalMembers: 10,
    averageCompletionTime: 5,
  },
  {
    name: "Team Beta",
    completedProjects: 20,
    totalMembers: 12,
    averageCompletionTime: 3,
  },
  {
    name: "Team Gamma",
    completedProjects: 25,
    totalMembers: 8,
    averageCompletionTime: 6,
  },
];

const TeamBarChart = () => {
  const { theme } = useTheme();

  return (
    <Chart>
      <ChartHeader headerTitle="Team Performance" headerElipses />
      <ChartContent className="h-full">
        <ResponsiveContainer width="100%" height={"90%"}>
          <BarChart data={teamData} width={500} height={300} barSize={20}>
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
            <Bar
              dataKey="completedProjects"
              fill={theme === "light" ? "#4CAF50" : "#81C784"}
              name="Completed Projects"
              legendType="rect"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="totalMembers"
              fill={theme === "light" ? "#2196F3" : "#64B5F6"}
              name="Total Members"
              legendType="rect"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="averageCompletionTime"
              fill={theme === "light" ? "#FF9800" : "#FFB74D"}
              name="Avg Completion Time (days)"
              legendType="rect"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContent>
    </Chart>
  );
};

export default TeamBarChart;
