import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider  } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import '../styles/globals.css'
import Layout from "components/layout";
import { LoaderScreen } from "components/common/LoaderScreen";
import FeedbackHub from '../node_modules/fidbackhub';

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
          {router.pathname !== '/' ? 
          <ProtectedRoute>
            <Layout>    
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
            : <Component {...pageProps} />
          }
          <FeedbackHub 
            color="indigo" 
            ApiKey="ooosj6mXZiXCbZ+hrK+WZ2HI3jieFFJMNX+AszKHdfbA1QKuV8IOSsq0XpSjSbnfxH+FlkAVR35wztNP5xhtrw=="
          />
      </SessionProvider>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { status } = useSession()
  if (status === 'loading') {
    return (<LoaderScreen />)
  }
  return children;
}

export default App;
