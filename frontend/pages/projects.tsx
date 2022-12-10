import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { getUser } from "../services/user.service";
import { getProjects } from "../services/project.service";

import Page from "components/pages/projects";
import { projectType, userType } from "types/index";

const ProjectsPage = ({ userData, userProjects }: { userData: userType, userProjects: projectType[] }) => {
  return (
    <>
      <Head>
      <title>Projects</title>
      </Head>
      <Page userData={userData} userProjects={userProjects} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userData = await getUser(session.id, session.jwt);
  const userProjects = await getProjects(process.env.PROJECTS_API_TOKEN, session.id);
  return {
    props: {
      userData,
      userProjects: userProjects.data.map((ele) => ({...ele.attributes, id: ele.id }))
    },
  };
};


export default ProjectsPage;
