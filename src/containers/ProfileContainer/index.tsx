import { useRouter } from "next/router";
import React from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import VideoCard from "src/components/VideoCard";
import useModal from "src/hooks/useModal";
import { Path } from "src/utils/Path";
import InformationModal from "./components/InformationModal";
import { ProfileHeader, ProfileImage } from "./styles";

const ProfileContainer = () => {
  const modal = useModal();
  const router = useRouter();

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
              Maher Zain
            </Text>
            <Box display="flex">
              <Box
                as={Text}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="large"
                padding="0 10px 0 0"
              >
                56 Course
              </Box>
              <Text fontSize="sm" fontWeight="regular" lineHeight="large">
                94 Students
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
            View Statistic
          </Box>
        </Box>
      </ProfileHeader>
      <Box margin="40px 0">
        <Text fontSize="base" fontWeight="medium" lineHeight="large">
          My Courses:
        </Text>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 mt-4">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </Box>
      <InformationModal modal={modal} />
    </Box>
  );
};

export default ProfileContainer;
