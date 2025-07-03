import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSyncAlt, FaShieldAlt } from 'react-icons/fa';
import logo from '../assets/Login_Register_Logo.png';

export default function HRLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [captchaInput, setCaptchaInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
    setError('');

    if (parseInt(captchaInput) !== captchaAnswer) {
      setError('❌ Incorrect captcha. Please try again.');
      fetchCaptcha();
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login/hr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      // ✅ Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ employeeId, role: 'hr' }));

      navigate('/hr/dashboard');
    } catch (err) {
      console.error(err);
      setError(`❌ ${err.message}`);
      fetchCaptcha();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f9fa]">
      <img src={logo} alt="EIL Logo" className="h-20 object-contain mb-4" />

      <div className="w-[400px] bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-black mb-4">HR Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Employee ID */}
          <div>
            <label htmlFor="hr-username" className="block mb-1 font-semibold text-gray-800">Employee ID*</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaUser /></span>
              <input
                id="hr-username"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Employee ID"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="hr-password" className="block mb-1 font-semibold text-gray-800">Password*</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FaLock /></span>
              <input
                id="hr-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {/* Captcha */}
          <div>
            <label htmlFor="captcha" className="block mb-1 font-semibold text-gray-800">Captcha*</label>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center bg-gray-100 px-2 py-1 rounded border border-gray-300 text-base font-mono font-semibold text-black select-none whitespace-nowrap"
                draggable="false"
              >
                <FaShieldAlt className="mr-1 text-blue-600" />
                {captchaText}
              </div>
              <button
                type="button"
                onClick={fetchCaptcha}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Reload captcha"
              >
                <FaSyncAlt />
              </button>
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
