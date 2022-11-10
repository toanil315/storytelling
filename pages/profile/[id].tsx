import Head from "next/head";
import { useRouter } from "next/router";
import ProfileContainer from "src/containers/ProfileContainer";
import { NextPageWithLayout } from "../_app";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Storytelling - Profile</title>
      </Head>
      <ProfileContainer
        mode={id === "me" ? "me" : "instructor"}
        instructorId={id as string}
      />
    </>
  );
};

export default Home;
