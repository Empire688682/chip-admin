import React from "react";
import { useGlobalContext } from "../Context";

export function Topbar() {
  const {userData} = useGlobalContext();

  return (
    <header className="w-full bg-white border-b border-gray-400 shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-800 hidden md:block">Admin Panel</h2>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold">{userData.name}</p>
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}