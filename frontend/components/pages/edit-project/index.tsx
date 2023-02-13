import React, { useState } from 'react';
import { EditProjectForm } from './EditProjectForm';
import { DangerZone } from './DangerZone';
import { AccessZone } from './AccessZone';
import { HeaderWrapper } from 'components/common/HeaderWrapper';

const EditProjectPageComponent = ({ project }) => {
  const [_project, setProject] = useState(project);
  return (
    <div>
      <HeaderWrapper>
        <h2>Settings</h2>
      </HeaderWrapper>
      <div className="flex lg:flex-row flex-col py-8 px-5">
        <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 lg:pr-2.5 pr-0">
          <h2 className="font-medium">Details</h2>
          <EditProjectForm project={project} setProject={setProject} />
        </div>
        <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 lg:pt-0 pt-3 lg:pl-2.5 pl-0">
          <h2 className="font-medium">Access</h2>
          <div className="divide-y divide-3Background border border-3Background hover:border-4Background bg-mainBackground duration-200 sm:rounded p-1">
            <AccessZone project={project} />
          </div>
          <div className="flex flex-col w-full mx-auto space-y-2 pt-3">
          <h2 className="font-medium text-red-500">Danger zone</h2>
          <div className="border border-red-500 bg-mainBackground duration-200 sm:rounded p-1">
            <DangerZone projectId={_project.id} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectPageComponent;
