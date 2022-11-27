import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react'
import { ProjectItem } from './ProjectItem'

export const ProjectsList = ({ projects }) => {

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {projects.map((project) => (
      <ProjectItem project={project} key={project.id} />
    ))}
  </ul>
  )
}
