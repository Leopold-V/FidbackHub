import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import Page from 'components/pages/project-creation';
import Layout from 'components/layout';

const ProjectCreationPage = ({ listProjects, userData }) => {
  return (
    <>
      <Head>
        <title>Project Creation</title>
      </Head>
      <Layout listProjects={listProjects}>
        <Page />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userData = await getUser(session.jwt);
  const listProjects = await getProjectsFromUser(session.jwt);
  return { props: { userData: userData, listProjects: Object.values(listProjects.data.attributes) } };
};

export default ProjectCreationPage;
