import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login/employee');

      try {
        const res = await fetch('http://localhost:3000/employee/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          navigate('/login/employee');
        }
      } catch (err) {
        console.error(err);
        navigate('/login/employee');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/employee');
  };

  const capitalize = (s) => s?.charAt(0).toUpperCase() + s?.slice(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-md border space-y-8">
        
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gray-800">Employee Dashboard</h2>
          {user && (
            <p className="text-gray-700 text-lg">
              Welcome, <span className="font-semibold">
                {capitalize(user.firstName)} {capitalize(user.lastName)}
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5">
          <Link
            to="/employee/bank"
            className="block w-full p-4 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-lg rounded-lg shadow-sm border border-blue-200 transition"
          >
            ➤ Submit Bank Details
          </Link>
          <Link
            to="/employee/leave"
            className="block w-full p-4 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-lg rounded-lg shadow-sm border border-blue-200 transition"
          >
            ➤ Apply for Leave
          </Link>
          <Link
            to="/employee/profile"
            className="block w-full p-4 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-lg rounded-lg shadow-sm border border-blue-200 transition"
          >
            ➤ My Profile
          </Link>
          <Link
            to="/employee/leaves/view"
            className="block w-full p-4 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-lg rounded-lg shadow-sm border border-blue-200 transition"
          >
            ➤ My Leave Applications
          </Link>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            🔒 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
