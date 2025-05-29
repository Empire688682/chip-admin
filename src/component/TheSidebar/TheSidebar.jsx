import { Link, useLocation } from "react-router-dom";
import {
  Home, Users, Settings, Activity, Wallet, CreditCard, Repeat, TrendingUp,
  Menu, LogOut, Moon, Sun
} from "lucide-react";
import React ,{ useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/users", label: "Users", icon: <Users size={18} /> },
  { to: "/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
  { to: "/wallet-logs", label: "Wallet Logs", icon: <Wallet size={18} /> },
  { to: "/services", label: "Services", icon: <Repeat size={18} /> },
  { to: "/commission", label: "Commission", icon: <TrendingUp size={18} /> },
  { to: "/referrals", label: "Referrals", icon: <Users size={18} /> },
  { to: "/activity", label: "Activity", icon: <Activity size={18} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export function TheSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {apiUrl} = useGlobalContext();

  const logoutAdmin = async () =>{
    try {
      const res = await axios.post(`${apiUrl}/logout`, null,
        {withCredentials:true}
      );
      console.log("res:", res);
      if(res.status !== 200){
        console.log("Error:", res);
      };
      localStorage.removeItem("userData");
      window.location.reload()
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <aside className={`bg-white border-r border-gray-400 h-screen overflow-scroll p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold text-indigo-600 transition-opacity ${collapsed ? 'hidden' : 'block'}`}>ChipAdmin</h1>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-3 py-5 rounded-md text-sm font-medium transition whitespace-nowrap overflow-hidden ${
                isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {!collapsed && label}
            </Link>
          );
        })}
        <p className="flex items-center cursor-pointer px-3 py-5 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium transition whitespace-nowrap overflow-hidden" onClick={logoutAdmin}>
          <span className="mr-2"><LogOut size={18} /></span>
          Logout
          </p>
      </nav>
    </aside>
  );
}
