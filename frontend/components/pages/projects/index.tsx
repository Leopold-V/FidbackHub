import React, { useState } from "react";
import { projectType, userType } from "types/index";
import { Activityfeed } from "./Activityfeed";
import { ProfileColumn } from "./ProfileColumn";
import { ProjectsColumn } from "./ProjectsColumn";

const ProjectsPageComponent = ({ userData, userProjects }: { userData: userType, userProjects: projectType[] }) => {
  const [projects, setprojects] = useState(userProjects);

  const profile = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    avatar_url: userData.avatar_url
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        <div className="min-w-0 flex-1 bg-white xl:flex">
          <ProfileColumn profile={profile} projectsNumber={projects.length} />
          <ProjectsColumn projects={projects} setprojects={setprojects} />
        </div>
        <Activityfeed />
      </div>
    </>
  );
};

export default ProjectsPageComponent;
