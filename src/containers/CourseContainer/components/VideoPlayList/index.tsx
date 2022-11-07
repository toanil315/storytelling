import React from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import { SectionType } from "src/data-model/CourseTypes";
import Section from "../Section";

interface Props {
  sections: SectionType[];
}

const VideoPlayList = ({ sections }: Props) => {
  const { t } = useTranslation();

  const renderCoursePlayList = () => {
    return sections?.map((section, index) => {
      return <Section key={section.id} index={index + 1} section={section} />;
    });
  };

  return (
    <Box
      overflow="auto"
      borderRadius="md"
      width="100%"
      height="100%"
      bg="white"
      style={{ overflowY: "auto" }}
      border="1px solid"
      borderColor="#d0d0cc"
    >
      <Box
        as={Text}
        padding="10px"
        fontSize="base"
        fontWeight="bold"
        lineHeight="large"
        color="text"
        borderBottom="1px solid"
        borderColor="lightGray"
      >
        {t("courseContent")}:
      </Box>
      <Box>{renderCoursePlayList()}</Box>
    </Box>
  );
};

export default VideoPlayList;
