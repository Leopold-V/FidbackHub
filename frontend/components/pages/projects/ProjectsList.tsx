import { Card } from 'components/common/Card';
import React from 'react';
import { projectType } from 'types/index';
import { ProjectItem } from './ProjectItem';

export const ProjectsList = ({
  projects,
  setprojects,
  grid,
}: {
  projects: projectType[];
  setprojects: (projects: projectType[]) => void;
  grid: boolean;
}) => {
  if (grid) {
    return (
      <ul role="list" className="flex sm:flex-row flex-col justify-center items-center">
        {projects.map((project) => (
          <div className="m-2 border border-3Background rounded">
            <ProjectItem project={project} projects={projects} setprojects={setprojects} />
          </div>
        ))}
      </ul>
    );
  }
  return (
    <ul role="list" className="divide-y divide-3Background border border-3Background rounded">
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} projects={projects} setprojects={setprojects} />
      ))}
    </ul>
  );
};
