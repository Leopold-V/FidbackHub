import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <div className="flex flex-col justify-center items-center space-y-8">
        <h1 className="mt-8 text-lg font-semibold">Error 404, page not found</h1>
      </div>
    </>
  );
};

export default Custom404Page;
