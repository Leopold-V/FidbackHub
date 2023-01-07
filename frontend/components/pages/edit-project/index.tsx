import React, { useState } from 'react';
import { EditProjectForm } from './EditProjectForm';
import SecretKey from './SecretKey';
import { DangerZone } from './DangerZone';
import { ProjectHeader } from 'components/common/ProjectHeader';

const EditProjectPageComponent = ({ params, project }) => {
  const [_project, setProject] = useState(project);
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
        <ProjectHeader id={params.id} />
        <h1 className="mt-2 text-3xl font-bold text-center">{_project.name}</h1>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Details</h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded p-1">
          <EditProjectForm project={project} setProject={setProject} />
        </div>
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Access</h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded py-4">
          <SecretKey label={'Project token'} value={_project.api_key} />
        </div>
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium text-red-500">Danger zone</h2>
        <div className="border border-red-500 bg-stone-900 duration-200 sm:rounded p-1">
          <DangerZone projectId={_project.id} />
        </div>
      </div>
    </div>
  );
};

export default EditProjectPageComponent;
