import React from "react";

import { FiInstagram, FiGithub } from "react-icons/fi";

const Footer = props => {
  return (
    <div className="footer">
      <a href="https://www.instagram.com/yes_way_jose.jpg/" target="_blank">
        <FiInstagram className="footer_icon" size="24px" color="#fffbf5" />
      </a>
      <a href="https://github.com/artfoliobuild" target="_blank">
        <FiGithub className="footer_icon" size="24px" color="#fffbf5" />
      </a>
    </div>
  );
};

export default Footer;
