import { useRouter } from "next/router";
import React from "react";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Text from "src/components/commons/Typography";
import { SectionType } from "src/data-model/CourseTypes";
import { useGetLecturesBySection } from "src/hooks/apis";
import Lecture from "../Lecture";

interface Props {
  section?: SectionType;
  index: number;
}

const Section = ({ section, index }: Props) => {
  const { data: lectures, isLoading } = useGetLecturesBySection(
    section?.id ?? ""
  );
  const router = useRouter();

  const handleChangeLecture = (lectureId: string) => {
    router.replace({
      query: {
        ...router.query,
        lectureId,
      },
    });
  };

  const renderLecture = () => {
    return lectures?.map((lecture, index) => {
      return (
        <Box key={lecture.id} onClick={() => handleChangeLecture(lecture.id)}>
          <Lecture lecture={lecture} index={index + 1} />
        </Box>
      );
    });
  };

  return (
    <Collapse header={<SectionHeader name={section?.name} index={index} />}>
      {renderLecture()}
    </Collapse>
  );
};

const SectionHeader = ({ name, index }: { name?: string; index: number }) => {
  return (
    <Box
      bg="lightGray"
      style={{ cursor: "pointer" }}
      padding="15px 50px 15px 10px"
    >
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        Section {index}: {name}
      </Text>
    </Box>
  );
};

export default Section;
