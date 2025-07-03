import React, { useState } from 'react';

export default function BankForm() {
  const [form, setForm] = useState({ accountNumber: '', ifsc: '', bankName: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:3000/employee/bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Submission failed');
      } else {
        setMessage('✅ Bank details submitted successfully!');
      }
    } catch (err) {
      setMessage('❌ Failed to submit bank details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white p-6 rounded shadow border space-y-4 text-black">
        <h2 className="text-2xl font-semibold text-center mb-4">Submit Bank Details</h2>

        <input
          type="text"
          placeholder="Account Number"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.accountNumber}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.ifsc}
          onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Bank Name"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.bankName}
          onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          required
        />

        <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
          Submit
        </button>

        {message && <p className="text-center text-green-700 font-medium">{message}</p>}
      </form>
    </div>
  );
}
