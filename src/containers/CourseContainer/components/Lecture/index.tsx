import React from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import PlayIcon from "src/components/icons/PlayIcon";
import CheckMarkIcon from "src/components/icons/CheckMarkIcon";
import { LectureWrapper } from "./styles";

interface Props {
  lecture: {
    name: string;
    link: string;
    thumbnail: string;
  };
  index: number;
}

const Lecture = ({ lecture, index }: Props) => {
  return (
    <LectureWrapper display="flex" alignItems="center" padding="15px 10px">
      <Center
        width="18px"
        height="18px"
        borderRadius="base"
        border="1px solid"
        borderColor="textLight"
      >
        <CheckMarkIcon fill="#ffffff" />
      </Center>
      <Box margin="0 0 0 15px">
        <Text
          fontSize="base"
          fontWeight="regular"
          lineHeight="large"
          color="text"
        >
          {index}. {lecture.name}
        </Text>
        <Box display="flex" alignItems="center" margin="5px 0 0">
          <Box margin="0 5px 0 0">
            <PlayIcon width={14} height={14} />
          </Box>{" "}
          6min
        </Box>
      </Box>
    </LectureWrapper>
  );
};

export default Lecture;
