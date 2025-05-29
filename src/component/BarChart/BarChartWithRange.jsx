import React, { useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "W1", transactions: 120 },
  { name: "W2", transactions: 240 },
  { name: "W3", transactions: 190 },
  { name: "W4", transactions: 220 },
];

const monthlyData = [
  { name: "Jan", transactions: 400 },
  { name: "Feb", transactions: 300 },
  { name: "Mar", transactions: 500 },
  { name: "Apr", transactions: 250 },
  { name: "May", transactions: 600 },
  { name: "Jun", transactions: 450 },
];

const dailyData = [
  { name: "Mon", transactions: 40 },
  { name: "Tue", transactions: 60 },
  { name: "Wed", transactions: 30 },
  { name: "Thu", transactions: 90 },
  { name: "Fri", transactions: 100 },
  { name: "Sat", transactions: 70 },
  { name: "Sun", transactions: 80 },
];

const BarChartWithRange = () => {
  const [range, setRange] = useState("weekly");

  const getChartData = () => {
    switch (range) {
      case "daily":
        return dailyData;
      case "monthly":
        return monthlyData;
      case "weekly":
      default:
        return weeklyData;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <div className="mb-4">
        <label className="text-sm font-medium mr-2">View:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="transactions" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWithRange;