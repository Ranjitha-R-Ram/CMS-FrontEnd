import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <i class="bi bi-buildings-fill">
        <Link to="/" className="nav-logo">
          CMS
        </Link>
      </i>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" onClick={closeMenu}>
            Cutomer Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/registration" className="nav-link" onClick={closeMenu}>
            Admin Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/booking" className="nav-link" onClick={closeMenu}>
            Booking
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/grid" className="nav-link" onClick={closeMenu}>
            Project Details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
