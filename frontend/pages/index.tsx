import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import { NextPage } from 'next';
import Page from 'components/pages/home/index';
import { getSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>FidbackHub</title>
      </Head>
      <Page />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/projects', // Replace with your desired route
        permanent: false,
      },
    };
  }

  return {
    props: {}, // No props are needed for the home page
  };
};

export default IndexPage;
