import Link from 'next/link';
import React, { useState } from 'react';
import { projectType } from 'types/index';
import { ProjectsList } from './ProjectsList';
import { ProjectsListHeader } from './ProjectsListHeader';

export const ProjectsColumn = ({
  projects,
  setprojects,
}: {
  projects: projectType[];
  setprojects: (projects: projectType[]) => void;
}) => {
  return (
    <div className="lg:min-w-0 lg:flex-1 bg-white">
      <ProjectsListHeader projects={projects} setprojects={setprojects} />
      {projects.length > 0 ? (
        <ProjectsList projects={projects} setprojects={setprojects} />
      ) : (
        <div className="text-center my-6 text-sm lg:text-base">
          You don't have any project yet!{' '}
          <Link href="/project-creation">
            <a className="text-indigo-600 font-bold hover:text-indigo-400">Start by creating one</a>
          </Link>
          .
        </div>
      )}
    </div>
  );
};
