import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { BarChartSection } from './BarChartSection';
import { AverageChartSection } from './AverageChartSection';
import { InfoSection } from './InfosSection';
import { ListRatingsSection } from './ListRatingsSection';
import { Spinner } from 'components/common/Spinner';
import { PageHeader } from 'components/common/PageHeader';

const DashboardPageComponent = ({ params }) => {
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
        <PageHeader label="Dashboard" />
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center space-y-8">
        <PageHeader label="Dashboard" />
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <PageHeader label="Dashboard" />
      <h1 className="mt-2 text-2xl font-semibold">{projectData.data.attributes.name}</h1>
      {projectData.data && (
        <div className="space-y-8">
          <InfoSection ratings={projectData.data.attributes.ratings} />
          <AverageChartSection ratings={projectData.data.attributes.ratings} />
          <BarChartSection ratings={projectData.data.attributes.ratings} />
          <ListRatingsSection ratings={projectData.data.attributes.ratings} />
        </div>
      )}
    </div>
  );
};

export default DashboardPageComponent;
