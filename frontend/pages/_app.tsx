import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat');
import { LoaderScreen } from 'components/common/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

dayjs.extend(localizedFormat);

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" crossOrigin="anonymous" />
      </Head>
      <SessionProvider session={session}>
        {router.pathname !== '/' && router.pathname !== '/project-creation' ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </SessionProvider>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { status } = useSession({ required: true });
  if (status === 'loading') {
    return <LoaderScreen />;
  }
  return children;
};

export default App;
