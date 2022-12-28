import React from 'react';
import Head from 'next/head';
import Page from 'components/pages/dashboard';

const DashboardPage = ({ params }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Page params={params} />
    </>
  );
};

export async function getStaticPaths() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    headers: {
      Authorization: 'Bearer ' + process.env.PROJECTS_API_TOKEN,
    },
  });
  const projects = await data.json();
  const listProjects = [...projects.data.map((ele) => ({ params: { id: ele.id + '' } }))];
  return { paths: [...listProjects], fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return { props: { params } };
}

export default DashboardPage;
