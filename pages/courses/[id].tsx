import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { Path } from "src/utils/Path";

const CourseViewPage: NextPageWithLayout = () => {
  return <p>View</p>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `${Path.courses}/learn/1`,
      permanent: false,
    },
  };
};

export default CourseViewPage;
