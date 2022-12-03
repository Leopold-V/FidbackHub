import React from 'react'
import { projectType } from 'types/index'
import { ProjectsList } from './ProjectsList'
import { ProjectsListHeader } from './ProjectsListHeader'

export const ProjectsColumn = ({ projects }: { projects: projectType[]}) => {
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
    <ProjectsListHeader />
    <ProjectsList projects={projects} />
  </div>
  )
}
