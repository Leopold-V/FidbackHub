import React from 'react';
import { ProgressLineChartSection } from './ProgressLineChartSection';
import { ProjectHeader } from '../../common/ProjectHeader';

const ProjectPageComponent = ({ params, project }) => {
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} />
      <div className="space-y-8 md:w-2/3">
        <ProgressLineChartSection feedbacks={project.feedbacks} />
      </div>
    </div>
  );
};

export default ProjectPageComponent;
