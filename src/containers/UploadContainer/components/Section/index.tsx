import { Col, Row } from "antd";
import React, { useState } from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import CheckMarkIcon from "src/components/icons/CheckMarkIcon";
import PlayIcon from "src/components/icons/PlayIcon";
import PlusIcon from "src/components/icons/PlusIcon";
import NewLectureForm from "../NewLectureForm";

interface Props {
  section: {
    id: string;
    title: string;
    lectures: {
      id: string;
      title: string;
      video: string;
    }[];
  };
  sectionIndex: number;
}

const Section = ({ section, sectionIndex }: Props) => {
  const [canAddLecture, setCanAddLecture] = useState<boolean>(true);

  const renderLectures = () => {
    return section.lectures.map((lecture, index) => (
      <Lecture key={lecture.id} lectureIndex={index} lecture={lecture} />
    ));
  };

  const handleAddLecture = (lecture: { title: string; video: string }) => {
    console.log(lecture);
    setCanAddLecture(true);
  };

  return (
    <Box
      width="100%"
      bg="lightGray"
      padding="20px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="textLight"
      borderRadius="md"
    >
      <Box display="flex" margin="0 0 20px">
        <Text
          fontWeight="extraBold"
          fontSize="sm"
          lineHeight="normal"
          color="text"
        >
          Section {sectionIndex + 1}:
        </Text>
        <Box
          as={Text}
          padding="0 0 0 10px"
          fontWeight="regular"
          fontSize="sm"
          lineHeight="normal"
          color="text"
        >
          {section.title}
        </Box>
      </Box>
      <Center flexDirection="column">{renderLectures()}</Center>
      {!canAddLecture && (
        <Box margin="20px 0 0">
          <NewLectureForm handleSubmit={handleAddLecture} />
        </Box>
      )}
      {canAddLecture && (
        <Center>
          <Box
            onClick={() => setCanAddLecture(false)}
            as={PlusIcon}
            style={{ cursor: "pointer" }}
            width={40}
            height={40}
            margin="20px 0 0"
          />
        </Center>
      )}
    </Box>
  );
};

interface LectureProps {
  lectureIndex: number;
  lecture: {
    id: string;
    title: string;
    video: string;
  };
}

const Lecture = ({ lectureIndex, lecture }: LectureProps) => {
  return (
    <Box
      width="90%"
      bg="white"
      padding="14px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="textLight"
    >
      <Box display="flex">
        <Box as={CheckMarkIcon} fill="green" margin="0 10px 0 0" />
        <Text
          fontWeight="medium"
          fontSize="sm"
          lineHeight="normal"
          color="text"
        >
          Lecture {lectureIndex + 1}:
        </Text>
        <Box
          as={Text}
          padding="0 0 0 10px"
          fontWeight="regular"
          fontSize="sm"
          lineHeight="normal"
          color="text"
        >
          {lecture.title}
        </Box>
      </Box>
      <Box margin="10px 0 0" display="flex">
        <PlayIcon />
        <Box as="a" href={lecture.video} padding="0 0 0 10px" color="green">
          Lecture Video
        </Box>
      </Box>
    </Box>
  );
};

export default Section;
