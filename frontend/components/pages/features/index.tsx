import { HeaderWrapper } from 'components/common/HeaderWrapper';
import React from 'react';
import { projectType } from 'types/index';

const FeaturesPageComponent = ({ project }: { project: projectType }) => {
  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <HeaderWrapper>
        <h2 className="text-secondary">Features request</h2>
      </HeaderWrapper>
      <p className="text-muted">
        Todo: page listing all feedback of type features request and users should be able to upvote
      </p>
    </div>
  );
};

export default FeaturesPageComponent;
