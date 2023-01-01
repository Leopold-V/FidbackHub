import React from 'react';
import Head from 'next/head';
import Page from 'components/pages/documentation/index.mdx';
import { PageHeader } from 'components/common/PageHeader';

const DocumentationPage = () => {
  return (
    <>
      <Head>
        <title>Documentation</title>
      </Head>
      <div className="flex flex-col items-center space-y-8 pb-8">
        <PageHeader label={'Documentation'} />
        <article className="prose prose-mainText prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <Page />
        </article>
      </div>
    </>
  );
};

export default DocumentationPage;
