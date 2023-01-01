import React from 'react';
import { projectType } from 'types/index';
import { ProjectItem } from './ProjectItem';

export const ProjectsList = ({
  projects,
  setprojects,
}: {
  projects: projectType[];
  setprojects: (projects: projectType[]) => void;
}) => {
  return (
    <ul role="list" className="divide-y divide-3Background border border-3Background rounded">
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} projects={projects} setprojects={setprojects} />
      ))}
    </ul>
  );
};
