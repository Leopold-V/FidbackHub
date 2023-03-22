import React from 'react';
import { FeedbacksTable } from './FeedbacksTable';
import { useDateFilterForFeedbacks } from '../../../hooks/useDateFilterForFeedbacks';
import { projectType } from 'types/index';

const ProjectPageComponent = ({ project, projectId }: { project: projectType; projectId: number }) => {
  const [feedbacksFiltered, dateRange, setdateRange] = useDateFilterForFeedbacks(project.feedbacks, projectId);

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <FeedbacksTable
        projectToken={project.api_key}
        projectId={projectId}
        feedbacks={feedbacksFiltered}
        setdateRange={setdateRange}
      />
      {/* <FeedbacksSection feedbacks={feedbacks} setfeedbacks={setfeedbacks} projectId={project.id} /> */}
    </div>
  );
};

export default ProjectPageComponent;
