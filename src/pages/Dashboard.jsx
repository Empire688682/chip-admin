import React, { useEffect, useState } from "react";
import BarChartWithRange from "../component/BarChart/BarChartWithRange";
import { Card, CardContent } from "../component/ui/card";
import { useGlobalContext } from "../component/Context";
import axios from "axios";

export default function Dashboard() {
  const { allUsers, apiUrl } = useGlobalContext();
  const [totalWallet, setTotalWallet] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [providerWallet, setProviderWallet] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(`${apiUrl}/payment/revenue`, {
          withCredentials: true,
        });
        setRevenue(response.data.totalRevenue || 0);
      } catch (error) {
        console.log("Error fetching revenue:", error);
      }
    };
    fetchTotalRevenue();
  }, []);

  useEffect(() => {
    const TotalSuccessTransaction = async () => {
      try {
        const response = await axios.get(`${apiUrl}/transaction/success-transactions`, {
          withCredentials: true,
        });
        setTransactions(response.data.totalTransaction || 0);
      } catch (error) {
        console.log("Error fetching transactions:", error);
      }
    };
    TotalSuccessTransaction();
  }, []);

  useEffect(() => {
    const getProviderWallet = async () => {
      try {
        const response = await axios.get(`${apiUrl}/provider/wallet`, {
          withCredentials: true,
        });
        setProviderWallet(response.data.walletBalance || 0);
      } catch (error) {
        console.log("Error fetching provider wallet:", error);
      }
    };
    getProviderWallet();
  }, []);

  useEffect(() => {
    if (!allUsers || allUsers.length < 1) return;
    const calculateUserTotalAmount = () => {
      const total = allUsers
        .map((user) => Number(user.walletBalance) || 0)
        .reduce((sum, bal) => sum + bal, 0);
      setTotalWallet(total);
    };
    calculateUserTotalAmount();
  }, [allUsers]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-xl font-bold">{allUsers.length}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold">₦{revenue.toLocaleString()}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Total Transactions</p>
            <h2 className="text-xl font-bold">₦{transactions.toLocaleString()}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Wallet Balance</p>
            <h2 className="text-xl font-bold">₦{totalWallet.toLocaleString()}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-gray-500">Provider Balance</p>
            <h2 className="text-xl font-bold">₦{providerWallet.toLocaleString()}</h2>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Transaction Volume</h2>
        <BarChartWithRange />
      </div>
    </div>
  );
}