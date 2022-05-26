import React from "react";
import "./projectcard.css";
import { TextCard, ProjectModal } from "../../components";

const ProjectCard = ({ project }) => {
  const technologies = project.technologies.map((tech) => (
    <TextCard text={tech} />
  ));

  return (
    <div
      class="card mb-3 shadow clickable p-0"
      data-bs-toggle="modal"
      data-bs-target={"#project" + project.id}
    >
      <div class="row g-md-0 g-3">
        <div class="col-md-4 col-12">
          <img
            src={project.image}
            class="img-fluid card-img-dynamic"
            alt="project"
          />
        </div>
        <div class="col-md-8 col-12 d-flex">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title main-heading">{project.title}</h5>
            <p class="card-text sub-text">{project.text}</p>

            <div className="mt-auto">
              <hr />
              <div className="d-flex flex-row">{technologies}</div>
            </div>
          </div>
        </div>
      </div>
      <ProjectModal project={project}></ProjectModal>
    </div>
  );
};

export default ProjectCard;
