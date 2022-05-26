import React from "react";
import "./textcard.css";

const TextCard = ({ text }) => {
  return (
    <div className="card text-card me-2">
      <div className="card-body">
        <div className="card-title sub-text">{text}</div>
      </div>
    </div>
  );
};

export default TextCard;
