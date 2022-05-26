import React from "react";
import { Links } from "../../components";

import "./header.css";

import Profile from "../../assets/profile.jpg";

const Header = () => {
  return (
    <div className="">
      <div className="bg-image">
        <div className="bg-tint">
          <div className="header-fixed-nav header-container d-flex flex-row">
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
              <div className="d-flex flex-column">
                <h1 className="main-heading mb-4">Jack Italiano</h1>
                <div className="sub-heading mt-auto">
                  <h5>The Ohio State University CSE</h5>
                  <h5>Front-end Developer</h5>
                  <h5>italiano.16@osu.edu</h5>
                  <h5>(847) 477-8066</h5>
                </div>
              </div>
            </div>

            {/* Links */}
            <Links />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
