import { useRouter } from "next/router";
import React from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import CourseCard from "src/components/CourseCard";
import { useGetCoursesByInstructor, useUser } from "src/hooks/apis";
import useModal from "src/hooks/useModal";
import { Path } from "src/utils/Path";
import InformationModal from "./components/InformationModal";
import { ProfileHeader, ProfileImage } from "./styles";

interface Props {
  mode: "me" | "instructor";
  instructorId: string;
}

const ProfileContainer = ({ mode, instructorId }: Props) => {
  const modal = useModal();
  const router = useRouter();
  const { user } = useUser();
  const { data: courses, isLoading } = useGetCoursesByInstructor(
    mode === "me" ? user?.userId : instructorId
  );

  const renderCourseList = () => {
    return courses?.map((courseItem) => (
      <CourseCard key={courseItem.id} course={courseItem} />
    ));
  };

  return (
    <Box maxWidth="911px" margin="40px auto 0">
      {/* HEADER */}
      <ProfileHeader>
        <Box display="flex" alignItems="center">
          <ProfileImage>
            <ImageComponent src="/assets/ava.png" alt="avatar" />
          </ProfileImage>
          <Box padding=" 0 0 0 15px">
            <Text
              fontSize="xl"
              fontWeight="medium"
              lineHeight="xl"
              color="text"
            >
              {user?.fullName}
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
          <Box onClick={modal.toggleModal} as={Button} height="fit-content">
            Edit Profile
          </Box>

          <Box
            as={Button}
            $type="secondary"
            height="fit-content"
            margin="0 0 0 10px"
            onClick={() => router.push(Path.statistic)}
          >
            Statistic
          </Box>
        </Box>
      </ProfileHeader>
      <Box margin="40px 0">
        <Text fontSize="base" fontWeight="medium" lineHeight="large">
          My Courses:
        </Text>
        <Box margin="20px 0 0" className="grid grid-cols-3 gap-x-4 gap-y-8">
          {renderCourseList()}
        </Box>
      </Box>
      <InformationModal modal={modal} />
    </Box>
  );
};

export default ProfileContainer;
