import React from "react";
import "./about.css";

import Profile from "../../assets/profile.jpg";

const About = () => {
  return (
    <div className="section bg-c-accent">
      <div className="row">
        <div className="col-md-4">
          <img src={Profile} className="about-profile-img" alt="profile pic" />
        </div>
        <div className="col-md-4">
          <h1>Jack Italiano</h1>
          <h5>Student at The Ohio State University</h5>
          <h5>Front-end Developer</h5>
          <h5>italiano.16@osu.edu</h5>
          <h5>(847) 477-8066</h5>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default About;
