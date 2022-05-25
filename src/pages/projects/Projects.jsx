import React from "react";
import { Project } from "../../components";
import image from "../../assets/profile.jpg";

const Projects = () => {
  const projectsList = [
    {
      title: "project 1",
      text: "description",
      image: image,
      link: "",
      technologies: [],
    },
    {
      title: "project 2",
      text: "description",
      image: image,
      link: "",
      technologies: [],
    },
    {
      title: "project 3",
      text: "description",
      image: image,
      link: "",
      technologies: [],
    },
  ];

  const projects = projectsList.map((project) => <Project project={project} />);
  return (
    <div className="container section" id="projects">
      <h1 className="main-heading">My Projects</h1>
      {projects}
    </div>
  );
};

export default Projects;
