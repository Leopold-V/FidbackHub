import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { EditProjectForm } from './EditProjectForm';

const EditProjectPageComponent = ({ params }) => {
  const { data: session, status } = useSession();
  const [project, setProject] = useState({
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    github_url: '',
    website_url: '',
  });

  const { data: projectData, error, seterror, loading } = useFetch(`http://localhost:3000/api/projects/${params.id}`, session.jwt);

  useEffect(() => {
      if (projectData) {
        console.log(projectData);
        setProject({...projectData.data.attributes, id: projectData.data.id});
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
      <h1 className="mt-8 text-lg font-semibold">Edit your project</h1>
      {<EditProjectForm project={project} setProject={setProject} />}
    </div>
  )
}

export default EditProjectPageComponent;