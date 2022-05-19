import React from "react";
import { Links } from "../../components";

import Profile from "../../assets/profile.jpg";
import BackgroundImg from "../../assets/oval-pano.png";

const Header = () => {
  const styles = {
    header: {
      backgroundImage: `url(${BackgroundImg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    content: {
      backgroundColor: "rgba(0,0,0,0.75)",
    },
  };
  return (
    <div style={styles.header}>
      <div
        className="section bg-c-accent d-flex flex-column flex-md-row justify-content-between"
        style={styles.content}
      >
        <div className="d-flex flex-column flex-md-row">
          {/* Profile Image */}
          <div className="d-none d-sm-block me-3 mb-5 mb-md-0">
            <img
              src={Profile}
              className="about-profile-img"
              alt="profile pic"
            />
          </div>

          {/* Information */}
          <div className="mb-5 mb-md-0 text-info">
            <h1 className="mb-md-5">Jack Italiano</h1>
            <h5>Student at The Ohio State University</h5>
            <h5>Front-end Developer</h5>
            <h5>italiano.16@osu.edu</h5>
            <h5>(847) 477-8066</h5>
          </div>
        </div>

        {/* Links */}
        <Links />
      </div>
    </div>
  );
};

export default Header;
