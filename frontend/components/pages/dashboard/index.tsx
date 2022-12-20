import React from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { BarChartSection } from './BarChartSection';
import { AverageChartSection } from './AverageChartSection';
import { InfoSection } from './InfosSection';
import { ListRatingsSection } from './ListRatingsSection';

const DashboardPageComponent = ({ params }) => {
  const { data: session } = useSession();
  const { data: projectData, error, loading } = useFetch(`http://localhost:3000/api/projects/${params.id}`, session.jwt);

  if (loading) return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8 text-lg font-semibold">Loading...</h1>
    </div>
  )
  if (error) return ((
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8 text-lg font-semibold">{error}</h1>
    </div>
  ))

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <h1 className="mt-2 text-2xl font-medium">{projectData.data.attributes.name} <span className="text-indigo-600 font-extrabold"> dashboard</span></h1>
      <div className="flex items-center space-x-2">
        <div className="block font-semibold">
         Project Token:
        </div>
        <div className="sm:col-span-2">
         <span className="block text-sm text-gray-700 w-56 overflow-hidden overflow-ellipsis break-before-auto">{projectData.data.attributes.api_key}</span> 
        </div>
      </div>
      {projectData.data.attributes.ratings.length > 0 ?
      (<div className="space-y-8">
        <InfoSection ratings={projectData.data.attributes.ratings} />
        <AverageChartSection ratings={projectData.data.attributes.ratings} />
        <BarChartSection ratings={projectData.data.attributes.ratings} />
        <ListRatingsSection ratings={projectData.data.attributes.ratings} />
      </div>
      )
      : <div className="text-center my-6 text-sm lg:text-base">It looks like you don't have any data yet...</div>}
    </div>
  )
}



export default DashboardPageComponent;