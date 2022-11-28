import { useSession } from 'next-auth/react';
import React from 'react'
import { ProjectForm } from './ProjectForm';

const ProjectCreationComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8 text-lg font-semibold">New project</h1>
      <ProjectForm />
    </div>
  )
}

export default ProjectCreationComponent;
