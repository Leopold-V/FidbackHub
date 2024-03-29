import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  const [grid, setgrid] = useState(true);

  useEffect(() => {
    setprojectsFiltered(projects);
  }, [projects]);

  return (
    <div className="lg:min-w-0 lg:flex-1">
      <ProjectsListHeader
        projects={projects}
        setprojects={setprojects}
        setprojectsFiltered={setprojectsFiltered}
        grid={grid}
        setgrid={setgrid}
      />
      {projects.length > 0 ? (
        <ProjectsList projects={projectsFiltered} setprojects={setprojects} grid={grid} />
      ) : (
        <div className="text-center my-6 text-sm lg:text-base">
          You don't have any project yet!{' '}
          <Link href="/project-creation">
            <a className="text-main font-bold hover:text-indigo-400 duration-200">Start by creating one</a>
          </Link>
          .
        </div>
      )}
    </div>
  );
};
