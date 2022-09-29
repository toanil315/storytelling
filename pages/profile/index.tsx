import Head from "next/head";
import ProfileContainer from "src/containers/ProfileContainer";
import { NextPageWithLayout } from "../_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Storytelling - Profile</title>
      </Head>
      <ProfileContainer />
    </>
  );
};

export default Home;
