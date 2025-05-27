import React from "react";

export default function Users() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="bg-white p-4 rounded shadow">
        <input type="text" placeholder="Search by email or phone" className="mb-4 border p-2 rounded w-full" />
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Wallet</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">09012345678</td>
              <td className="p-2 border">₦12,000</td>
              <td className="p-2 border text-green-600">Active</td>
              <td className="p-2 border">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
