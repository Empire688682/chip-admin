import React,{ useState } from "react";

// Dummy service data
const dummyServices = [
  { id: 1, name: "Airtime", type: "Telecom", status: "Active" },
  { id: 2, name: "Data", type: "Telecom", status: "Active" },
  { id: 3, name: "Electricity", type: "Utility", status: "Inactive" },
  { id: 4, name: "Cable TV", type: "Entertainment", status: "Active" },
  { id: 5, name: "Exam Pins", type: "Education", status: "Inactive" },
  { id: 5, name: "Giftcard", type: "Fund", status: "Active" },
  { id: 5, name: "Crypto", type: "Fund", status: "Inactive" },
  { id: 5, name: "Transport", type: "Fund", status: "Active" },
];

export default function Services() {
  const [search, setSearch] = useState("");

  const filteredServices = dummyServices.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) =>
    status === "Active" ? "text-green-600" : "text-red-600";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Service Management</h1>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="p-2 border font-medium">{service.name}</td>
                  <td className="p-2 border">{service.type}</td>
                  <td className={`p-2 border font-semibold ${getStatusStyle(service.status)}`}>
                    {service.status}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button className="text-indigo-600 hover:underline text-sm">Edit</button>
                    <button className="text-yellow-600 hover:underline text-sm">Toggle</button>
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
