import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import withAuth from "src/components/HOC/withAuth";
import { USER_ROLES } from "src/utils/constants";
import dynamic from "next/dynamic";

const CourseContainer = dynamic(
  () => import("src/containers/CourseContainer"),
  {
    ssr: false,
  }
);

const CourseLearnPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  return <CourseContainer courseId={id as string} />;
};

export default withAuth(CourseLearnPage, [USER_ROLES.AUTHOR, USER_ROLES.USER]);
