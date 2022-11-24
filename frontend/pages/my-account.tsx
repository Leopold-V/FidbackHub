import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import WithGraphQL from "lib/with-graphql";
import Page from "components/pages/my-account";

const MyAccountPage = ({
  session,
}) => {

  return (
    <WithGraphQL session={session}>
      <Head>
        <title>My Account</title>
      </Head>
      <Page />
    </WithGraphQL>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default MyAccountPage;
