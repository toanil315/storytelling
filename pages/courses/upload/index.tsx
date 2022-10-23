import { NextPageWithLayout } from "pages/_app";
import React from "react";
import UploadContainer from "src/containers/UploadContainer";

const UpLoadCoursePage: NextPageWithLayout = () => {
  return (
    <>
      <UploadContainer mode="create" />
    </>
  );
};

export default UpLoadCoursePage;
