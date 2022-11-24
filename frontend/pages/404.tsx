import React from "react";
import Head from "next/head";
import { NextPage } from "next";

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <div>Error 404, page not found</div>
    </>
  );
};

export default Custom404Page;
