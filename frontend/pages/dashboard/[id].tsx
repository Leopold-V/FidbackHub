import React from "react";
import Head from "next/head";
import Page from "components/pages/dashboard";
import { getProjects } from "../../services/project.service";

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
    const projects = await getProjects(process.env.ALLPROJECTS_API_TOKEN);
    const listProjects = [...projects.data.map((ele) => ({params: {id: ele.id + ''}}))]
    return { paths: [...listProjects], fallback: false }
}

  // This also gets called at build time
export async function getStaticProps({ params }) {
    return { props: { params } }
}
  
export default DashboardPage;