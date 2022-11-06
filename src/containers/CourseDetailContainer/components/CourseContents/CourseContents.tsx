import { Col, Row } from "antd";
import React, { useState } from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Collapse from "src/components/commons/Collapse";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import PlayIcon from "src/components/icons/PlayIcon";
import { useModal } from "src/hooks";
import { useGetSection, useGetLecturesBySectionParallel } from "src/hooks/apis";
import { formatDuration } from "src/utils/helpers/formatDuration";
import PreviewVideoModal from "../PreviewModal";

interface Props {
  courseId: string;
}

const CourseContents = ({ courseId }: Props) => {
  const { data: sections } = useGetSection(courseId);
  const lectures = useGetLecturesBySectionParallel(sections ?? []);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");
  const modal = useModal();

  const handlePreviewVideo = (videoLink: string) => {
    setCurrentVideoLink(videoLink);
    modal.toggleModal();
  };

  const renderSections = () => {
    return sections?.map(({ name, id }, index) => (
      <Collapse
        key={id}
        header={<SectionHeader name={name} index={index + 1} />}
      >
        <Box border="2px solid" borderColor="lightGray">
          {renderLecture(index)}
        </Box>
      </Collapse>
    ));
  };

  const renderLecture = (index: number) => {
    if (lectures[index].data?.data?.length === 0) {
      return (
        <Center className="flex-col p-4">
          <Box width="100%" height="220px">
            <ImageComponent src="/assets/empty.png" alt="empty" />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="medium"
            lineHeight="large"
            color="text"
          >
            This section is currently empty
          </Text>
        </Center>
      );
    }
    return lectures[index].data?.data?.map((lecture, index) => {
      return (
        <Box key={index} as={Row} width="100%" gutter={[10, 0]} padding="15px">
          <Col span={1}>
            <PlayIcon />
          </Col>
          {lecture.isLock ? (
            <Col span={16}>
              <Text
                fontSize="base"
                fontWeight="medium"
                lineHeight="large"
                color="text"
              >
                {lecture.title}
              </Text>
            </Col>
          ) : (
            <Col span={16}>
              <Box
                onClick={() => handlePreviewVideo(lecture.url)}
                as={Text}
                fontSize="base"
                fontWeight="medium"
                lineHeight="large"
                color="green"
                className="underline cursor-pointer"
              >
                {lecture.title}
              </Box>
            </Col>
          )}
          <Col span={6}>
            <Box width="100%">
              <Text textAlign="right">
                {formatDuration(Number(lecture.duration) * 60)}
              </Text>
            </Box>
          </Col>
        </Box>
      );
    });
  };

  return (
    <Box>
      {renderSections()}
      <PreviewVideoModal modal={modal} videoLink={currentVideoLink} />
    </Box>
  );
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
