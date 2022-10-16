import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18next from "src/i18n/i18n";
import DefaultLayout from "src/layouts/DefaultLayout";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ENV_VARIABLES } from "src/utils/constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  getInitialProps?(context: NextPageContext): IP | Promise<IP>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  useEffect(() => {
    const initRabbitConnection = async () => {
      const result = await fetch(
        "http://103.173.255.221:8080/v1/notifications/endpoint/ffb141ea-6a78-4e23-a9b3-073cca3de065"
      );
      const { data } = await result.json();
      return data;
    };

    try {
      const ws = new WebSocket(ENV_VARIABLES.WS_URL);
      const stompClient = Stomp.over(ws);
      stompClient.debug = function () {};
      stompClient.connect(
        ENV_VARIABLES.WS_LOGIN,
        ENV_VARIABLES.WS_PASS_CODE,
        async (frame) => {
          const data = await initRabbitConnection();
          stompClient.subscribe(
            `/queue/${data}`,
            (newContent) => {
              console.log("newContent: ", JSON.parse(newContent.body));
            },
            {
              id: ENV_VARIABLES.WS_MY_SUB_ID + "-" + (data || ""),
              durable: "false",
              exclusive: "false",
              ack: "client",
              "auto-delete": "false",
            }
          );
        },
        () => {
          console.log("error");
        },
        "/"
      );
    } catch (error: any) {
      console.log({ ...error });
    }
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default MyApp;
