import React from "react";
import { Links } from "../../components";

import "./header.css";

import Profile from "../../assets/profile.jpg";
import { Navbar } from "../../components";

const Header = () => {
  return (
    <div className="bg-image">
      <div className="bg-tint">
        <Navbar />
        <div className="header-container d-flex flex-column flex-sm-row">
          <div className="me-auto d-flex flex-column flex-md-row">
            {/* Profile Image */}
            <div className="d-none d-md-block me-4 mb-4 mb-md-0">
              <img
                src={Profile}
                className="about-profile-img"
                alt="profile pic"
              />
            </div>

            {/* Information */}
            <div className="sub-heading mb-4 mb-md-0">
              <h1 className="main-heading mb-md-5">Jack Italiano</h1>
              <h5 className="sub-heading">CSE at The Ohio State University</h5>
              <h5>Front-end Developer</h5>
              <h5>italiano.16@osu.edu</h5>
              <h5>(847) 477-8066</h5>
            </div>
          </div>

          {/* Links */}
          <Links />
        </div>
      </div>
    </div>
  );
};

export default Header;
