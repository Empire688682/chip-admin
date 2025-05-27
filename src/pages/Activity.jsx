
import React, { useState } from "react";

const mockLogs = [
  { id: 1, action: "User blocked", actor: "Admin", target: "john@example.com", time: "2025-05-27 10:30 AM" },
  { id: 2, action: "Wallet funded", actor: "System", target: "user44@example.com", time: "2025-05-27 09:12 AM" },
  { id: 3, action: "Referral bonus updated", actor: "Admin", target: "All users", time: "2025-05-26 03:00 PM" },
  { id: 4, action: "Logged in", actor: "Admin", target: "-", time: "2025-05-26 08:10 AM" },
  { id: 5, action: "Disabled airtime service", actor: "Admin", target: "MTN", time: "2025-05-25 07:44 PM" },
];

export default function Activity() {
  const [query, setQuery] = useState("");

  const filteredLogs = mockLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(query.toLowerCase()) ||
      log.target.toLowerCase().includes(query.toLowerCase()) ||
      log.actor.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Activity Logs</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search actions, users or changes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b text-gray-600">
            <tr>
              <th className="p-3">Action</th>
              <th className="p-3">Performed By</th>
              <th className="p-3">Target</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.actor}</td>
                  <td className="p-3">{log.target}</td>
                  <td className="p-3 text-gray-500">{log.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No logs match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
