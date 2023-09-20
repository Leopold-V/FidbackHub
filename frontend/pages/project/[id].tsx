import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getProjectsFromUser } from '../../services/project.service';
import Page from 'components/pages/project';
import Layout from 'components/layout';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

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
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${context.params.id}`, {
    headers: {
      Authorization: 'Bearer ' + session.jwt,
    },
  });
  const currentProject = await data.json();
  const listProjects = await getProjectsFromUser(session.jwt);
  return {
    props: {
      params: context.params,
      feedbacks: currentProject.data.attributes.feedbacks,
      projectToken: currentProject.data.attributes.api_key,
      projectName: currentProject.data.attributes.name,
      listProjects: listProjects.data.attributes,
    },
  };
};

export default ProjectPage;
