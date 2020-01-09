import React from 'react';
import JobsityBrand from '../../assets/images/brand-jobsity.svg';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <a href="/" className="header-brand">
        <img src={JobsityBrand} alt="Jobsity-calendar-header-logo" />
      </a>
    </div>
  );
};

export default Header;
