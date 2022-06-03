import React from "react";
import { FaChevronUp } from "react-icons/fa";
import "./collapse.css";

const Collapse = ({ id, text }) => {
  return (
    <div className="collapse-chevron">
      <div className="collapse" id={id}>
        <a
          className="clickable text-decoration-none"
          data-bs-toggle="collapse"
          href={"#" + id}
        >
          <p className="sub-text">{text}</p>
        </a>
      </div>
      <a data-bs-toggle="collapse" className="collapsed" href={"#" + id}>
        <span aria-hidden="true">
          <FaChevronUp className="chevron" />
        </span>
      </a>
    </div>
  );
};

export default Collapse;
