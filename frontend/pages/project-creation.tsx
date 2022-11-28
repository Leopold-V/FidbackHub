import React from "react";
import Head from "next/head";
import Page from "components/pages/project-creation";

const ProjectCreationPage = ({
  session,
}) => {
  return (
    <>
      <Head>
        <title>Project Creation</title>
      </Head>
      <Page />
    </>
  );
};

export default ProjectCreationPage;
