import axios from "axios";
import { NextPageContext } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { BASE_HOST, USER_ROLES } from "src/utils/constants";
import { redirect } from "src/utils/helpers/redirect";
import { Path } from "src/utils/Path";
import * as Sentry from "@sentry/nextjs";

type WithAuthComponent = (
  Component: NextPageWithLayout,
  role?: string[]
) => NextPageWithLayout;

const withAuth: WithAuthComponent = (Component, role = [USER_ROLES.USER]) => {
  const AuthComponent: NextPageWithLayout = ({ ...restProps }) => {
    return <Component {...restProps} />;
  };

  AuthComponent.getInitialProps = async (context: any) => {
    try {
      const { data } = await axios.get(`${BASE_HOST}/api/private/getMe`, {
        headers: {
          cookie: context.req?.headers.cookie,
        },
      });

      if (!role.includes(data.role)) {
        redirect(context, Path.login);
        return {};
      }

      return {};
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  AuthComponent.getLayout = Component.getLayout;

  return AuthComponent;
};

export default withAuth;
