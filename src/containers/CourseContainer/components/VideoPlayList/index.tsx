import React from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Text from "src/components/commons/Typography";
import Section from "../Section";

const sections = [
  {
    name: "Basic of Micro Front-End",
    lectures: [
      {
        name: "Joint Our Comunity",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "Course Resources",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
      {
        name: "abc",
        link: "https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4",
        thumbnail: "",
      },
    ],
  },
];

interface Props {
  height: number;
}

const VideoPlayList = ({ height }: Props) => {
  const { t } = useTranslation();

  const renderCoursePlayList = () => {
    return sections.map((section, index) => {
      return <Section key={index} index={index + 1} {...section} />;
    });
  };

  return (
    <Box
      overflow="auto"
      borderRadius="md"
      width="100%"
      height={`${height}px`}
      bg="white"
      style={{ overflowY: "auto" }}
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
