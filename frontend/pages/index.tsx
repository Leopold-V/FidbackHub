import React from 'react';
import Head from 'next/head';
import Page from 'components/pages/home/index';
import { NextPage } from 'next';

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

export default IndexPage;
