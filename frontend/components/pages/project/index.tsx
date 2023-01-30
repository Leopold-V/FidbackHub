import React, { useState } from 'react';
import { FeedbacksSection } from './FeedbacksSection';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { FeedbacksTable } from './FeedbacksTable';

const ProjectPageComponent = ({ project }) => {
  const [feedbacks, setfeedbacks] = useState(project.feedbacks);

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <HeaderWrapper>
        <h2 className="text-secondary">Feedbacks</h2>
      </HeaderWrapper>
      <FeedbacksTable feedbacks={feedbacks} />
      {/* <FeedbacksSection feedbacks={feedbacks} setfeedbacks={setfeedbacks} projectId={project.id} /> */}
    </div>
  );
};

export default ProjectPageComponent;
