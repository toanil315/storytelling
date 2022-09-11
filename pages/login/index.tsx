import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import LoginContainer from "src/containers/LoginContainer";

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default LoginPage;
