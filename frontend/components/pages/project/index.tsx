import React, { useState } from 'react';
import { FeedbacksSection } from './FeedbacksSection';

const ProjectPageComponent = ({ project }) => {
  const [feedbacks, setfeedbacks] = useState(project.feedbacks);
  return (
    <div className="flex flex-col items-center flex-grow h-full">
      <FeedbacksSection feedbacks={feedbacks} setfeedbacks={setfeedbacks} projectId={project.id} />
    </div>
  );
};

export default ProjectPageComponent;
