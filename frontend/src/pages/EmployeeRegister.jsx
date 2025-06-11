import { useState } from "react";

export default function EmployeeRegister() {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    pan: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/employees/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="register-page">
      <h2>Register New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} />
        <input name="pan" placeholder="PAN" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
