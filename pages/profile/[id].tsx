import Head from "next/head";
import { useRouter } from "next/router";
import withAuth from "src/components/HOC/withAuth";
import { USER_ROLES } from "src/utils/constants";
import { NextPageWithLayout } from "../_app";
import dynamic from "next/dynamic";
import { useUser } from "src/hooks/apis";

const ProfileContainer = dynamic(
  () => import("src/containers/ProfileContainer"),
  {
    ssr: false,
  }
);

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Storytelling - Profile</title>
      </Head>
      <ProfileContainer
        mode={id === "me" || id === user?.userId ? "me" : "instructor"}
        instructorId={
          !(id === "me" || id === user?.userId) ? (id as string) : ""
        }
      />
    </>
  );
};

export default withAuth(Profile, [USER_ROLES.AUTHOR, USER_ROLES.USER]);
