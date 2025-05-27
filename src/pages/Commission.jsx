import React, { useState } from "react";

// Dummy commission data
const dummyCommissions = [
  { id: 1, service: "Airtime", type: "Telecom", rate: 3.5 },
  { id: 2, service: "Data", type: "Telecom", rate: 5.0 },
  { id: 3, service: "Electricity", type: "Utility", rate: 2.0 },
  { id: 4, service: "Cable TV", type: "Entertainment", rate: 2.5 },
  { id: 5, service: "Exam Pins", type: "Education", rate: 1.5 },
];

export default function Commission() {
  const [search, setSearch] = useState("");

  const filtered = dummyCommissions.filter((item) =>
    item.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Commission Rates</h1>

      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
        />

        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Rate (%)</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border font-medium">{item.service}</td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border">{item.rate}%</td>
                <td className="p-2 border">
                  <button className="text-indigo-600 hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
