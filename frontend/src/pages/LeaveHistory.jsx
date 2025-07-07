import React, { useEffect, useState } from 'react';

export default function LeaveHistory() {
  const [history, setHistory] = useState([]);

  const fetchLeaveHistory = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/employee/leave-history', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setHistory(data);
    } else {
      alert('❌ Failed to load leave history');
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-lg border text-black">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Leave History</h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No leave records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-center text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border">From Date</th>
                  <th className="p-3 border">To Date</th>
                  <th className="p-3 border">Total Days</th>
                  <th className="p-3 border">Reason</th>
                </tr>
              </thead>
              <tbody>
                {history.map((leave) => {
                  const days =
                    Math.floor((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
                  return (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{leave.fromDate}</td>
                      <td className="p-3 border">{leave.toDate}</td>
                      <td className="p-3 border">{days}</td>
                      <td className="p-3 border whitespace-pre-wrap break-words">{leave.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
