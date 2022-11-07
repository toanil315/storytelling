import React from "react";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import parser from "html-react-parser";
import { useRouter } from "next/router";
import { useGetLectureById } from "src/hooks/apis";

const VideoPlay = () => {
  const { query } = useRouter();
  const { lectureId } = query;
  const { data: lecture, isLoading: getLectureLoading } = useGetLectureById(
    lectureId as string
  );

  return (
    <Box width="100%">
      <video
        width={"100%"}
        controls
        src="https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4"
      />
      <Box
        width="100%"
        bg="white"
        padding="25px 10px"
        borderRadius="md"
        margin="25px 0 0"
      >
        <Text
          fontSize="base"
          fontWeight="medium"
          lineHeight="large"
          color="text"
        >
          {lecture?.title}
        </Text>
        <Box className="flex" margin="10px 0">
          <Box
            as={Text}
            padding="0 5px 0 0"
            fontSize="sm"
            fontWeight="bold"
            lineHeight="large"
            color="text"
          >
            Description:
          </Box>
          <Text
            fontSize="sm"
            fontWeight="regular"
            lineHeight="large"
            color="textLight"
          >
            {lecture?.description
              ? parser(JSON.parse(lecture?.description))
              : ""}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlay;
