import Cookies from "js-cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import LoginContainer from "src/containers/LoginContainer";
import { ACCESS_TOKEN } from "src/utils/constants";
import { Path } from "src/utils/Path";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (ctx.req && ctx.req.cookies[ACCESS_TOKEN]) {
    return {
      redirect: {
        destination: Path.home,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
