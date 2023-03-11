import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
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
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        {router.pathname !== ('/' && '/project-creation') ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
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
      <script type="text/javascript" src=""></script>
      {/* <iframe src="http://127.0.0.1:5173/" name="MagicIframe" width="300" height="600" scrolling="no" frameBorder="0" className="absolute top-0"></iframe> */}
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
