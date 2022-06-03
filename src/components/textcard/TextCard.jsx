import React from "react";
import "./textcard.css";

const TextCard = ({ text }) => {
  return (
    <div className="card text-card me-2 mt-2 p-1">
      <div className="card-body p-1 text-center align-middle">
        <div className="card-title sub-text text m-auto">{text}</div>
      </div>
    </div>
  );
};

export default TextCard;
