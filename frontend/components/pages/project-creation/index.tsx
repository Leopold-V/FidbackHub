import React from 'react';
import { PageHeader } from 'components/common/PageHeader';
import { ProjectForm } from './ProjectForm';

const ProjectCreationComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 pb-8">
      <PageHeader label="New project" />
      <div className="flex flex-col xl:w-3/4 w-full mx-auto px-4">
        <div className="border border-3Background hover:border-4Background bg-mainBackground duration-200 sm:rounded p-1">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
};

export default ProjectCreationComponent;
