import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { InfoSection } from './InfosSection';
import { ListFeedbacksSection } from './ListFeedbacksSection';
import { Spinner } from 'components/common/Spinner';
import { ProjectHeader } from '../../common/ProjectHeader';

const ProjectPageComponent = ({ params }) => {
  const { data: session } = useSession();
  const {
    data: projectData,
    error,
    loading,
  } = useFetch(`http://localhost:3000/api/projects/${params.id}`, session.jwt);

  // TODO: SKELETON LOADING
  if (loading)
    return (
      <div className="flex flex-col items-center space-y-8">
        <ProjectHeader id={params.id} />
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center space-y-8">
        <ProjectHeader id={params.id} />
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <ProjectHeader id={params.id} />
      {projectData.data && (
        <div className="space-y-8 md:w-2/3">
          <InfoSection feedbacks={projectData.data.attributes.feedbacks} />
          <ListFeedbacksSection feedbacks={projectData.data.attributes.feedbacks} />
        </div>
      )}
    </div>
  );
};

export default ProjectPageComponent;
