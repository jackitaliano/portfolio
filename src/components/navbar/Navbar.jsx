import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Profile from "../../assets/profile.jpg";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      <a
        className="close-navbar-toggler collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      />

      <nav className="navbar navbar-expand-md bg-c-dark">
        <div className="container-fluid">
          <img src={Profile} className="nav-profile-img" alt="" />
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
                <Link className="nav-link px-sm-5" to="/resume">
                  Resume
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link px-sm-5" to="/contact">
                  Contact Me
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
