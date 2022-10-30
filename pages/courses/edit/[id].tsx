import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import withAuth from "src/components/HOC/withAuth";
import UploadContainer from "src/containers/UploadContainer";
import { USER_ROLES } from "src/utils/constants";

const EditCoursePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <UploadContainer courseId={id as string} mode="edit" />
    </>
  );
};

export default withAuth(EditCoursePage, USER_ROLES.AUTHOR);
