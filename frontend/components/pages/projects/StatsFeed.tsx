import React from 'react';
import { Card } from 'components/common/Card';

export const StatsFeed = ({
  feedbackNumber,
  maxFeedbackProject,
}: {
  feedbackNumber: number;
  maxFeedbackProject: { name: string; number: number };
}) => {
  return (
    <div className="">
      <FeedHeader />
      <div className="py-4">
        <StatsList feedbackNumber={feedbackNumber} maxFeedbackProject={maxFeedbackProject} />
      </div>
    </div>
  );
};

const StatsList = ({
  feedbackNumber,
  maxFeedbackProject,
}: {
  feedbackNumber: number;
  maxFeedbackProject: { name: string; number: number };
}) => {
  return (
    <div className="space-y-4 secondaryText">
      <Card>
        <dt className="truncate text-sm font-medium text-secondaryText">Total feedbacks:</dt>
        <dd className="mt-1 font-semibold tracking-tight ">{feedbackNumber}</dd>
      </Card>
      {feedbackNumber > 0 && (
        <Card>
          <dt className="truncate text-sm font-medium text-secondaryText">Most active project</dt>
          <dd className="mt-1 font-semibold tracking-tight">
            {maxFeedbackProject.name} ({maxFeedbackProject.number})
          </dd>
        </Card>
      )}
    </div>
  );
};

const FeedHeader = () => {
  return (
    <div className="pt-6 pb-2">
      <h2 className="font-medium">Stats</h2>
    </div>
  );
};
