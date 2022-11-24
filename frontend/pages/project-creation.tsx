import React from "react";
import Head from "next/head";
import WithGraphQL from "lib/with-graphql";
import Page from "components/pages/project-creation";

const ProjectCreationPage = ({
  session,
}) => {
  return (
    <WithGraphQL session={session}>
      <Head>
        <title>Project Creation</title>
      </Head>
      <Page />
    </WithGraphQL>
  );
};

export default ProjectCreationPage;
