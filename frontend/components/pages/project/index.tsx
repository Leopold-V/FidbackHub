import React, { useState } from 'react';
import { ProjectHeader } from '../../common/ProjectHeader';
import { ListFeedbacks } from './ListFeedbacks';

const ProjectPageComponent = ({ params, project }) => {
  const [feedbacks, setfeedbacks] = useState(project.feedbacks);
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} name={project.name} />
      <div className="lg:w-3/4 flex flex-col lg:grid sm:grid-cols-4 lg:gap-6 space-y-4 lg:space-y-0">
        <div className="lg:col-span-3">
          <ListFeedbacks feedbacks={feedbacks} setfeedbacks={setfeedbacks} />
        </div>
        <div className="lg:col-span-1">
          <h3 className="font-medium mb-3">Feed</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageComponent;
