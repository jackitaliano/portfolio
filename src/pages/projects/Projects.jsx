import React from "react";
import { ProjectCard } from "../../components";
import image from "../../assets/profile.jpg";

const Projects = () => {
  const projectsList = [
    {
      id: "1",
      title: "project 1",
      brief: "brief summary",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: image,
      link: "https://github.com/jackitaliano/HydroponiKs",
      technologies: [
        "Bootstrap",
        "ReactJS",
        "NodeJS",
        "AWS",
        "test",
        "test2",
        "test3",
        "test3",
      ],
    },
    {
      id: "2",
      title: "project 2",
      brief: "description",
      description: "description",
      image: image,
      link: "",
      technologies: [],
    },
    {
      id: "3",
      title: "project 3",
      brief: "description",
      description: "description",
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
