import React from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { BarChartSection } from './BarChartSection';
import { LineChartSection } from './LineChartSection';

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
    <div className="flex flex-col items-center space-y-8 bg-gray-50">
      <h1 className="mt-8 text-lg font-semibold">{projectData.data.attributes.name} <span className="text-indigo-600"> dashboard</span></h1>
      {projectData.data.attributes.ratings.length > 0 ?
      (<div className="divide-y space-y-8">
        <BarChartSection ratings={projectData.data.attributes.ratings} />
        <LineChartSection ratings={projectData.data.attributes.ratings} />
        <div className="pt-8">Line chart2 here</div>
        <div className="pt-8">Line chart3 here</div>
      </div>
      )
      : <div className="text-center my-6 text-sm lg:text-base">It looks like you don't have any data yet...</div>}
    </div>
  )
}



export default DashboardPageComponent;