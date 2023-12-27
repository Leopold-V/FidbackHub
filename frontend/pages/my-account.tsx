import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { projectType, userType } from 'types/index';
import { getUser } from '../services/user.service';
import { getProjectsFromUser } from '../services/project.service';
import Page from 'components/pages/my-account';
import Layout from 'components/layout';

const MyAccountPage = ({ profile, listProjects }: { profile: userType; listProjects: projectType[] }) => {
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout listProjects={listProjects}>
        <Page profile={profile} />
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
  const profile = await getUser(session.jwt);
  const listProjects = await getProjectsFromUser(session.jwt);
  return {
    props: {
      profile,
      listProjects: listProjects.data.attributes,
    },
  };
};

export default MyAccountPage;
