import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import withAuth from "src/components/HOC/withAuth";

const Test: NextPageWithLayout = () => {
  return <>test</>;
};

Test.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default withAuth(Test, "User");
