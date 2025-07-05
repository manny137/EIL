import React, { useEffect, useState } from 'react';

export default function HrDashboard() {
	const [pending, setPending] = useState([]);
	const [bankDetails, setBankDetails] = useState([]);
	const [leaveApps, setLeaveApps] = useState([]);

	const token = localStorage.getItem('token');

	useEffect(() => {
		fetch('http://localhost:3000/hr/pending-approvals', {
			headers: { Authorization: `Bearer ${token}` }
		}).then(res => res.json()).then(setPending);

		fetch('http://localhost:3000/hr/bank-details', {
			headers: { Authorization: `Bearer ${token}` }
		}).then(res => res.json()).then(setBankDetails);

		fetch('http://localhost:3000/hr/leaves', {
			headers: { Authorization: `Bearer ${token}` }
		}).then(res => res.json()).then(setLeaveApps);
	}, [token]);

	const handleOpenPdf = async (empId, type) => {
		const token = localStorage.getItem('token');
		const res = await fetch(`http://localhost:3001/file/${empId}/${type}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			alert('Failed to fetch file');
			return;
		}

		const blob = await res.blob();
		const fileURL = window.URL.createObjectURL(blob);
		window.open(fileURL);  // opens in new tab
	};

	const handleAction = async (id, action) => {
		const res = await fetch('http://localhost:3000/hr/approve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ id, action }),
		});

		const result = await res.json();
		alert(result.message);
		setPending(prev => prev.filter(emp => emp.id !== id));
	};

	const tableStyle = "w-full border text-sm text-black";
	const thStyle = "p-2 border bg-gray-100 font-semibold text-left";
	const tdStyle = "p-2 border";

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-12 border">
        <h1 className="text-3xl font-bold text-center">HR Dashboard</h1>

        {/* 🔵 Pending Approvals */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Pending Employee Approvals</h2>
          {pending.length === 0 ? (
            <p>No pending approvals.</p>
          ) : (
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>ID</th>
                  <th className={thStyle}>Name</th>
                  <th className={thStyle}>Email</th>
                  <th className={thStyle}>Aadhaar</th>
                  <th className={thStyle}>Pan</th>
                  <th className={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
		  {pending.map(emp => ( 
			  <tr key={emp.id}>
			  <td className={tdStyle}>{emp.id}</td>
			  <td className={tdStyle}>{emp.firstName} {emp.lastName}</td>
			  <td className={tdStyle}>{emp.personalEmail}</td>
			  <td className={tdStyle}>
			  <button
			  onClick={() => handleOpenPdf(emp.id, 'aadhaar')}
			  className="text-blue-600 underline hover:text-blue-800"
			  >
			  Aadhaar
			  </button>
			  </td>
			  <td className={tdStyle}>
			  <button
			  onClick={() => handleOpenPdf(emp.id, 'pan')}
			  className="text-blue-600 underline hover:text-blue-800"
			  >
			  PAN
			  </button>
			  </td>
			  <td className={tdStyle}>
			  <button
			  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded mr-2"
			  onClick={() => handleAction(emp.id, 'approve')}
			  >
			  Approve
			  </button>
			  <button
			  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
			  onClick={() => handleAction(emp.id, 'reject')}
			  >
			  Reject
			  </button>
			  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* 🏦 Bank Details */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Employee Bank Details</h2>
          {bankDetails.length === 0 ? (
            <p>No bank details submitted yet.</p>
          ) : (
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>Employee ID</th>
                  <th className={thStyle}>Bank Name</th>
                  <th className={thStyle}>IFSC</th>
                  <th className={thStyle}>Account #</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map(b => (
                  <tr key={b.id}>
                    <td className={tdStyle}>{b.employeeId}</td>
                    <td className={tdStyle}>{b.bankName}</td>
                    <td className={tdStyle}>{b.ifsc}</td>
                    <td className={tdStyle}>{b.accountNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* 🗓️ Leave Applications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Employee Leave Applications</h2>
          {leaveApps.length === 0 ? (
            <p>No leave applications submitted yet.</p>
          ) : (
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>Employee ID</th>
                  <th className={thStyle}>From</th>
                  <th className={thStyle}>To</th>
                  <th className={thStyle}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {leaveApps.map(l => (
                  <tr key={l.id}>
                    <td className={tdStyle}>{l.employeeId}</td>
                    <td className={tdStyle}>{l.fromDate}</td>
                    <td className={tdStyle}>{l.toDate}</td>
                    <td className={tdStyle}>{l.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
