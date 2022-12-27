import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { getUser } from "../services/user.service";
import { getProjectsFromUser } from "../services/project.service";
import Page from "components/pages/projects";

const ProjectsPage = () => {
  const { data: session } = useSession()
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
  }, []);

  // TODO: build a skeleton page for loading ?
  if (loading) {
    return <div>Loading</div>
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
