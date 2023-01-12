import React, { useState } from 'react';
import { ProjectHeader } from '../../common/ProjectHeader';
import { FeedbacksSection } from './FeedbacksSection';

const ProjectPageComponent = ({ params, project }) => {
  const [feedbacks, setfeedbacks] = useState(project.feedbacks);
  return (
    <div className="flex flex-col items-center flex-grow h-full">
      <ProjectHeader id={params.id} name={project.name} />
      <FeedbacksSection feedbacks={feedbacks} setfeedbacks={setfeedbacks} projectId={project.id} />
    </div>
  );
};

export default ProjectPageComponent;
