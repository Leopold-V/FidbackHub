import React from "react";
import { Activityfeed } from "./Activityfeed";
import { ProfileColumn } from "./ProfileColumn";
import { ProjectsColumn } from "./ProjectsColumn";

const ProjectsPageComponent = () => {
  return (
    <>
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        {/* Left sidebar & main wrapper */}
        <div className="min-w-0 flex-1 bg-white xl:flex">
          <ProfileColumn />
          <ProjectsColumn />
        </div>
        <Activityfeed />
      </div>
    </>
  );
};

export default ProjectsPageComponent;
