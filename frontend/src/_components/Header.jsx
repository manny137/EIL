import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/eil_Navbar_image.png";
import { FaSearch, FaAdjust, FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="navbar-links-top">
          <a href="#">PM’s Flagship Programs</a>
          <a href="#">Investors</a>
          <a href="#">Suppliers & Contractors</a>
          <a href="#">Tenders</a>
          <a href="#">Media</a>
          <a href="#">Vigilance</a>
        </div>
        <div className="navbar-icons">
          <FaAdjust />
          <span>-A</span>
          <span>A</span>
          <span>+A</span>
          <FaCircle />
          <FaCircle />
          <span>हिंदी</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="navbar-bottom">
        <div className="navbar-logo">
          <img src={logo} alt="EIL Logo Section" />
        </div>

        <div className="navbar-links">
           <Link to="/">Home</Link>
          <a href="#">ABOUT EIL</a>
          <a href="#">BUSINESSES</a>
          <a href="#">SERVICES</a>
          <a href="#">PROJECTS</a>
          <a href="#">SUSTAINABILITY</a>
          <a href="#">CAREERS</a>

          <div
  className="dropdown-wrapper"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  <span className="dropdown-toggle">LOGIN</span>
  <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
    <Link to="/login/employee" className="dropdown-item">Employee</Link>
    <Link to="/login/hr" className="dropdown-item">HR</Link>
  </div>
</div>
          <FaSearch className="navbar-search" />
        </div>
      </div>
    </div>
  );
}
