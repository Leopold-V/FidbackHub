import React, { useState } from 'react'
import { projectType } from "types/index";
import { ProjectItem } from './ProjectItem'

export const ProjectsList = ({ projects, setprojects }: { projects: projectType[], setprojects: (projects: projectType[]) => void}) => {

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {projects.map((project) => (
      <ProjectItem project={project} key={project.id} projects={projects} setprojects={setprojects} />
    ))}
  </ul>
  )
}
