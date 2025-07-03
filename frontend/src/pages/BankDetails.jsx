import React, { useEffect, useState } from 'react';

export default function BankDetails() {
  const [details, setDetails] = useState({ accountNumber: '', ifsc: '', bankName: '' });
  const [existing, setExisting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBankDetails = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/employee/bank', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 200) {
      const data = await res.json();
      setDetails(data);
      setExisting(true);
    } else {
      setExisting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/employee/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(details)
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Bank details submitted successfully!');
      setExisting(true);
    } else {
      setMessage(data.message || '❌ Submission failed');
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white p-6 rounded shadow border space-y-4 text-black">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {existing ? 'Your Bank Details' : 'Submit Bank Details'}
        </h2>

        <input
          type="text"
          placeholder="Account Number"
          value={details.accountNumber}
          onChange={(e) => setDetails({ ...details, accountNumber: e.target.value })}
          disabled={existing}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={details.ifsc}
          onChange={(e) => setDetails({ ...details, ifsc: e.target.value })}
          disabled={existing}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={details.bankName}
          onChange={(e) => setDetails({ ...details, bankName: e.target.value })}
          disabled={existing}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        {!existing && (
          <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
            Submit
          </button>
        )}

        {message && <p className="text-center text-green-700 font-medium">{message}</p>}
      </form>
    </div>
  );
}
