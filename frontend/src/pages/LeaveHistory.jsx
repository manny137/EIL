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
      alert('Failed to load leave history');
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white p-6 rounded shadow border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Leave History</h2>
        {history.length === 0 ? (
          <p className="text-center text-gray-600">No leave records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm text-left text-gray-800">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">From Date</th>
                  <th className="p-2 border">To Date</th>
                  <th className="p-2 border">Days</th>
                  <th className="p-2 border">Reason</th>
                </tr>
              </thead>
              <tbody>
                {history.map((leave) => {
                  const days =
                    Math.floor((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
                  return (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{leave.fromDate}</td>
                      <td className="p-2 border">{leave.toDate}</td>
                      <td className="p-2 border">{days}</td>
                      <td className="p-2 border">{leave.reason}</td>
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
