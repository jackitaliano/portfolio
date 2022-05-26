import React from "react";
import { ProjectCard } from "../../components";
import image from "../../assets/profile.jpg";

const Projects = () => {
  const projectsList = [
    {
      id: "1",
      title: "project 1",
      text: "description",
      image: image,
      link: "",
      technologies: ["Bootstrap", "ReactJS", "NodeJS", "AWS"],
    },
    {
      id: "2",
      title: "project 2",
      text: "description",
      image: image,
      link: "",
      technologies: [],
    },
    {
      id: "3",
      title: "project 3",
      text: "description",
      image: image,
      link: "",
      technologies: [],
    },
  ];

  const projects = projectsList.map((project) => (
    <ProjectCard project={project} />
  ));
  return (
    <div className="section" id="projects">
      <h1 className="main-heading">My Projects</h1>
      <div>{projects}</div>
    </div>
  );
};

export default Projects;
