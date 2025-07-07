import React, { useState } from 'react';

export default function LeaveForm() {
  const [form, setForm] = useState({ fromDate: '', toDate: '', reason: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const from = new Date(form.fromDate);
    const to = new Date(form.toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (from < today || to < today) return alert('❌ Dates must be in the future');
    if (from > to) return alert('❌ From Date cannot be after To Date');

    const res = await fetch('http://localhost:3000/employee/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ fromDate: '', toDate: '', reason: '' });
      alert('✅ Leave applied successfully');
    } else {
      const err = await res.json();
      alert(`❌ ${err.message || 'Failed to apply for leave'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border text-black space-y-6">
<h2 className="text-3xl font-bold text-center text-black">Apply for Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">To Date</label>
            <input
              type="date"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Reason</label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded bg-white resize-none"
              rows={4}
              placeholder="Reason for leave"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
