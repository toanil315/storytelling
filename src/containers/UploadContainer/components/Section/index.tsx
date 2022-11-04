import { Col, Row } from "antd";
import React, { useState } from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import CheckMarkIcon from "src/components/icons/CheckMarkIcon";
import PlayIcon from "src/components/icons/PlayIcon";
import { LectureType, SectionType } from "src/data-model/CourseTypes";
import LectureForm from "../LectureForm";
import EditIcon from "src/components/icons/EditIcon";
import PlusIcon from "src/components/icons/PlusIcon";

interface Props {
  section: SectionType;
  sectionIndex: number;
}

const Section = ({ section, sectionIndex }: Props) => {
  const [canAddLecture, setCanAddLecture] = useState<boolean>(true);

  const renderLectures = () => {
    return section.lectures?.map((lecture, index) => (
      <Lecture key={lecture.id} lectureIndex={index} lecture={lecture} />
    ));
  };

  const handleAddLecture = (lecture: Partial<LectureType>) => {
    console.log("add: ", lecture);
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        margin="0 0 20px"
      >
        <Box display="flex" alignItems="center">
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
            {section.name}
          </Box>
        </Box>
        {canAddLecture && (
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => setCanAddLecture(false)}
            title="Add Lecture"
          >
            <Box width={40} height={40} as={PlusIcon} />
          </Box>
        )}
      </Box>
      <Center flexDirection="column">{renderLectures()}</Center>
      {!canAddLecture && (
        <Box margin="20px 0 0">
          <LectureForm mode="create" handleSubmit={handleAddLecture} />
        </Box>
      )}
    </Box>
  );
};

interface LectureProps {
  lectureIndex: number;
  lecture: LectureType;
}

const Lecture = ({ lectureIndex, lecture }: LectureProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditLecture = (data: Partial<LectureType>) => {
    console.log("edit: ", data);
    setIsEdit(false);
  };

  return !isEdit ? (
    <Box
      width="90%"
      bg="white"
      padding="14px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="textLight"
      display="flex"
      alignItem="flex-start"
      justifyContent="space-between"
    >
      <Box>
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
      <Box>
        <Box
          onClick={() => setIsEdit(true)}
          padding="5px"
          bg="primary"
          borderRadius="md"
          type="submit"
          style={{ cursor: "pointer" }}
        >
          <EditIcon />
        </Box>
      </Box>
    </Box>
  ) : (
    <LectureForm
      defaultValues={lecture}
      mode="edit"
      handleSubmit={handleEditLecture}
    />
  );
};

export default Section;
