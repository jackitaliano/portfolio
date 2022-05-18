import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import Profile from "../../assets/profile.jpg";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <a
        className="close-navbar-toggler collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      />

      <nav className="navbar navbar-expand-sm bg-c-light">
        <div className="container-fluid">
          <img src={Profile} className="profile-img" alt="" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon">
              <FaBars />
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link px-sm-5" to="/">
                  About Me
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link px-sm-5" to="/projects">
                  Projects
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link px-sm-5" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link px-sm-5" to="/resume">
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
