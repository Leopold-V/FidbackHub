import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { getUser } from "../services/user.service";
import { getProjects, getProjectsFromUser } from "../services/project.service";
import Page from "components/pages/projects";
import { useSession } from "next-auth/react";
import { LoaderScreen } from "components/common/LoaderScreen";

const ProjectsPage = () => {
  const { data: session, status } = useSession()
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
        setError(error.message);
        setloading(false);
      }
    })()
  }, [])

  if (loading) {
    return <LoaderScreen />
  }
  if (error) {
    return <div>Error: {error}</div>
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
