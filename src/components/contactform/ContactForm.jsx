import React from "react";
import "./contactform.css";

const ContactForm = () => {
  return (
    <div>
      <div className="form-group">
        <div className="input-group-c sub-heading">
          <label for="contactFormControlName">Name</label>
          <input
            type="name"
            className="form-control"
            id="contactFormControlName"
            placeholder="Enter name..."
          />
        </div>
        <div className="input-group-c sub-heading">
          <label for="contactFormControlEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="contactFormControlEmail"
            placeholder="example@domain.com"
          />
        </div>
        <div className="input-group-c sub-heading">
          <label for="contactFormControlPhone">Phone Number</label>
          <input
            type="phone"
            className="form-control"
            id="contactFormControlPhone"
            placeholder="Enter phone number..."
          />
        </div>
        <div className="input-group-c sub-heading">
          <label for="contactFormControlMessage">Message</label>
          <input
            type="email"
            className="form-control"
            id="contactFormControlMessage"
            placeholder="name@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
