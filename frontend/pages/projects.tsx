import React from 'react';
import Head from 'next/head';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import Page from 'components/pages/projects';
import Layout from 'components/layout';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

const ProjectsPage = ({ listProjects, userData}) => {
  console.log(listProjects);
  
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Layout listProjects={listProjects} >
        <Page userData={userData} userProjects={listProjects} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userData = await getUser(session.id, session.jwt);
  const listProjects = await getProjectsFromUser(session.jwt);
  return { props: { userData: userData, listProjects: Object.values(listProjects.data.attributes) } };
};

export default ProjectsPage;
