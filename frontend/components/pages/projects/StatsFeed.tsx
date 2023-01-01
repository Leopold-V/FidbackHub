import React from 'react';
import { Card } from 'components/common/Card';

export const StatsFeed = ({
  ratingsNumber,
  maxRatedProject,
  avgValues,
}: {
  ratingsNumber: number;
  maxRatedProject: { name: string; number: number };
  avgValues: any[];
}) => {
  return (
    <div className="pr-4 sm:pr-6 lg:flex-shrink-0 lg:pr-8 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <FeedHeader />
        <div className="py-4">
          <StatsList ratingsNumber={ratingsNumber} maxRatedProject={maxRatedProject} avgValues={avgValues} />
        </div>
      </div>
    </div>
  );
};

const StatsList = ({
  ratingsNumber,
  maxRatedProject,
  avgValues,
}: {
  ratingsNumber: number;
  maxRatedProject: { name: string; number: number };
  avgValues: any[];
}) => {
  return (
    <div className="space-y-4 secondaryText">
      <Card>
        <dt className="truncate text-sm font-medium text-secondaryText">Total ratings:</dt>
        <dd className="mt-1 font-semibold tracking-tight ">{ratingsNumber}</dd>
      </Card>
      <Card>
        <dt className="truncate text-sm font-medium text-secondaryText">Most rated project</dt>
        <dd className="mt-1 font-semibold tracking-tight">
          {maxRatedProject.name}: {maxRatedProject.number}
        </dd>
      </Card>
      <Card>
        <dt className="truncate text-sm font-medium text-secondaryText">Best rated project</dt>
        <dd className="mt-1 font-semibold tracking-tight">
          {avgValues.sort((a, b) => b.avg - a.avg)[0].name}: {avgValues.sort((a, b) => b.avg - a.avg)[0].avg.toFixed(2)}
        </dd>
      </Card>
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
