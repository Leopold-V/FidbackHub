import React from "react";
import Page from "components/pages/dashboard";
import Head from "next/head";

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
    const paths = [
        {params: { id: '1' }},
        {params: { id: '2' }},
        {params: { id: '3' }}
    ]
    return { paths, fallback: false }
}

  // This also gets called at build time
export async function getStaticProps({ params }) {
    return { props: { params } }
}
  
export default DashboardPage;