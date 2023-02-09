import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Page from 'components/pages/feedback';
import Layout from 'components/layout';
import { getProjectsFromUser } from '../../../../services/project.service';

const FeedbackPage = ({ params, project, listProjects, feedback }) => {
  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <Layout listProjects={listProjects} id={params.id} name={project.name}>
        <Page feedback={feedback} />
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
  const dataFeedback = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedbacks/${params.feedback}`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
  const feedback = await dataFeedback.json();
  return { props: { 
      params, project: currentProject.data.attributes, 
      listProjects: listProjects.data.attributes,
      feedback: {...feedback.data.attributes, api_key: feedback.data.attributes.project.api_key} 
    } 
  };
};

export default FeedbackPage;
