import React, { useEffect, useState } from "react";
import { userType } from "types/index";
import { StatsFeed } from "./StatsFeed";
import { ProfileColumn } from "./ProfileColumn";
import { ProjectsColumn } from "./ProjectsColumn";

const ProjectsPageComponent = ({ userData, userProjects }: { userData: userType, userProjects: any[] }) => {
  const profile = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    avatar_url: userData.avatar_url
  };
  
  const [projects, setprojects] = useState(userProjects);
  const [allratings, setallratings] = useState([]);
  const [maxRatedProject, setmaxRatedProject] = useState({ name: '', number: 0});
  const [avgValues, setavgValues] = useState([]);

  useEffect(() => {
    let _allratings = [];
    let maxRatedProject = { name: '', number: 0};
    let listAvgValues = [];
    userProjects.forEach((project) => {
      if (project.ratings.data.length > maxRatedProject.number) {
        maxRatedProject.number = project.ratings.data.length;
        maxRatedProject.name = project.name;
      }
      _allratings = _allratings.concat(project.ratings.data);
      let projectAvg = 0;
      let projectAvgSpeed = 0;
      let projectAvgDesign = 0;
      let projectAvgResponsive = 0;
      project.ratings.data.forEach((rating, i) => {
        projectAvg += rating.attributes.average;
        projectAvgSpeed += rating.attributes.speed;
        projectAvgDesign += rating.attributes.design;
        projectAvgResponsive += rating.attributes.responsive;
      });
      listAvgValues.push({
        name: project.name,
        avg: projectAvg / project.ratings.data.length,
        speed: projectAvgSpeed / project.ratings.data.length,
        design: projectAvgDesign / project.ratings.data.length,
        responsive: projectAvgResponsive / project.ratings.data.length
      });
    });
    setavgValues(listAvgValues);
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
        {avgValues.length > 0 && <StatsFeed ratingsNumber={allratings.length} maxRatedProject={maxRatedProject} avgValues={avgValues} />}
      </div>
    </>
  );
};

export default ProjectsPageComponent;
