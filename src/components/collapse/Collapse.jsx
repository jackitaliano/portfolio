import React from "react";
import { FaChevronUp } from "react-icons/fa";
import "./collapse.css";

const Collapse = ({ id, text }) => {
  return (
    <div class="collapse-chevron">
      <div class="collapse" id={id}>
        <p className="sub-text">{text}</p>
      </div>
      <a data-bs-toggle="collapse" class="collapsed" href={"#" + id}>
        <span aria-hidden="true">
          <FaChevronUp className="chevron" />
        </span>
      </a>
    </div>
  );
};

export default Collapse;
