import React from "react";
import { Activityfeed } from "./Activityfeed";
import { ProfileColumn } from "./ProfileColumn";
import { ProjectsColumn } from "./ProjectsColumn";

const ProjectsPageComponent = ({ userData }) => {
  const profile = {
    id: userData.id,
    username: userData.username,
    email: userData.email
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        <div className="min-w-0 flex-1 bg-white xl:flex">
          <ProfileColumn profile={profile} />
          <ProjectsColumn projects={userData.projects} />
        </div>
        <Activityfeed />
      </div>
    </>
  );
};

export default ProjectsPageComponent;
