import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import CourseDetailContainer from "src/containers/CourseDetailContainer";
import { CourseType } from "src/data-model/CourseTypes";
import { BASE_JAVA_URL, BASE_URL } from "src/utils/constants";
import { redirect } from "src/utils/helpers/redirect";
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

  if (context.query?.userId) {
    const resultCheckIsPurchasedCourse = await fetch(
      `${BASE_JAVA_URL}/subscribes/courses/${context.params?.id}/users/${context.query?.userId}/checkSubscribe`
    );

    const checkIsPurchasedCourse = await resultCheckIsPurchasedCourse.json();

    if (checkIsPurchasedCourse.data) {
      return {
        redirect: {
          destination: `${Path.courses}/learn/${context.params?.id}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      course: data.data,
    },
  };
};

export default CourseViewPage;
