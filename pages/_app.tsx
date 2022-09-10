import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18next from "src/i18n/i18n";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <I18nextProvider i18n={i18next}>
      {getLayout(<Component {...pageProps} />)}
    </I18nextProvider>
  );
}
