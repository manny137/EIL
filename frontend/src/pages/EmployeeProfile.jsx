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
    delete updatedProfile.orgEmail; // prevent updating non-editable fields

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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow border space-y-4 text-black">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

        {/* Display Email (non-editable) */}
        <div>
          <label className="block mb-1 font-medium">Official Email (EIL)</label>
          <input
            type="email"
            value={profile.orgEmail}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-700"
          />
        </div>

        {/* Editable fields */}
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
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              value={profile[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full border p-2 rounded"
              required={key === 'firstName' || key === 'lastName'}
            />
          </div>
        ))}

        <button
          onClick={handleUpdate}
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
