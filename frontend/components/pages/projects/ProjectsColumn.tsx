import Link from 'next/link'
import React from 'react'
import { projectType } from 'types/index'
import { ProjectsList } from './ProjectsList'
import { ProjectsListHeader } from './ProjectsListHeader'

export const ProjectsColumn = ({ projects }: { projects: projectType[]}) => {
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
    <ProjectsListHeader />
    {projects.length > 0 ? <ProjectsList projects={projects} />
    : <div className="text-center my-6 text-sm lg:text-base">You don't have any connexion yet! <Link href="/project-creation"><a className="text-indigo-600 font-bold hover:text-indigo-400">Start by creating one</a></Link>.</div>}
  </div>
  )
}
