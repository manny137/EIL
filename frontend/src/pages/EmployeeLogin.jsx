import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaSyncAlt, FaShieldAlt } from 'react-icons/fa';
import logo from '../assets/Login_Register_Logo.png';

export default function EmployeeLogin() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const fetchCaptcha = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/captcha');
      const data = await res.json();
      setCaptchaText(data.captchaText);
      setCaptchaAnswer(data.captchaAnswer);
      setCaptchaInput('');
    } catch (err) {
      setCaptchaText('Error loading captcha');
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captchaAnswer) {
      setError('Incorrect captcha. Try again.');
      fetchCaptcha();
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: empId, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      alert('Login successful!');
    } catch (err) {
      setError(err.message);
      fetchCaptcha();
    }
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
              {/* Employee ID */}
              <div>
                <label htmlFor="employee-id" className="block mb-1 font-semibold text-gray-800">Employee ID*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaUser /></span>
                  <input
                    id="employee-id"
                    type="text"
                    required
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black hover:border-blue-400"
                    placeholder="Enter your Employee ID"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="employee-password" className="block mb-1 font-semibold text-gray-800">Password*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaLock /></span>
                  <input
                    id="employee-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black hover:border-blue-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Captcha */}
              <div>
                <label htmlFor="captcha" className="block mb-1 font-semibold text-gray-800">Captcha*</label>
                <div className="flex items-center gap-2">
                  {/* Captcha Display */}
                  <div
                    className="flex items-center bg-gray-100 px-2 py-1 rounded border border-gray-300 text-base font-mono font-semibold text-black select-none whitespace-nowrap"
                    draggable="false"
                  >
                    <FaShieldAlt className="mr-1 text-blue-600" />
                    {captchaText} =
                  </div>

                  {/* Reload Button */}
                  <button
                    type="button"
                    onClick={fetchCaptcha}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Reload captcha"
                  >
                    <FaSyncAlt />
                  </button>

                  {/* Captcha Answer Input */}
                  <input
                    id="captcha"
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 border border-gray-300 py-1.5 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    placeholder="Answer"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            {/* Remember Me */}
            <div className="flex items-center mb-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-base font-semibold text-gray-800">Remember Me</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#007bff] hover:bg-[#0056b3] text-white py-2 rounded text-lg font-semibold transition-colors duration-200 mt-2">Sign In</button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-between px-8 pb-4 pt-4 text-sm">
            <a href="#" className="text-[#007bff] hover:underline hover:text-[#0056b3]">Forgot Password?</a>
            <a href="#" className="text-[#007bff] hover:underline hover:text-[#0056b3]">Forgot ID?</a>
          </div>

          {/* Register */}
          <div className="w-full text-center mt-2 pb-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register/employee" className="text-[#007bff] hover:underline hover:text-[#0056b3] font-semibold">Register here</Link>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
