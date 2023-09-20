import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import Page from 'components/pages/project-creation';
import Layout from 'components/layout';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  const userData = await getUser(session.jwt);
  const listProjects = await getProjectsFromUser(session.jwt);
  return { props: { userData: userData, listProjects: Object.values(listProjects.data.attributes) } };
};

export default ProjectCreationPage;
