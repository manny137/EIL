import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HrDashboard() {
  const [pending, setPending] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [leaveApps, setLeaveApps] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/hr/pending-approvals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPending);

    fetch("http://localhost:3000/hr/bank-details", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setBankDetails);

    fetch("http://localhost:3000/hr/leaves", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setLeaveApps);
  }, [token]);

  const handleOpenPdf = async (empId, type) => {
    const res = await fetch(`http://localhost:3001/file/${empId}/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return alert("Failed to fetch file");
    const blob = await res.blob();
    const fileURL = window.URL.createObjectURL(blob);
    window.open(fileURL);
  };

  const handleAction = async (id, action) => {
    const res = await fetch("http://localhost:3000/hr/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, action }),
    });
    const result = await res.json();
    alert(result.message);
    setPending((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/hr");
  };

  const tableStyle = "w-full border text-sm text-black text-center";
  const thStyle = "p-3 border bg-gray-100 font-semibold";
  const tdStyle = "p-3 border";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-16 border">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-800">HR Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-medium"
          >
            🔒 Logout
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Pending Employee Approvals
          </h2>
          {pending.length === 0 ? (
            <p className="text-gray-500">No pending approvals.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className={tableStyle}>
                <thead>
                  <tr>
                    <th className={thStyle}>ID</th>
                    <th className={thStyle}>Name</th>
                    <th className={thStyle}>Email</th>
                    <th className={thStyle}>Aadhaar</th>
                    <th className={thStyle}>PAN</th>
                    <th className={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((emp) => (
                    <tr key={emp.id}>
                      <td className={tdStyle}>{emp.id}</td>
                      <td className={tdStyle}>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className={tdStyle}>{emp.personalEmail}</td>
                      <td className={tdStyle}>
                        <button
                          onClick={() => handleOpenPdf(emp.id, "aadhaar")}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View
                        </button>
                      </td>
                      <td className={tdStyle}>
                        <button
                          onClick={() => handleOpenPdf(emp.id, "pan")}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View
                        </button>
                      </td>
                      <td className={tdStyle}>
                        <div className="space-x-2">
                          <button
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                            onClick={() => handleAction(emp.id, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                            onClick={() => handleAction(emp.id, "reject")}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Employee Bank Details
          </h2>
          {bankDetails.length === 0 ? (
            <p className="text-gray-500">No bank details submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className={tableStyle}>
                <thead>
                  <tr>
                    <th className={thStyle}>Employee ID</th>
                    <th className={thStyle}>Bank Name</th>
                    <th className={thStyle}>IFSC</th>
                    <th className={thStyle}>Account Number</th>
                  </tr>
                </thead>
                <tbody>
                  {bankDetails.map((b) => (
                    <tr key={b.id}>
                      <td className={tdStyle}>{b.employeeId}</td>
                      <td className={tdStyle}>{b.bankName}</td>
                      <td className={tdStyle}>{b.ifsc}</td>
                      <td className={tdStyle}>{b.accountNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Employee Leave Applications
          </h2>
          {leaveApps.length === 0 ? (
            <p className="text-gray-500">
              No leave applications submitted yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
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
                  {leaveApps.map((l) => (
                    <tr key={l.id}>
                      <td className={tdStyle}>{l.employeeId}</td>
                      <td className={tdStyle}>{l.fromDate}</td>
                      <td className={tdStyle}>{l.toDate}</td>
                      <td className={tdStyle}>{l.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
