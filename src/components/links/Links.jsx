import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import "./links.css";

const Links = () => {
  return (
    <div>
      {" "}
      <div className="d-flex flex-row">
        <div className="link-icon">
          <a
            href="https://www.linkedin.com/in/jackitaliano/"
            target="blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size="40px" />
          </a>
        </div>
        <div className="link-icon">
          <a
            href="https://www.github.com/jackitaliano/"
            target="blank"
            rel="noopener noreferrer"
          >
            <FaGithub size="40px" />
          </a>
        </div>
        <div className="link-icon">
          <a
            href="https://www.github.com/jackitaliano/"
            target="blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size="40px" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Links;
