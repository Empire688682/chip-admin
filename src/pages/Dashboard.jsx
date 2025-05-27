import React from "react";
import BarChart from "../component/BarChart/BarChart";
import { Card, CardContent } from "../component/ui/card";

export default function Dashboard() {
  return (
    <>
      <h1 className="">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-xl font-bold">1,245</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold">₦452,000</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Transactions</p>
            <h2 className="text-xl font-bold">3,209</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Wallet Balance</p>
            <h2 className="text-xl font-bold">₦118,000</h2>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Transaction Volume</h2>
        <BarChart />
      </div>
    </>
  );
}