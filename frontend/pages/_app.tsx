import React, { useEffect } from "react";
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
            //apiKey="XBDdI0zL/IowdCvNPSlxMNHH2y8THZeUsdXoy3TD46hDwQJll/3DZZ+lTQgMl1RkYRWfgR6iAiikQ6exvav9+A=="
            apiKey={process.env.NEXT_PUBLIC_FIDBACKHUB_TOKEN}
          />
      </SessionProvider>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession({ required: true })
  
  useEffect(() => {
    console.log(status);
  }, [status])

  if (status === 'loading') {
    return (<LoaderScreen />)
  }
  return children;
}

export default App;
