import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import Page from 'components/pages/projects';
import { Spinner } from 'components/common/Spinner';

const ProjectsPage = () => {
  const { data: session } = useSession();
  const [userProjects, setuserProjects] = useState([]);
  const [userData, setuserData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser(session.id, session.jwt);
        setuserData(userData);
        const projects = await getProjectsFromUser(session.jwt);
        setuserProjects(Object.values(projects.data.attributes));
        setloading(false);
      } catch (error) {
        setError('Error server, please retry later or contact the administrator if the problem persist.');
        setloading(false);
      }
    })();
  }, []);

  // TODO: build a skeleton page for loading ?
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 mt-8">
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your data...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-8">
        <h1 className="mt-2 font-semibold">Error: {error}</h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Page userData={userData} userProjects={userProjects} />
    </>
  );
};

export default ProjectsPage;
