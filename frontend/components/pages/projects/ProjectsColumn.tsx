import React from 'react'
import { ProjectsList } from './ProjectsList'
import { ProjectsListHeader } from './ProjectsListHeader'

export const ProjectsColumn = () => {
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
    <ProjectsListHeader />
    <ProjectsList />
  </div>
  )
}