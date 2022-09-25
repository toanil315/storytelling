import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import SignUpContainer from "src/containers/SignUpContainer";

const SignUpPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpContainer />
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignUpPage;
