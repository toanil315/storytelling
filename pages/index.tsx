import Head from "next/head";
import HomeContainer from "../src/containers/HomeContainer";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Storytelling</title>
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
