import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import UploadContainer from "src/containers/UploadContainer";

const EditCoursePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <UploadContainer courseId={id as string} mode="edit" />
    </>
  );
};

export default EditCoursePage;
