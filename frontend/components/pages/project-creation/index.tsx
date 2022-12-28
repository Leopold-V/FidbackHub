import React from 'react';
import { ProjectForm } from './ProjectForm';

const ProjectCreationComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-8">
      <h1 className="mt-2 text-lg font-semibold">New project</h1>
      <ProjectForm />
    </div>
  );
};

export default ProjectCreationComponent;
