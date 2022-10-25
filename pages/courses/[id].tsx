import { Col, Row } from "antd";
import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import CourseDetailContainer from "src/containers/CourseDetailContainer";
import { Path } from "src/utils/Path";

const CourseViewPage: NextPageWithLayout = () => {
  return <CourseDetailContainer />;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: `${Path.courses}/learn/1`,
//       permanent: false,
//     },
//   };
// };

export default CourseViewPage;
