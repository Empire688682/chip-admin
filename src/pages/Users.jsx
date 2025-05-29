import React from "react";
import { useGlobalContext } from "../component/Context";
import { useState } from "react";
import { useEffect } from "react";

export default function Users() {

  const { apiUrl } = useGlobalContext();
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/all-users`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },

        },
      );
      if (!response.ok) {
        console.log("Error:", response);
        return
      }
      const data = await response.json();
      setAllUsers(data)

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="bg-white p-2 rounded shadow">
        <input type="text" placeholder="Search by email or phone" className="mb-4 border border-gray-400 p-2 rounded w-full" />
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-400">Name</th>
              <th className="p-2 border border-gray-400">Email</th>
              <th className="p-2 border border-gray-400">Phone</th>
              <th className="p-2 border border-gray-400">Wallet</th>
              <th className="p-2 border border-gray-400">Status</th>
              <th className="p-2 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="min-h-[70vh]">
            {
              allUsers.length > 0 ? 
              <div>
                  {
                    allUsers.map((user, id) => (
                      <tr key={id}>
                        <td className="p-2 border-gray-400 border">{user.name}</td>
                        <td className="p-2 border-gray-400 border">{user.email}</td>
                        <td className="p-2 border-gray-400 border">{user.number}</td>
                        <td className="p-2 border-gray-400 border">{user.walletBalance}</td>
                        <td className="p-2 border-gray-400 border text-green-600">Active</td>
                        <td className="p-2 border-gray-400 border">
                          <button className="text-blue-600 hover:underline">View</button>
                        </td>
                      </tr>
                    ))
                  }
                </div>
                :
              <div className="p-3">
                <p>No Users Found</p>
              </div>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
