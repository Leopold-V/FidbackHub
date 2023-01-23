import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import Page from 'components/pages/documentation/index.mdx';
import Layout from 'components/layout';
import { getProjectsFromUser } from '../../../services/project.service';

const DocumentationPage = ({ params, project, listProjects }) => {
  return (
    <>
      <Head>
        <title>Documentation</title>
      </Head>
      <Layout listProjects={listProjects} id={params.id} name={project.name}>
        <div className="flex flex-col items-center space-y-8 pb-8">
          <article className="prose prose-mainText prose-a:text-blue-600 hover:prose-a:text-blue-500">
            <Page project={project} />
          </article>
        </div>
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

export default DocumentationPage;
