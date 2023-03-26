import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getProjectsFromUser } from '../../services/project.service';
import Page from 'components/pages/project';
import Layout from 'components/layout';

const ProjectPage = ({ params, feedbacks, projectName, projectToken, listProjects }) => {
  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <Layout listProjects={listProjects} id={params.id} name={projectName}>
        <Page feedbacks={feedbacks} projectToken={projectToken} projectId={params.id} />
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
  return {
    props: {
      params,
      feedbacks: currentProject.data.attributes.feedbacks,
      projectToken: currentProject.data.attributes.api_key,
      projectName: currentProject.data.attributes.name,
      listProjects: listProjects.data.attributes,
    },
  };
};

export default ProjectPage;
