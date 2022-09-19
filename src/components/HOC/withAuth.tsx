import { NextPageContext } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

type WithAuthComponent = (
  Component: NextPageWithLayout,
  role: string
) => NextPageWithLayout;

const withAuth: WithAuthComponent = (Component, role = "") => {
  const AuthComponent: NextPageWithLayout = ({ ...restProps }) => {
    return <Component {...restProps} />;
  };

  AuthComponent.getInitialProps = async (context: NextPageContext) => {
    const res = await fetch("http://localhost:3000/api/simulateGetUser");
    const data = await res.json();
    if (data.role !== role) {
      context.res?.writeHead(302, { location: "/login" });
      context.res?.end();
      return {};
    }

    return {};
  };

  AuthComponent.getLayout = Component.getLayout;

  return AuthComponent;
};

export default withAuth;
