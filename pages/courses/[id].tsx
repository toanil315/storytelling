import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await fetch(`${BASE_URL}/courses?page=1&limit=10`);
  const data = await result.json();

  if (data) {
    return {
      props: {
        course: data.data.find(
          (item: CourseType) => item.id === context.params?.id
        ),
      },
    };
  }

  return {
    redirect: {
      destination: Path.error,
      permanent: false,
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
