import React, { useState, useRef } from 'react';
import { FaUser, FaLock, FaIdCard, FaAddressCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/Login_Register_Logo.png';

export default function EmployeeRegister() {
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const aadharInputRef = useRef(null);
  const panInputRef = useRef(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  try {
    // 1. Register employee (port 3000)
    const res = await fetch('http://localhost:3000/employee/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!data.success) throw new Error('User registration failed');

    const employeeId = data.employeeId;

    // 2. Upload Aadhaar and PAN files to file server (port 3001)
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('aadhaar', aadharFile); 
    formData.append('pan', panFile);       

    const fileRes = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!fileRes.ok) throw new Error('File upload failed');

    alert('Registration and file upload successful!');
  } catch (err) {
    console.error('Error during registration:', err);
    alert('Registration failed. See console for details.');
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#f8f9fa]">
      <div />
      <div className="flex flex-col items-center">
        <img src={logo} alt="EIL Logo" className="h-20 object-contain" />
        <div className="w-[400px] mx-auto bg-white rounded-lg border border-gray-200 p-0 mt-4 shadow-lg">
          <h1 className="text-2xl font-bold text-center pt-2 pb-2 text-black border-b border-gray-300">Register / Sign Up</h1>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-0 space-y-6">
            <div>
              <label htmlFor="register-username" className="block mb-1 font-semibold text-gray-800">Username*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaUser /></span>
                <input id="register-username" type="text" required className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-colors duration-200 hover:border-blue-400" placeholder="Username" />
              </div>
            </div>
            <div>
              <label htmlFor="register-password" className="block mb-1 font-semibold text-gray-800">Password*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaLock /></span>
                <input id="register-password" type="password" required className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-colors duration-200 hover:border-blue-400" placeholder="Password" />
              </div>
            </div>
            <div>
              <label htmlFor="register-verify-password" className="block mb-1 font-semibold text-gray-800">Verify Password*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaLock /></span>
                <input id="register-verify-password" type="password" required className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-colors duration-200 hover:border-blue-400" placeholder="Verify Password" />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Upload Aadhar Card</label>
              <div className="relative flex items-center">
                <input
                  ref={aadharInputRef}
                  id="register-aadhar-upload"
                  type="file"
                  onChange={(e) => setAadharFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex-1 border border-gray-300 px-10 py-2 rounded bg-white text-gray-600 text-base overflow-x-auto h-12 flex items-center">
                  {aadharFile ? aadharFile.name : 'No file selected'}
                </div>
                <button type="button" onClick={() => aadharInputRef.current && aadharInputRef.current.click()} className="ml-2 p-2 rounded hover:bg-blue-100 transition-colors h-12 flex items-center">
                  <FaIdCard className="text-gray-500 hover:text-blue-700 transition-colors text-xl" />
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Upload PAN Card</label>
              <div className="relative flex items-center">
                <input
                  ref={panInputRef}
                  id="register-pan-upload"
                  type="file"
                  onChange={(e) => setPanFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex-1 border border-gray-300 px-10 py-2 rounded bg-white text-gray-600 text-base overflow-x-auto h-12 flex items-center">
                  {panFile ? panFile.name : 'No file selected'}
                </div>
                <button type="button" onClick={() => panInputRef.current && panInputRef.current.click()} className="ml-2 p-2 rounded hover:bg-blue-100 transition-colors h-12 flex items-center">
                  <FaAddressCard className="text-gray-500 hover:text-blue-700 transition-colors text-xl" />
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#007bff] hover:bg-[#0056b3] text-white py-2 rounded text-lg font-semibold transition-colors duration-200 mt-2">Register</button>
          </form>
          <div className="w-full text-center mt-2 pb-4">
            <span className="text-gray-600">Already have an account?{' '}
            </span>
            <Link to="/login/employee" className="text-[#007bff] hover:underline hover:text-[#0056b3] font-semibold transition-colors duration-200">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
