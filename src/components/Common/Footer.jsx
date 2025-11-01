// src/components/Common/Footer.jsx
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SCULPTECH LABS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;