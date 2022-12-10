import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';

const DashboardPageComponent = ({ params }) => {
  const { data: session, status } = useSession();
  const [project, setProject] = useState({
    name: '',
    github_url: ''
  });

  const { data: projectData, error, seterror, loading } = useFetch(`http://localhost:3000/api/projects/${params.id}`, session.jwt);

  useEffect(() => {
    if (projectData) {
      setProject({...projectData.data.attributes})
    }
  }, [projectData])

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
      <h1 className="mt-8 text-lg font-semibold">{project.name} <span className="text-indigo-600"> dashboard</span></h1>
    </div>
  )
}

export default DashboardPageComponent;