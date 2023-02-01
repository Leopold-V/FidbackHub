import React from 'react';
import { FeedbacksTable } from './FeedbacksTable';
import { useDateFilterForFeedbacks } from '../../../hooks/useDateFilterForFeedbacks';

const ProjectPageComponent = ({ project }) => {
  const [feedbacksFiltered, dateRange, setdateRange] = useDateFilterForFeedbacks(project.feedbacks);

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <FeedbacksTable projectId={project.id} feedbacks={feedbacksFiltered} setdateRange={setdateRange} />
      {/* <FeedbacksSection feedbacks={feedbacks} setfeedbacks={setfeedbacks} projectId={project.id} /> */}
    </div>
  );
};

export default ProjectPageComponent;
