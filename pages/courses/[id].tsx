import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import CourseDetailContainer from "src/containers/CourseDetailContainer";
import { CourseType } from "src/data-model/CourseTypes";
import { BASE_URL } from "src/utils/constants";
import { Path } from "src/utils/Path";

interface Props {
  course: CourseType;
}

const CourseViewPage: NextPageWithLayout = ({ course }: Props) => {
  return <CourseDetailContainer course={course} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const result = await fetch(`${BASE_URL}/courses/${context.params?.id}`);
  if (!result.ok) {
    return {
      redirect: {
        destination: `/${Path.error}`,
        permanent: false,
      },
    };
  }

  const data = await result.json();
  return {
    props: {
      course: data.data,
    },
  };

  // return {
  //   redirect: {
  //     destination: `${Path.courses}/learn/1`,
  //     permanent: false,
  //   },
  // };
};

export default CourseViewPage;
