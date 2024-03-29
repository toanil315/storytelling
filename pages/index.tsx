import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { CourseType } from "src/data-model/CourseTypes";
import { useUser } from "src/hooks/apis";
import { BASE_URL, DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
import { redirect } from "src/utils/helpers/redirect";
import { Path } from "src/utils/Path";
import { PaginationType } from "src/utils/types/CustomAxiosResponse";
import HomeContainer from "../src/containers/HomeContainer";
import { NextPageWithLayout } from "./_app";

interface Props {
  courses: CourseType[];
  pagination: PaginationType;
}

const Home: NextPageWithLayout = ({ courses, pagination }: Props) => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Storytelling</title>
      </Head>
      <HomeContainer courses={courses} pagination={pagination} />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page } = context.query;
  const result = await fetch(
    `${BASE_URL}/courses?page=${page ?? 1}&limit=${
      DEFAULT_PAGINATION_SIZE.COURSES_SIZE
    }`
  );

  if (!result.ok) {
    return redirect(context, Path.error);
  }

  const data = await result.json();

  return {
    props: {
      courses: data.data ?? [],
      pagination: data.pagination,
    },
  };
};

export default Home;
