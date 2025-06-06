import React from "react";
import "./Header.css";
import logo from "../assets/eil_Navbar_image.png"; // combined logo image
import { FaSearch, FaAdjust, FaCircle } from "react-icons/fa";

export default function Navbar() {
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

      <div className="navbar-bottom">
        <div className="navbar-logo">
          <img src={logo} alt="EIL Logo Section" />
        </div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">ABOUT EIL</a>
          <a href="#">BUSINESSES</a>
          <a href="#">SERVICES</a>
          <a href="#">PROJECTS</a>
          <a href="#">SUSTAINABILITY</a>
          <a href="#">CAREERS</a>
          <FaSearch className="navbar-search" />
        </div>
      </div>
    </div>
  );
}
