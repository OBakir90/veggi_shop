import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="footer-links">
        <a href="#">About</a>
      </p>
      <p>
        &copy; {new Date().getFullYear()} <strong>Veggie</strong> - Organic
        Green Store
      </p>
    </footer>
  );
};

export default Footer;
