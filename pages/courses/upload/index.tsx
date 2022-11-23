import { NextPageWithLayout } from "pages/_app";
import React from "react";
import withAuth from "src/components/HOC/withAuth";
import UploadContainer from "src/containers/UploadContainer";
import { USER_ROLES } from "src/utils/constants";

const UpLoadCoursePage: NextPageWithLayout = () => {
  return (
    <>
      <UploadContainer mode="create" />
    </>
  );
};

export default withAuth(UpLoadCoursePage, [USER_ROLES.AUTHOR]);
