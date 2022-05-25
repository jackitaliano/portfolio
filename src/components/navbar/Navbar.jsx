import React from "react";
import { FaBars } from "react-icons/fa";

import Profile from "../../assets/profile.jpg";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="pt-3 w-0">
      <a
        className="close-navbar-toggler collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        style={{ color: "transparent" }}
      >
        close nav
      </a>

      <nav className="navbar navbar-expand-md bg-c-dark round-floating-nav">
        <div className="container-fluid d-flex">
          <img src={Profile} className="nav-profile-img d-md-none" alt="" />
          <button
            className="navbar-toggler align-items-center ms-auto ms-sm-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon">
              <FaBars />
            </span>
          </button>

          <div className="collapse navbar-collapse collapse-md" id="navbarNav">
            <ul className="navbar-nav d-flex flex-column flex-md-row justify-content-around w-100 pb-3 pb-md-0">
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About Me
                </a>
              </li>
              <li className="nav-item">
                <a href="#projects" className="nav-link">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a href="#experience" className="nav-link">
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
