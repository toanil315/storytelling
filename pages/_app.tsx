import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18next from "src/i18n/i18n";
import DefaultLayout from "src/layouts/DefaultLayout";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import SockJS from "sockjs-client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/nextjs";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.settings.showSpinner = false;

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  getInitialProps?(context: NextPageContext): IP | Promise<IP>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 300000, // 5 minutes
            cacheTime: 600000, // 10 minutes
            retryDelay: 1000,
            retry: 3,
            onError: (error) => {
              Sentry.captureException(error);
            },
          },
          mutations: {
            onError: (error) => {
              Sentry.captureException(error);
            },
          },
        },
      })
  );

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done();
    });

    Router.events.on("routeChangeError", (url) => {
      NProgress.done();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ThemeProvider>
      </I18nextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
