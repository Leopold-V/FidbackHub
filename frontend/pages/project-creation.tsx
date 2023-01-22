import React from 'react';
import Head from 'next/head';
import Page from 'components/pages/project-creation';
import Layout from 'components/layout';

const ProjectCreationPage = () => {
  return (
    <>
      <Head>
        <title>Project Creation</title>
      </Head>
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default ProjectCreationPage;
