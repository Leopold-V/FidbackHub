import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { userType } from 'types/index';
import { getUser } from '../services/user.service';
import Page from 'components/pages/my-account';

const MyAccountPage = ({ profile }: { profile: userType }) => {
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Page profile={profile} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const profile = await getUser(session.id, session.jwt);
  return {
    props: {
      profile,
    },
  };
};

export default MyAccountPage;
