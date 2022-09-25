import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import ForgotPasswordContainer from "src/containers/ForgotPasswordContainer";
import LoginContainer from "src/containers/LoginContainer";

const ForgotPasswordPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ForgotPasswordContainer />
    </>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default ForgotPasswordPage;
