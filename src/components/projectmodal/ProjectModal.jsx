import React from "react";
import "./projectmodal.css";

import { TextCard } from "../../components";

const ProjectModal = ({ project }) => {
  const technologies = project.technologies.map((tech) => (
    <TextCard text={tech} />
  ));

  return (
    <div className="project-modal">
      <div
        class="modal fade"
        id={"project" + project.id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {project.title}
              </h5>
              <button
                type="button"
                class="btn-close project-modal-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row">
              <div className="col-12 col-md-4"></div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
