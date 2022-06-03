import React from "react";
import { FaGithub } from "react-icons/fa";
import "./links.css";

const GithubLink = ({ link }) => {
  return (
    <div className="ms-auto mt-auto">
      <a href={link} target="blank" rel="noopener noreferrer">
        <FaGithub className="link-icon" />
      </a>
    </div>
  );
};

export default GithubLink;
