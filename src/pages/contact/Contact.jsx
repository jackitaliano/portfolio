import React from "react";
import "./contact.css";

import { ContactForm, Links } from "../../components";

const Contact = () => {
  return (
    <div className="section bg-c-accent row" id="contact">
      <div className="col-12 col-md-5">
        <div className="d-flex flex-column">
          <h1 className="main-heading mb-4">Jack Italiano</h1>
          <div className="sub-heading mt-auto">
            <h5>The Ohio State University CSE</h5>
            <h5>Front-end Developer</h5>
            <h5>italiano.16@osu.edu</h5>
            <h5>(847) 477-8066</h5>
            <Links />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-7 pe-0">
        <div class="card">
          <div class="card-body">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
