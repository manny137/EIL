//export default function HrLogin() {
 // return <h2>👩‍💼 HR Login Page</h2>;
//}
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../assets/Login_Register_Logo.png';

export default function HRLogin() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#f8f9fa]">
      <div />
      <div className="flex flex-col items-center">
        <img src={logo} alt="EIL Logo" className="h-20 object-contain" />
        <div className="w-[400px] mx-auto bg-white rounded-lg border border-gray-200 p-0 mt-4 shadow-lg">
          <h1 className="text-2xl font-semibold text-center pt-2 pb-2 text-black border-b border-gray-300">Sign in</h1>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-0 space-y-6">
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="hr-username" className="block mb-1 font-semibold text-gray-800">Username*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FaUser />
                  </span>
                  <input id="hr-username" type="text" className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-colors duration-200 hover:border-blue-400" placeholder="Username" />
                </div>
              </div>
              <div>
                <label htmlFor="hr-password" className="block mb-1 font-semibold text-gray-800">Password*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FaLock />
                  </span>
                  <input id="hr-password" type="password" className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-colors duration-200 hover:border-blue-400" placeholder="Password" />
                </div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <input id="remember-me" type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2 custom-checkbox" />
              <label htmlFor="remember-me" className="text-base font-semibold select-none text-gray-800">Remember Me</label>
            </div>
            <button type="submit" className="w-full bg-[#007bff] hover:bg-[#0056b3] text-white py-2 rounded text-lg font-semibold transition-colors duration-200 mt-2">Sign In</button>
          </form>
          <div className="flex justify-between px-8 pb-4 pt-4 text-sm">
            <a href="#" className="text-[#007bff] hover:underline hover:text-[#0056b3] transition-colors duration-200">Forgot Password?</a>
            <a href="#" className="text-[#007bff] hover:underline hover:text-[#0056b3] transition-colors duration-200">Forgot Username?</a>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}