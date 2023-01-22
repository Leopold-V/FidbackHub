import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Page from 'components/pages/features';
import Layout from 'components/layout';
import { getProjectsFromUser } from '../../../services/project.service';

const FeaturesPage = ({ params, project, listProjects }) => {
  return (
    <>
      <Head>
        <title>Features request</title>
      </Head>
      <Layout listProjects={listProjects} id={params.id} name={project.name} >
        <Page project={project} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { jwt } = await getSession({ req });
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
  const currentProject = await data.json();
  const listProjects = await getProjectsFromUser(jwt);
  return { props: { params, project: currentProject.data.attributes, listProjects: listProjects.data.attributes } };
};

export default FeaturesPage;
