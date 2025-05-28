import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import WalletLogs from './pages/WalletLogs';
import Service from './pages/Service';
import Commission from './pages/Commission';
import Settings from './pages/Settings';
import Activity from './pages/Activity';
import Referrals from './pages/Referrals';
import SignupPage from './pages/SignupPage';
// Import other pages as needed

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet-logs" element={<WalletLogs />} />
        <Route path="/services" element={<Service />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
  );
};

export default App;
