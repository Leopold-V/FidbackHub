import React, { useEffect, useState } from 'react';
import { FeedbacksTable } from './FeedbacksTable';
import { feedbackType, historyType } from 'types/index';

const ProjectPageComponent = ({
  feedbacks,
  projectToken,
  projectId,
  histories,
  projectTitle,
}: {
  feedbacks: feedbackType[];
  projectToken: string;
  projectId: number;
  histories: historyType[];
  projectTitle: string;
}) => {
  const [_feedbacks, setfeedbacks] = useState(feedbacks);

  useEffect(() => {
    setfeedbacks(feedbacks);
  }, [projectId]);

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <FeedbacksTable
        projectToken={projectToken}
        projectId={projectId}
        feedbacks={_feedbacks}
        setfeedbacks={setfeedbacks}
        projectTitle={projectTitle}
      />
    </div>
  );
};

export default ProjectPageComponent;
