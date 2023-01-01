import React from 'react';
import { RectangleStackIcon } from '@heroicons/react/20/solid';

export const MetaInfo = ({ projectsNumber }: { projectsNumber: number }) => {
  return (
    <div className="flex flex-col space-y-6 sm:flex-row md:justify-center sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
      <div className="flex items-center space-x-2 text-secondaryText hover:text-main duration-150">
        <RectangleStackIcon className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-mediumt">
          {projectsNumber} Project{projectsNumber > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};
