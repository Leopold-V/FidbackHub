import React, { useState } from 'react';
import { EditProjectForm } from './EditProjectForm';
import { DangerZone } from './DangerZone';
import { AccessZone } from './AccessZone';

const EditProjectPageComponent = ({ project }) => {
  const [_project, setProject] = useState(project);
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Details</h2>
        <EditProjectForm project={project} setProject={setProject} />
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Access</h2>
        <div className="divide-y divide-3Background border border-3Background hover:border-4Background bg-mainBackground duration-200 sm:rounded p-1">
          <AccessZone project={project} />
        </div>
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium text-red-500">Danger zone</h2>
        <div className="border border-red-500 bg-mainBackground duration-200 sm:rounded p-1">
          <DangerZone projectId={_project.id} />
        </div>
      </div>
    </div>
  );
};

export default EditProjectPageComponent;
