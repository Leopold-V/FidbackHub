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
  const [projectsFiltered, setprojectsFiltered] = useState(projects);

  return (
    <div className="lg:min-w-0 lg:flex-1">
      <ProjectsListHeader
        projects={projects}
        setprojects={setprojects}
        projectsFiltered={projectsFiltered}
        setprojectsFiltered={setprojectsFiltered}
      />
      {projects.length > 0 ? (
        <ProjectsList projects={projectsFiltered} setprojects={setprojects} />
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
