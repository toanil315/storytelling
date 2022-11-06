import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { CourseType } from "src/data-model/CourseTypes";
import {
  BASE_URL,
  DEFAULT_PAGINATION_SIZE_IN_PAGES,
} from "src/utils/constants";
import { PaginationType } from "src/utils/types/CustomAxiosReponse";
import HomeContainer from "../src/containers/HomeContainer";
import { NextPageWithLayout } from "./_app";

interface Props {
  courses: CourseType[];
  pagination: PaginationType;
}

const Home: NextPageWithLayout = ({ courses, pagination }: Props) => {
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
    `${BASE_URL}/courses?page=${
      page ?? 1
    }&limit=${DEFAULT_PAGINATION_SIZE_IN_PAGES}`
  );
  const data = await result.json();
  return {
    props: {
      courses: data.data ?? [],
      pagination: data.pagination,
    },
  };
};

export default Home;
