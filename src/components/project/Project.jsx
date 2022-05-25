import React from "react";

const Project = ({ project }) => {
  return (
    <div>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4 col-12">
            <img
              src={project.image}
              class="img-fluid rounded-top-left border"
              alt="project"
            />
          </div>
          <div class="col-md-8 col-12">
            <div class="card-body">
              <h5 class="card-title">{project.title}</h5>
              <p class="card-text">{project.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
