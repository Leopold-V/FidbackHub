import React from 'react';
import { projectType } from 'types/index';
import { ProgressLineChartSection } from './ProgressLineChartSection';
import { ProjectHeader } from '../../common/ProjectHeader';
import { InfoSection } from './InfosSection';

const DashboardPageComponent = ({ params, project }: { params: any; project: projectType }) => {
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} name={project.name} />
      <div className="md:w-2/3 space-y-2">
        <InfoSection feedbacks={project.feedbacks} />
      </div>
      <div className="md:w-2/3 space-y-2">
        <ProgressLineChartSection feedbacks={project.feedbacks} />
      </div>
    </div>
  );
};

export default DashboardPageComponent;
