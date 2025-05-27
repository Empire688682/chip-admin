import React,{ useState } from "react";

// Dummy wallet log data
const dummyLogs = Array.from({ length: 28 }, (_, i) => ({
  id: `LOG${i + 1000}`,
  user: `User ${i + 1}`,
  type: ["Credit", "Debit"][i % 2],
  amount: `₦${Math.floor(Math.random() * 10000 + 1000)}`,
  reason: ["Funding", "Airtime", "Transfer", "Refund"][i % 4],
  status: ["Success", "Failed"][i % 2],
  date: `2025-05-${String((i % 28) + 1).padStart(2, "0")} 0${i % 10}:00`,
}));

export default function WalletLogs() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = dummyLogs.filter(
    (log) =>
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.type.toLowerCase().includes(search.toLowerCase()) ||
      log.reason.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const getStatusColor = (status) =>
    status === "Success" ? "text-green-600" : "text-red-600";

  const exportCSV = () => {
    const headers = ["ID", "User", "Type", "Amount", "Reason", "Status", "Date"];
    const rows = filtered.map((log) => [
      log.id,
      log.user,
      log.type,
      log.amount,
      log.reason,
      log.status,
      log.date,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wallet_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Wallet Logs</h1>
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
          placeholder="Search by user, type, or reason"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Log ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((log) => (
                <tr key={log.id}>
                  <td className="p-2 border">{log.id}</td>
                  <td className="p-2 border">{log.user}</td>
                  <td className="p-2 border">{log.type}</td>
                  <td className="p-2 border">{log.amount}</td>
                  <td className="p-2 border">{log.reason}</td>
                  <td className={`p-2 border font-medium ${getStatusColor(log.status)}`}>
                    {log.status}
                  </td>
                  <td className="p-2 border">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-4">No wallet logs found.</p>
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
