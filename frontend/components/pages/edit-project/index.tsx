import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch';
import { useSession } from 'next-auth/react';
import { EditProjectForm } from './EditProjectForm';
import { Card } from 'components/common/Card';
import SecretKey from '../dashboard/SecretKey';

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
    api_key: ''
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
    <div className="flex flex-col items-center py-8 space-y-8">
      <h1 className="mt-2 text-lg font-semibold">Project settings</h1>
      <Card>
        <div className="space-y-8">
          <SecretKey label={"Project token"} value={project.api_key} />
        {//@ts-ignore
          <EditProjectForm project={project} setProject={setProject} />
        }
        </div>
      </Card>
    </div>
  )
}

export default EditProjectPageComponent;