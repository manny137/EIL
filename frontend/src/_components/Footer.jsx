import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Social Icons */}
        <div className="footer-column social">
          <h4>Follow Us</h4>
          <div className="icons">
            <span><FaFacebookF /></span>
            <span><FaXTwitter /></span>
            <span><FaLinkedinIn /></span>
            <span><FaInstagram /></span>
          </div>
        </div>

        {/* Column 1 */}
        <div className="footer-column">
          <p>▶ Lakshya Bharat Portal</p>
          <p>▶ Technical Brochures</p>
          <p>▶ HSSC</p>
          <p>▶ Registration of EIL with TReDS Agencies</p>
          <p>▶ Login to SMART ODR Portal</p>
          <p>▶ Link for Client/Contractor/Supplier/Other External Agencies</p>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <p>▶ Invoice Portal for Vendors/Contractors</p>
          <p>▶ PIDPI</p>
          <p>▶ Hyperlinking Policy</p>
          <p>▶ RTI</p>
          <p>▶ Entrustment of EIL PF Trust to EPFO</p>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <p>▶ List of GSTIN of EIL</p>
          <p>▶ Online Complaint Management System</p>
          <p>▶ Composition of IC in terms of POSH Act</p>
          <p>▶ Contact Us</p>
          <p>▶ Sitemap</p>
        </div>
      </div>

      <div className="footer-middle">
        <span>Help</span>
        <span>|</span>
        <span>Citizen's Charter</span>
        <span>|</span>
        <span>Terms & Conditions</span>
        <span>|</span>
        <span>Copyright Policy</span>
        <span>|</span>
        <span>Disclaimer</span>
        <span>|</span>
        <span>Privacy Policy</span>
      </div>

      <div className="footer-bottom">
        <p>©1965-2025 Engineers India Limited. All rights reserved. | Designed and developed by PECS.</p>
      </div>

      <div className="footer-news">
      <div className="news-title">What's New</div>
      <div className="news-marquee">
      <div className="news-content">
      Filling-up of post of C&MD, Engineers India Limited. | Invite - Q4FY25 Earnings Call. | Annual Fi...
    </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;
