import React from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { Chart } from './Chart';

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
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8 text-lg font-semibold">{projectData.data.attributes.name} <span className="text-indigo-600"> dashboard</span></h1>
      {projectData.data.attributes.ratings.length > 0 ? 
      <div className="flex flex-row justify-center items-center">
        <Chart title={"Design"} ratings={projectData.data.attributes.ratings} ratingType="design" />
        <Chart title={"Speed"} ratings={projectData.data.attributes.ratings} ratingType="speed" />
        <Chart title={"Responsive"} ratings={projectData.data.attributes.ratings} ratingType="responsive" />
      </div>
      : <div className="text-center my-6 text-sm lg:text-base">It looks like you don't have any data yet...</div>}
    </div>
  )
}



export default DashboardPageComponent;