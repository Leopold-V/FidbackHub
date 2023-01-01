import React from 'react';
import Head from 'next/head';
import Page from 'components/pages/documentation/index.mdx';

const DocumentationPage = () => {
  return (
    <>
      <Head>
        <title>Documentation</title>
      </Head>
      <div className="flex flex-col justify-center items-center py-8 container">
        <article className="prose prose-mainText prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <Page />
        </article>
      </div>
    </>
  );
};

export default DocumentationPage;
