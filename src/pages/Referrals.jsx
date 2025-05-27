
import React, { useState } from "react";

// Sample referral data
const referralData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    referrals: 5,
    earnings: 2500,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    referrals: 3,
    earnings: 1800,
  },
  {
    id: 3,
    name: "Alex Kings",
    email: "alex@example.com",
    referrals: 7,
    earnings: 3600,
  },
];

export default function Referrals() {
  const [search, setSearch] = useState("");

  const filtered = referralData.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Referrals</h1>

      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />

        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Referrals</th>
              <th className="p-2 border">Earnings (₦)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.referrals}</td>
                <td className="p-2 border">₦{user.earnings.toLocaleString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
