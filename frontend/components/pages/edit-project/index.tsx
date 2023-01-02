import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFetch } from '../../../hooks/useFetch';
import { Spinner } from 'components/common/Spinner';
import { PageHeader } from 'components/common/PageHeader';
import { EditProjectForm } from './EditProjectForm';
import SecretKey from './SecretKey';
import { DangerZone } from './DangerZone';

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
    api_key: '',
    feedbacks: [],
  });

  const {
    data: projectData,
    error,
    loading,
  } = useFetch(`http://localhost:3000/api/projects/${params.id}`, session.jwt);

  useEffect(() => {
    if (projectData) {
      setProject({ ...projectData.data.attributes, id: projectData.data.id });
    }
  }, [projectData]);

  // TODO: SKELETON LOADING
  if (loading)
    return (
      <div className="flex flex-col items-center space-y-8">
        <PageHeader label={'Project Settings'} />
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center space-y-8">
        <PageHeader label={'Project Settings'} />
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <PageHeader label={'Project Settings'} />
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Details</h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded p-1">
          {
            //@ts-ignore
            <EditProjectForm project={project} setProject={setProject} />
          }
        </div>
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">Access</h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded py-4">
          <SecretKey label={'Project token'} value={project.api_key} />
        </div>
      </div>
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium text-red-500">Danger zone</h2>
        <div className="border border-red-500 bg-stone-900 duration-200 sm:rounded p-1">
          <DangerZone projectId={project.id} />
        </div>
      </div>
    </div>
  );
};

export default EditProjectPageComponent;
