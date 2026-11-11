import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <span>Author: </span>
      <a
        href="https://github.com/MarioGranada/jobsityCalendar"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mario Granada
      </a>
    </div>
  );
};

export default Footer;
