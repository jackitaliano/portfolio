import React from "react";
import "./projectcard.css";
import { TextCard, ProjectModal } from "../../components";
import GithubLink from "../links/GithubLink";

const ProjectCard = ({ project }) => {
  const technologies = project.technologies.map((tech) => (
    <TextCard text={tech} />
  ));

  return (
    <div
      className="card mb-3 shadow p-0 project-card"
      data-bs-toggle="modal"
      data-bs-target={"#project" + project.id}
    >
      <div className="row g-md-0 g-3">
        <div className="col-md-4 col-12">
          <img
            src={project.image}
            className="img-fluid card-img-dynamic"
            alt="project"
          />
        </div>
        <div className="col-md-8 col-12 d-flex">
          <div className="card-body d-flex flex-column">
            <div className="d-flex flex-row">
              <h5 className="card-title sub-heading">{project.title}</h5>

              <GithubLink link={project.link} />
            </div>
            <hr />
            <p class="card-text sub-text project-description">
              {project.brief}
            </p>

            <hr className="mt-auto" />
            <div className="d-flex flex-row flex-wrap p-2 ps-3">
              {technologies}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal className="d-none" project={project} />
    </div>
  );
};

export default ProjectCard;
