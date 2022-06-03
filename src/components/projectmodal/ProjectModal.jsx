import React from "react";
import "./projectmodal.css";

import { TextCard, GithubLink } from "../../components";

const ProjectModal = ({ project }) => {
  const technologies = project.technologies.map((tech) => (
    <TextCard text={tech} />
  ));

  return (
    <div className="project-modal">
      <div className="modal fade" id={"project" + project.id} tabindex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <h5 className="modal-title me-3" id="projectModalTitle">
                  {project.title}
                </h5>
                <GithubLink link={project.link} />
              </div>
              <button
                type="button"
                className="btn-close project-modal-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row w-100 g-3 g-lg-0 bg-c-accent m-auto">
              <a
                className="img-fluid col-lg-5 col-12 h-fit"
                href={project.link}
                target="blank"
                rel="noopener noreferrer"
              >
                <img src={project.image} className="img-fluid" alt="project" />
              </a>
              <p className="col-lg-7 col-12 sub-text px-3">
                {project.description}
              </p>
            </div>
            <div className="modal-footer">
              <div className="d-flex flex-wrap">{technologies}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
