import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { projectType, userType } from 'types/index';
import { getUser } from '../services/user.service';
import Page from 'components/pages/my-account';
import Layout from 'components/layout';
import { getProjectsFromUser } from '../services/project.service';

const MyAccountPage = ({ profile, listProjects }: { profile: userType, listProjects: projectType[]}) => {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const profile = await getUser(session.id, session.jwt);
  const listProjects = await getProjectsFromUser(session.jwt);
  return {
    props: {
      profile,
      listProjects: listProjects.data.attributes
    },
  };
};

export default MyAccountPage;
