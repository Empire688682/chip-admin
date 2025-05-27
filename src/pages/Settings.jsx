
import React, { useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    appName: "Chipsub",
    supportEmail: "support@chipsub.com",
    supportPhone: "+2349012345678",
    enableWalletFunding: true,
    enableReferrals: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", form);
    // Call API to save settings
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">App Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-2xl">
        <div className="mb-4">
          <label className="block font-medium">App Name</label>
          <input
            type="text"
            name="appName"
            value={form.appName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Support Email</label>
          <input
            type="email"
            name="supportEmail"
            value={form.supportEmail}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Support WhatsApp Number</label>
          <input
            type="tel"
            name="supportPhone"
            value={form.supportPhone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="enableWalletFunding"
            checked={form.enableWalletFunding}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Enable Wallet Funding</label>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            name="enableReferrals"
            checked={form.enableReferrals}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Enable Referral System</label>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
