import { Moon, Sun } from "lucide-react";
import React,{ useState } from "react";

export function Topbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-400 shadow-sm px-6 py-3 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}