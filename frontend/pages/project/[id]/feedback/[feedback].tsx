import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getProjectsFromUser } from '../../../../services/project.service';
import { getHistories } from '../../../../services/history.service';
import Page from 'components/pages/feedback';
import Layout from 'components/layout';
import { historyType } from 'types/index';

const FeedbackPage = ({ params, project, listProjects, feedback, histories }) => {
  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <Layout listProjects={listProjects} id={params.id} name={project.name}>
        <Page _feedback={feedback} histories={histories} projectId={project.id} projectTitle={project.name} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { jwt } = await getSession({ req });
  try {
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
    const dataHistory = await getHistories(jwt);
    const dataHistoryFiltered = [
      ...Object.values(dataHistory.data.attributes).filter(
        (ele: historyType) =>
          +ele.project.id === +params.id &&
          ele.content_type === 'feedback' &&
          +ele.content_id === +params.feedback &&
          ele.action === 'update',
      ),
    ];
    return {
      props: {
        params,
        project: currentProject.data.attributes,
        listProjects: listProjects.data.attributes,
        feedback: { ...feedback.data.attributes, api_key: feedback.data.attributes.project.api_key },
        histories: dataHistoryFiltered,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default FeedbackPage;
