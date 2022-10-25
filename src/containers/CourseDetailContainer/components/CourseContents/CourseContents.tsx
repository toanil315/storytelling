import { Col, Row } from "antd";
import React from "react";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Text from "src/components/commons/Typography";
import PlayIcon from "src/components/icons/PlayIcon";

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
  {
    name: "Module Federation",
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

const CourseContents = () => {
  const renderSections = () => {
    return sections.map(({ name, lectures }, index) => (
      <Collapse
        key={name}
        header={<SectionHeader name={name} index={index + 1} />}
      >
        <Box border="2px solid" borderColor="lightGray">
          {renderLecture(lectures)}
        </Box>
      </Collapse>
    ));
  };

  const renderLecture = (
    lectures: {
      name: string;
      link: string;
      thumbnail: string;
    }[]
  ) => {
    return lectures.map((lecture) => {
      return (
        <Box as={Row} width="100%" gutter={[10, 0]} padding="15px">
          <Col span={1}>
            <PlayIcon />
          </Col>
          <Col span={16}>
            <Text
              fontSize="base"
              fontWeight="medium"
              lineHeight="large"
              color="text"
            >
              {lecture.name}
            </Text>
          </Col>
          <Col span={6}>
            <Box width="100%">
              <Text textAlign="right">5:00</Text>
            </Box>
          </Col>
        </Box>
      );
    });
  };

  return <>{renderSections()}</>;
};

const SectionHeader = ({ name, index }: { name: string; index: number }) => {
  return (
    <Box bg="lightGray" style={{ cursor: "pointer" }} padding="15px 10px">
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        Section {index}: {name}
      </Text>
    </Box>
  );
};

export default CourseContents;
