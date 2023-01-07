import React from 'react';
import { InfoSection } from './InfosSection';
import { ListFeedbacksSection } from './ListFeedbacksSection';
import { ProjectHeader } from '../../common/ProjectHeader';

const ProjectPageComponent = ({ params, project }) => {
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} />
        <div className="lg:w-3/4 flex flex-col lg:grid sm:grid-cols-4 lg:gap-6 space-y-4 lg:space-y-0">
          <div className="lg:col-span-3">
            <ListFeedbacksSection feedbacks={project.feedbacks} />
          </div>
          <div className="lg:col-span-1">
            <InfoSection feedbacks={project.feedbacks} />
          </div>
        </div>
    </div>
  );
};

export default ProjectPageComponent;
