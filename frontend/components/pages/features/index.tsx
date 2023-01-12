import React from 'react';
import { projectType } from 'types/index';
import { ProjectHeader } from '../../common/ProjectHeader';

const FeaturesPageComponent = ({ params, project }: { params: any; project: projectType }) => {
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} name={project.name} />
    </div>
  );
};

export default FeaturesPageComponent;
