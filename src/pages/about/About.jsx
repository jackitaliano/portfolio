import React from "react";
import "./about.css";

import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from "react-icons/fa";
import Profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="section bg-c-accent">
      <div className="row">
        {/* Profile Image */}
        <div className="col-md-4">
          <img src={Profile} className="about-profile-img" alt="profile pic" />
        </div>

        {/* Information */}
        <div className="col-md-5">
          <h1>Jack Italiano</h1>
          <h5>Student at The Ohio State University</h5>
          <h5>Front-end Developer</h5>
          <h5>italiano.16@osu.edu</h5>
          <h5>(847) 477-8066</h5>
        </div>

        {/* Links */}

        <div className="col-md-3">
          <div className="col ms-auto">
            <div className="row-md-3 ms-auto">
              <a href="https://www.linkedin.com/in/jackitaliano/">
                <FaLinkedin />
              </a>
            </div>
            <div className="row-md-3">
              <FaGithub />
            </div>
            <div className="row-md-3">
              <FaTwitter />
            </div>
            <div className="row-md-3">
              Resume <FaDownload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
