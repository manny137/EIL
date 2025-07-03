import React, { useState } from 'react';

export default function LeaveForm() {
  const [form, setForm] = useState({ fromDate: '', toDate: '', reason: '' });
  const [leaveBalance, setLeaveBalance] = useState(15);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const from = new Date(form.fromDate);
    const to = new Date(form.toDate);
    const days = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) return alert("❌ Invalid date range");
    if (days > leaveBalance) return alert("❌ Not enough leave balance");

    await fetch('http://localhost:3000/employee/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ fromDate: '', toDate: '', reason: '' });
    setLeaveBalance((prev) => prev - days);
    alert('✅ Leave applied successfully');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow border space-y-6 text-black">
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">Apply for Leave</h2>
          <p className="text-center text-gray-700 mb-4">
            Leave Balance: <strong>{leaveBalance}</strong> days
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">From Date</label>
              <input
                type="date"
                value={form.fromDate}
                onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
                className="w-full border p-2 rounded text-black bg-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">To Date</label>
              <input
                type="date"
                value={form.toDate}
                onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                className="w-full border p-2 rounded text-black bg-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Reason</label>
              <textarea
                placeholder="Reason for leave"
                className="w-full border p-2 rounded text-black bg-white"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
