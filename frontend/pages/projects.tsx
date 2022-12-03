import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { getUser } from "../services/user.service";

import Page from "components/pages/projects";
import { userType } from "types/index";

const ProjectsPage = ({ userData }: { userData: userType }) => {
  return (
    <>
      <Head>
      <title>Projects</title>
      </Head>
      <Page userData={userData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userData = await getUser(session.id, session.jwt);
  return {
    props: {
      userData
    },
  };
};


export default ProjectsPage;
