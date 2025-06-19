import React, { useState, useRef } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaAddressCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/Login_Register_Logo.png';

export default function EmployeeRegister() {
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const aadharInputRef = useRef(null);
  const panInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const personalEmail = document.getElementById('email').value.trim();

    if (!firstName || !lastName || !personalEmail || !aadharFile || !panFile) {
      alert('Please fill in all fields and upload both documents.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/employee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, personalEmail }),
      });

      const data = await res.json();
      if (!data.success || !data.employeeId) throw new Error('Employee registration failed');

      const employeeId = data.employeeId;

      const formData = new FormData();
      formData.append('employeeId', employeeId);
      formData.append('aadhaar', aadharFile);
      formData.append('pan', panFile);

      const fileUploadRes = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!fileUploadRes.ok) throw new Error('File upload failed');

      alert('Registration successful. Pending HR verification. Login details will be emailed upon approval.');
    } catch (err) {
      console.error('Error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-md">
        <img src={logo} alt="EIL Logo" className="h-20 object-contain mb-4" />
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-lg">
          <h1 className="text-2xl font-bold text-center pt-4 pb-3 text-black border-b border-gray-300">
            Register / Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-4 space-y-5">
            <div>
              <label htmlFor="first-name" className="block mb-1 font-semibold text-gray-800">First Name*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaUser /></span>
                <input id="first-name" type="text" required placeholder="First Name"
                  className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" />
              </div>
            </div>

            <div>
              <label htmlFor="last-name" className="block mb-1 font-semibold text-gray-800">Last Name*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaUser /></span>
                <input id="last-name" type="text" required placeholder="Last Name"
                  className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-semibold text-gray-800">Personal Email*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaEnvelope /></span>
                <input id="email" type="email" required placeholder="example@gmail.com"
                  className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">Upload Aadhaar Card</label>
              <div className="relative flex items-center">
                <input
                  ref={aadharInputRef}
                  id="register-aadhar-upload"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setAadharFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex-1 border border-gray-300 px-4 py-2 rounded bg-white text-gray-600 h-12 flex items-center overflow-hidden">
                  {aadharFile ? aadharFile.name : 'No file selected'}
                </div>
                <button type="button" onClick={() => aadharInputRef.current?.click()}
                  className="ml-2 p-2 rounded hover:bg-blue-100 h-12 flex items-center">
                  <FaIdCard className="text-gray-500 hover:text-blue-700 text-xl" />
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
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setPanFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex-1 border border-gray-300 px-4 py-2 rounded bg-white text-gray-600 h-12 flex items-center overflow-hidden">
                  {panFile ? panFile.name : 'No file selected'}
                </div>
                <button type="button" onClick={() => panInputRef.current?.click()}
                  className="ml-2 p-2 rounded hover:bg-blue-100 h-12 flex items-center">
                  <FaAddressCard className="text-gray-500 hover:text-blue-700 text-xl" />
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full bg-[#007bff] hover:bg-[#0056b3] text-white py-2 rounded text-lg font-semibold mt-2 transition-colors duration-200">
              Register
            </button>
          </form>

          <div className="w-full text-center mt-2 pb-5">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login/employee" className="text-[#007bff] hover:underline font-semibold transition-colors duration-200">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
