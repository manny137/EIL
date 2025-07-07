import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    personalEmail: '',
    phone: '',
    dob: '',
    address: '',
    gender: '',
    dept: '',
    adhaarNo: '',
    panNo: '',
    orgEmail: '',
  });

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/employee/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      setProfile(data);
    } else {
      alert('❌ Failed to fetch profile.');
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const updatedProfile = { ...profile };
    delete updatedProfile.orgEmail;

    const res = await fetch('http://localhost:3000/employee/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedProfile)
    });

    if (res.ok) {
      alert('✅ Profile updated successfully!');
    } else {
      alert('❌ Failed to update profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border text-black">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Profile</h2>

        {/* Official Email */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Official Email (EIL)</label>
          <input
            type="email"
            value={profile.orgEmail}
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-700"
          />
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'First Name', key: 'firstName' },
            { label: 'Last Name', key: 'lastName' },
            { label: 'Personal Email', key: 'personalEmail', type: 'email' },
            { label: 'Phone Number', key: 'phone' },
            { label: 'Date of Birth', key: 'dob', type: 'date' },
            { label: 'Address', key: 'address' },
            { label: 'Gender', key: 'gender' },
            { label: 'Department', key: 'dept' },
            { label: 'Aadhaar Number', key: 'adhaarNo' },
            { label: 'PAN Number', key: 'panNo' }
          ].map(({ label, key, type = 'text' }) => (
            <div key={key}>
              <label className="block mb-1 font-medium text-gray-700">{label}</label>
              <input
                type={type}
                value={profile[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required={key === 'firstName' || key === 'lastName'}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
