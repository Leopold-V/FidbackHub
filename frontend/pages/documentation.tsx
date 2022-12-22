import React from "react";
import Page from "components/pages/documentation/index.mdx";
import Head from "next/head";

const DocumentationPage = () => {
  return (
    <>
      <Head>
      <title>Documentation</title>
    </Head>
    <div className="flex flex-col justify-center items-center py-8 container">
      <article className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500">
        <Page />
      </article>
    </div>
  </>
  );
};

export default DocumentationPage;
