import Head from "next/head";
import ProfileContainer from "src/containers/ProfileContainer";
import { NextPageWithLayout } from "../_app";

const UserProfile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Storytelling - User Profile</title>
      </Head>
      <ProfileContainer />
    </>
  );
};

export default UserProfile;
