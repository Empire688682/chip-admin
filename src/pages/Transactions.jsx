import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../component/Context";

export default function Transactions() {
  const {apiUrl, allUsers} = useGlobalContext();
  const [allTransaction, setAllTransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  console.log("allUsers:", allUsers);

  useEffect(()=>{
    const fetchAllTransaction = async () =>{
    try {
      const response = await fetch(`${apiUrl}/transaction/all-transactions`,
        {method: "GET",
          credentials: "include",
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      if(!response.ok){
        console.log("ERROR:", response)
      }
      const data = await response.json();
      setAllTransaction(data.data);
    } catch (error) {
      console.log("ERROR:", error)
    }
  }
  fetchAllTransaction();
  }, [])

  const filtered = allTransaction.filter(
    (txn) =>
      txn._id.toLowerCase().includes(search.toLowerCase()) ||
      txn.userId.toLowerCase().includes(search.toLowerCase()) ||
      txn.type.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.reverse().slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const getUserById = (id) =>{
    if(allUsers && allTransaction && allTransaction.length > 0){
      const user = allUsers.find((user) => id === user._id);
    console.log("user:", user);
    return user? user.name : "unknow user";
    }
    
  }
  

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "User", "Amount", "Type", "Status", "Date"];
    const rows = filtered.map((txn) => [
      txn.id,
      txn.user,
      txn.amount,
      txn.type,
      txn.status,
      txn.date,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <button
          onClick={exportCSV}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by ID, user or type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Transaction ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((txn) => (
                <tr key={txn._id}>
                  <td className="p-2 border">{txn._id}</td>
                  <td className="p-2 border">{getUserById(txn.userId)}</td>
                  <td className="p-2 border">{txn.amount}</td>
                  <td className="p-2 border">{txn.type}</td>
                  <td className={`p-2 border font-medium ${getStatusColor(txn.status)}`}>
                    {txn.status}
                  </td>
                  <td className="p-2 border">{txn.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-4">No transactions found.</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Showing {paginated.length} of {filtered.length} results
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2 font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
