import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';

const DashboardPageComponent = ({ params }) => {
  const { data: session, status } = useSession();
  const [project, setProject] = useState({
    name: '',
    github_url: ''
  });

  const { data: userData, error, seterror, loading } = useFetch(`http://localhost:1337/api/users/${session.id}?populate=*`, session.jwt);

  useEffect(() => {
    if (userData) {
      const projectFound = userData.projects.find((ele) => (ele.id === +params.id));
      if (projectFound) {
        setProject(projectFound)
      } else {
        seterror('Error 404, page not found');
      }
    }
  }, [userData])

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