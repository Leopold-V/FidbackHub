import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from 'components/pages/feedback';

const FeedbackPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Feedback {id}</title>
      </Head>
      <Page id={id} />
    </>
  );
};

export default FeedbackPage;
