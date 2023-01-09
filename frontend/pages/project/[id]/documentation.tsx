import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import Page from 'components/pages/documentation/index.mdx';
import { PageHeader } from 'components/common/PageHeader';
import { ProjectHeader } from 'components/common/ProjectHeader';

const DocumentationPage = ({ params, project }) => {
  return (
    <>
      <Head>
        <title>Documentation</title>
      </Head>
      <div className="flex flex-col items-center space-y-8 pb-8">
        <ProjectHeader id={params.id} name={project.name} />
        <article className="prose prose-mainText prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <Page params={params} project={project} />
        </article>
      </div>
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
  const project = await data.json();
  return { props: { params, project: project.data.attributes } };
};

export default DocumentationPage;
