import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { CourseType } from "src/data-model/CourseTypes";
import { BASE_URL } from "src/utils/constants";
import HomeContainer from "../src/containers/HomeContainer";
import { NextPageWithLayout } from "./_app";

interface Props {
  courses: CourseType[];
}

const Home: NextPageWithLayout = ({ courses }: Props) => {
  return (
    <>
      <Head>
        <title>Storytelling</title>
      </Head>
      <HomeContainer courses={courses} />
    </>
  );
};

export const getServerSideProps = async () => {
  const result = await fetch(`${BASE_URL}/courses?page=1&limit=10`);
  const data = await result.json();
  return {
    props: {
      courses: data.data ?? [],
    },
  };
};

export default Home;
