import React from 'react';
import { useSession } from 'next-auth/react';
import { projectType } from 'types/index';
import { ProjectItem } from './ProjectItem';
import { ProjectCardItem } from './ProjectCardItem';

export const ProjectsList = ({
  projects,
  setprojects,
  grid,
}: {
  projects: projectType[];
  setprojects: (projects: projectType[]) => void;
  grid: boolean;
}) => {
  const { data: session } = useSession();
  if (grid) {
    return (
      <ul role="list" className="flex sm:flex-row mx-2 flex-wrap flex-col justify-start items-center">
        {projects.map((project) => (<ProjectCardItem key={project.id} project={project} userId={session.id} />))}
      </ul>
    );
  }
  return (
    <ul role="list" className="divide-y divide-3Background border border-3Background rounded">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} userId={session.id} />
      ))}
    </ul>
  );
};
