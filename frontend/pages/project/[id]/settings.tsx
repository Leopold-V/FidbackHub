import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Page from 'components/pages/edit-project';

const SettingsPage = ({ params, project }) => {
  return (
    <>
      <Head>
        <title>Project settings</title>
      </Head>
      <Page params={params} project={project} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { jwt } = await getSession({ req });
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}`,{
    headers: {
      Authorization: 'Bearer ' + jwt,
    }
  });
  const project = await data.json();
  return { props: { params, project: project.data.attributes } };
}

export default SettingsPage;
