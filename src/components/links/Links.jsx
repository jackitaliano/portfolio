import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import "./links.css";

const Links = () => {
  return (
    <div className="d-flex flex-row mt-md-auto links">
      <div>
        <a
          href="https://www.linkedin.com/in/jackitaliano/"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="link-icon" />
        </a>
      </div>
      <div>
        <a
          href="https://www.github.com/jackitaliano/"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="link-icon" />
        </a>
      </div>
      <div>
        <a
          href="https://www.github.com/jackitaliano/"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="link-icon" />
        </a>
      </div>
    </div>
  );
};

export default Links;
