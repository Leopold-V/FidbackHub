import React, { useState } from 'react'
import { projectType } from "types/index";
import { ProjectItem } from './ProjectItem'

export const ProjectsList = ({ projects }: { projects: projectType[]}) => {
  const [_projects, setprojects] = useState(projects);

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {_projects.map((project) => (
      <ProjectItem project={project} key={project.id} projects={_projects} setprojects={setprojects} />
    ))}
  </ul>
  )
}
