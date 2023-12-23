import React from 'react';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next/types';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import { getHistories } from '../services/history.service';
import Page from 'components/pages/projects';
import Layout from 'components/layout';

const ProjectsPage = ({ listProjects, userData, histories }) => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Layout listProjects={listProjects}>
        <Page userData={userData} userProjects={listProjects} histories={histories} />
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
  try {
    const userData = await getUser(session.jwt);
    const listProjects = await getProjectsFromUser(session.jwt);
    const dataHistory = await getHistories(session.jwt);
    return {
      props: {
        userData: userData,
        listProjects: Object.values(listProjects.data.attributes),
        histories: Object.values(dataHistory.data.attributes),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default ProjectsPage;
