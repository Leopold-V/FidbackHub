import React from "react";
import { ratingType } from "types/index";
import { Card } from "components/common/Card";

export const StatsFeed = ({
  ratingsNumber,
  maxRatedProject,
  avgValues
}: {
  ratingsNumber: number;
  maxRatedProject: { name: string; number: number };
  avgValues: any[];
}) => {
  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <FeedHeader />
        <div className="py-4">
          <StatsList
            ratingsNumber={ratingsNumber}
            maxRatedProject={maxRatedProject}
            avgValues={avgValues}
          />
        </div>
      </div>
    </div>
  );
};

const StatsList = ({
  ratingsNumber,
  maxRatedProject,
  avgValues
}: {
  ratingsNumber: number;
  maxRatedProject: { name: string; number: number };
  avgValues: any[];
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <dt className="truncate text-sm font-medium text-gray-500">
          Total ratings in your projects:
        </dt>
        <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
          {ratingsNumber}
        </dd>
      </Card>
      <Card>
        <dt className="truncate text-sm font-medium text-gray-500">
          Most rated project
        </dt>
        <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
          {maxRatedProject.name}: {maxRatedProject.number}
        </dd>
      </Card>
      <Card>
        <dt className="truncate text-sm font-medium text-gray-500">
          Best rated project
        </dt>
        <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
          {avgValues.sort((a, b) => b.avg - a.avg)[0].name}: {avgValues.sort((a, b) => b.avg - a.avg)[0].avg.toFixed(2)}
        </dd>
      </Card>
    </div>
  );
};

const FeedHeader = () => {
  return (
    <div className="pt-6 pb-2">
      <h2 className="text-sm font-semibold">Stats</h2>
    </div>
  );
};
