import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login/employee');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/employee/profile', {
          headers: { Authorization: `Bearer ${token}` }
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
    navigate('/login/employee'); // ✅ Correct route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded shadow border space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Employee Dashboard</h2>
          {user && (
            <p className="mt-1 text-gray-600">
              Welcome, <span className="font-semibold">{user.firstName} {user.lastName}</span>
            </p>
          )}
        </div>

        <ul className="space-y-4 text-lg text-gray-700">
          <li>
            <Link to="/employee/bank" className="text-blue-700 hover:underline">
              ➤ Submit Bank Details
            </Link>
          </li>
          <li>
            <Link to="/employee/leave" className="text-blue-700 hover:underline">
              ➤ Apply for Leave
            </Link>
          </li>
          <li>
            <Link to="/employee/profile" className="text-blue-700 hover:underline">
              ➤ My Profile
            </Link>
          </li>
          <li>
            <Link to="/employee/leaves/view" className="text-blue-700 hover:underline">
              ➤ My Leave Applications
            </Link>
          </li>
        </ul>

        <div className="pt-4 border-t text-center">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-medium"
          >
            🔒 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
