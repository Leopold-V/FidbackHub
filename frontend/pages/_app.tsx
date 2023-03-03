import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var localizedFormat = require('dayjs/plugin/localizedFormat');
import '../styles/globals.css';
import { LoaderScreen } from 'components/common/LoaderScreen';
//import '../../widget/dist/widget';
import Script from 'next/script';

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
        {/* <FidbackHub apiKey={process.env.NEXT_PUBLIC_FIDBACKHUB_TOKEN} height={500} /> */}
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
      <Script>
      {`(function (w,d,s,o,f,js,fjs) {
            w['JS-Widget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'mw', '../../widget/dist/widget.js'));
        mw('init', { someConfiguration: 42 });
        mw('message', 'Hello world!');`}
      </Script>
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
