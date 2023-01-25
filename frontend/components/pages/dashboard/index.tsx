import React from 'react';
import { projectType } from 'types/index';
import { ProgressLineChartSection } from './ProgressLineChartSection';
import { InfoSection } from './InfosSection';
import { HeaderWrapper } from 'components/common/HeaderWrapper';

const DashboardPageComponent = ({ project }: { project: projectType }) => {
  return (
    <div>
      <HeaderWrapper>
        <h2 className="text-secondary">Statistics</h2>
      </HeaderWrapper>
    <div className="flex flex-col items-center space-y-8 pb-8">
      <div className="md:w-2/3 space-y-2">
        <InfoSection feedbacks={project.feedbacks} />
      </div>
      <div className="md:w-2/3 space-y-2">
        <ProgressLineChartSection feedbacks={project.feedbacks} />
      </div>
    </div>
    </div>
  );
};

export default DashboardPageComponent;
