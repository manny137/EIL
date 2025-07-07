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
        setMessage(data.message || '❌ Submission failed');
      } else {
        setMessage('✅ Bank details submitted successfully!');
        setForm({ accountNumber: '', ifsc: '', bankName: '' }); // Clear form
      }
    } catch (err) {
      setMessage('❌ Failed to submit bank details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md border space-y-6 text-black"
      >
        <h2 className="text-3xl font-bold text-center text-black">Submit Bank Details</h2>

        <input
          type="text"
          placeholder="Account Number"
          className="w-full border border-gray-300 p-2 rounded bg-white"
          value={form.accountNumber}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="IFSC Code"
          className="w-full border border-gray-300 p-2 rounded bg-white"
          value={form.ifsc}
          onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Bank Name"
          className="w-full border border-gray-300 p-2 rounded bg-white"
          value={form.bankName}
          onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold"
        >
          Submit
        </button>

        {message && (
          <p
            className={`text-center font-medium ${
              message.startsWith('✅') ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
