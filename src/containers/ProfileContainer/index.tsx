import { useRouter } from "next/router";
import React from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import CourseCard from "src/components/CourseCard";
import {
  useGetCoursesByInstructor,
  useGetUserById,
  useGetUserDetail,
  useUser,
} from "src/hooks/apis";
import useModal from "src/hooks/useModal";
import { USER_ROLES } from "src/utils/constants";
import { Path } from "src/utils/Path";
import UpdateProfileModal from "./components/UpdateProfileModal";
import { ProfileHeader, ProfileImage } from "./styles";

interface Props {
  mode: "me" | "instructor";
  instructorId: string;
}

const ProfileContainer = ({ mode, instructorId }: Props) => {
  const modal = useModal();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const { user: instructor } = useGetUserById(instructorId);
  const { data: courses, isLoading } = useGetCoursesByInstructor(
    mode === "me" ? currentUser?.userId : instructorId
  );

  const renderCourseList = () => {
    return courses?.map((courseItem) => (
      <CourseCard
        key={courseItem.id}
        course={courseItem}
        user={mode === "me" ? currentUser : instructor}
      />
    ));
  };

  return (
    <Box maxWidth="911px" margin="40px auto 0">
      {/* HEADER */}
      <ProfileHeader>
        <Box display="flex" alignItems="center">
          <ProfileImage>
            <ImageComponent
              fallBack="/assets/ava.png"
              src={
                mode === "me"
                  ? (currentUser?.avatarUrl as string)
                  : (instructor?.avatarUrl as string)
              }
              alt="avatar"
            />
          </ProfileImage>
          <Box padding=" 0 0 0 15px">
            <Text
              fontSize="xl"
              fontWeight="medium"
              lineHeight="xl"
              color="text"
            >
              {mode === "me" ? currentUser?.fullName : instructor?.fullName}
            </Text>
            <Box display="flex">
              <Box
                as={Text}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="large"
                padding="0 10px 0 0"
              >
                {courses?.length} Course{Number(courses?.length) > 1 ? "s" : ""}
              </Box>
              <Text fontSize="sm" fontWeight="regular" lineHeight="large">
                0 Students
              </Text>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {mode === "me" && (
            <Box onClick={modal.toggleModal} as={Button} height="fit-content">
              Edit Profile
            </Box>
          )}

          {mode === "me" && currentUser?.role === USER_ROLES.AUTHOR && (
            <Box
              as={Button}
              $type="secondary"
              height="fit-content"
              margin="0 0 0 10px"
              onClick={() => router.push(Path.statistic)}
            >
              Statistic
            </Box>
          )}

          {mode === "instructor" && (
            <Box
              as={Button}
              $type="secondary"
              height="fit-content"
              margin="0 0 0 10px"
            >
              Follow
            </Box>
          )}
        </Box>
      </ProfileHeader>
      <Box margin="40px 0">
        <Text fontSize="base" fontWeight="medium" lineHeight="large">
          My Courses:
        </Text>

        {courses?.length === 0 ? (
          <Center width="100%" className="flex-col p-4">
            <Box width="120%" height="300px">
              <ImageComponent src="/assets/empty.png" alt="empty" />
            </Box>
            <Text
              fontSize="sm"
              fontWeight="medium"
              lineHeight="large"
              color="text"
            >
              You currently haven't any course
            </Text>
          </Center>
        ) : (
          <Box margin="20px 0 0" className="grid grid-cols-3 gap-x-4 gap-y-8">
            {renderCourseList()}
          </Box>
        )}
      </Box>
      <UpdateProfileModal modal={modal} />
    </Box>
  );
};

export default ProfileContainer;
