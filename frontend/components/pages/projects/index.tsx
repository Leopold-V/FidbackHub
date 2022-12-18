import React, { useEffect, useState } from "react";
import { projectType, userType } from "types/index";
import { StatsFeed } from "./StatsFeed";
import { ProfileColumn } from "./ProfileColumn";
import { ProjectsColumn } from "./ProjectsColumn";

const ProjectsPageComponent = ({ userData, userProjects }: { userData: userType, userProjects: projectType[] }) => {
  const profile = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    avatar_url: userData.avatar_url
  };
  
  const [projects, setprojects] = useState(userProjects);
  const [allratings, setallratings] = useState([]);
  const [maxRatedProject, setmaxRatedProject] = useState({ name: '', number: 0});

  useEffect(() => {
    let _allratings = [];
    let maxRatedProject = { name: '', number: 0};
    userProjects.forEach((ele) => {
      console.log(ele.ratings);
      //@ts-ignore
      if (ele.ratings.data.length > maxRatedProject.number) {
        //@ts-ignore
        maxRatedProject.number = ele.ratings.data.length;
        maxRatedProject.name = ele.name;
      }
      //@ts-ignore
      _allratings = _allratings.concat(ele.ratings.data);
    });
    setmaxRatedProject(maxRatedProject);
    setallratings(_allratings);
  }, []);

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        <div className="min-w-0 flex-1 xl:flex">
          <ProfileColumn profile={profile} projectsNumber={projects.length} />
          <ProjectsColumn projects={projects} setprojects={setprojects} />
        </div>
        <StatsFeed ratingsNumber={allratings.length} maxRatedProject={maxRatedProject} />
      </div>
    </>
  );
};

export default ProjectsPageComponent;
