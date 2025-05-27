import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", transactions: 400 },
  { name: "Feb", transactions: 300 },
  { name: "Mar", transactions: 500 },
  { name: "Apr", transactions: 250 },
  { name: "May", transactions: 600 },
  { name: "Jun", transactions: 450 },
];

const BarChart = () => {
  return (
    <div className="bg-white p-4 rounded shadow w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="transactions" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
