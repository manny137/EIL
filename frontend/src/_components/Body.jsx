import React from 'react';
import '../styles/Body.css';

// Import images
import sec1 from '../assets/images/sec1.png';
import sec2 from '../assets/images/sec2.png';
import sec3 from '../assets/images/sec3.png';
import refinery from '../assets/refinery.svg';
import globalMap from '../assets/map.gif';

// Import statistics assets
import statsBackground from '../assets/images/counter-bg.jpg';
import globeIcon from '../assets/images/icon.png';
import gearIcon from '../assets/images/icon2.png';
import peopleIcon from '../assets/images/icon3.png';
import documentIcon from '../assets/images/icon4.png';
import employee from '../assets/images/employees.png';

const Body = () => {
  return (
    <main>
      {/* Video Section */}
      <section className="video-section">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src="/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </section>

      {/* Three Boxes Section */}
      <section className="three-boxes-section">
        <div className="card-wrapper">
          <div className="box">
            <img src={sec1} alt="Secure Process" />
          </div>
          <h3>Businesses</h3>
          <a href="#projects">View Projects</a>
        </div>
        <div className="card-wrapper">
          <div className="box">
            <img src={sec2} alt="Efficient Workflow" />
          </div>
          <h3>Projects</h3>
          <a href="#services">Explore Services</a>
        </div>
        <div className="card-wrapper">
          <div className="box">
            <img src={sec3} alt="Smart Dashboard" />
          </div>
          <h3>Services</h3>
          <a href="#dashboard">Go to Dashboard</a>
        </div>
      </section>

      {/* SVG Image Below Boxes */}
      <section className="svg-section">
        <img src={refinery} alt="Decorative Background" className="svg-image" />
      </section>

      {/* Global Presence Section */}
      <section className="global-presence-section">
        <div className="global-container">
          <div className="content-section">
            <h1 className="main-title">
              Expanding<br />
              <span className="global-text">Global</span>Presence
            </h1>
            
            <div className="info-list">
              <div className="info-item">Significant footprints in MENA Region</div>
              <div className="info-item">Engineering Hub in Abu Dhabi</div>
              <div className="info-item">Fortune 500 Clients</div>
            </div>
            
            <button className="learn-more-btn">Learn More</button>
          </div>
          
          <div className="map-section">
            <img src={globalMap} alt="Global Presence Map" className="world-map-image" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
  className="stats-section"
  style={{ backgroundImage: `url(${statsBackground})` }}
>
  <div className="stats-container">
    <div className="stat-item">
      <div className="stat-icon">
        <img src={globeIcon} alt="Globe Icon" width="60" height="60" />
      </div>
      <div className="stat-number">27</div>
      <div className="stat-label">Overseas Locations</div>
    </div>

    <div className="stat-item">
      <div className="stat-icon">
        <img src={gearIcon} alt="Gear Icon" width="60" height="60" />
      </div>
      <div className="stat-number">60</div>
      <div className="stat-label">Years in Operation</div>
    </div>

    <div className="stat-item">
      <div className="stat-icon">
        <img src={peopleIcon} alt="People Icon" width="60" height="60" />
      </div>
      <div className="stat-number">2800</div>
      <div className="stat-label">Employees</div>
    </div>

    <div className="stat-item no-border">
      <div className="stat-icon">
        <img src={documentIcon} alt="Document Icon" width="60" height="60" />
      </div>
      <div className="stat-number">7000+</div>
      <div className="stat-label">Assignments</div>
    </div>
  </div>
</section>

<section className="news-section">
  <div className="news-container">
    <div className="news-left">
      <h2 className="news-title">In The News</h2>

      <div className="news-list">
        <div className="news-card">
          <div className="news-date">
            <span className="day">31</span>
            <span className="month">Mar</span>
            <span className="year">2025</span>
          </div>
          <div className="news-text">
            <h3>EIL secures Consultancy Projects in Maharashtra & West Bengal</h3>
          </div>
        </div>

        <div className="news-card">
          <div className="news-date">
            <span className="day">17</span>
            <span className="month">Mar</span>
            <span className="year">2025</span>
          </div>
          <div className="news-text">
            <h3>EIL celebrates 61st Foundation Day</h3>
          </div>
        </div>

        <div className="news-card">
          <div className="news-date">
            <span className="day">08</span>
            <span className="month">Mar</span>
            <span className="year">2025</span>
          </div>
          <div className="news-text">
            <h3>EIL celebrates International Women's Day</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="news-right">
      <img src={employee} alt="News Visual" />
    </div>
  </div>
</section>

    </main>
  );
};

export default Body;