import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { BarChartSection } from './BarChartSection';
import { AverageChartSection } from './AverageChartSection';
import { InfoSection } from './InfosSection';
import { ListRatingsSection } from './ListRatingsSection';
import { Spinner } from 'components/common/Spinner';

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
      <div className="flex flex-col justify-center items-center space-y-2 mt-8">
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col justify-center items-center mt-8">
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <h1 className="mt-2 text-2xl font-medium">
        {projectData.data.attributes.name} <span className="text-indigo-600 font-extrabold"> dashboard</span>
      </h1>
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
