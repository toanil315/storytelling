import Head from "next/head";
import { useRouter } from "next/router";
import withAuth from "src/components/HOC/withAuth";
import { USER_ROLES } from "src/utils/constants";
import { NextPageWithLayout } from "../_app";
import dynamic from "next/dynamic";

const ProfileContainer = dynamic(
  () => import("src/containers/ProfileContainer"),
  {
    ssr: false,
  }
);

const Profile: NextPageWithLayout = () => {
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

export default withAuth(Profile, [USER_ROLES.AUTHOR, USER_ROLES.USER]);
