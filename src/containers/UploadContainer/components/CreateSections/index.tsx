import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import PlusWithNoBorderIcon from "src/components/icons/PlusWithNoBorderIcon";
import SectionForm from "../SectionForm";
import Section from "../Section";
import {
  useGetSection,
  useCreateSection,
  usePublishCourse,
  useGetCourseById,
  useUser,
} from "src/hooks/apis";
import Text from "src/components/commons/Typography";
import PlaceholderLoading from "src/components/commons/Loading";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";

interface Props {
  courseId: string;
}

const CreateSections = ({ courseId }: Props) => {
  const router = useRouter();
  const { user: currentUserLogin } = useUser();
  const [canAddSection, setCanAddSection] = useState<boolean>(true);
  const { data: sections, isLoading, isError } = useGetSection(courseId);
  const { createSection, isLoading: createSectionLoading } = useCreateSection();
  const { publishCourse, isLoading: publishCourseLoading } = usePublishCourse();
  const { data: course } = useGetCourseById(courseId);

  const renderSection = () => {
    return sections?.map((section, index) => (
      <Col key={section.id} span={24}>
        <Section section={section} sectionIndex={index} />
      </Col>
    ));
  };

  useEffect(() => {
    if (!isLoading && !Boolean(sections?.length)) {
      setCanAddSection(false);
    }
  }, [isLoading, sections]);

  const handleAddSection = (sectionName: string) => {
    createSection({
      name: sectionName,
      courseId,
    });
    setCanAddSection(true);
  };

  if (isLoading) {
    return (
      <Center width="100%" height="50vh">
        <PlaceholderLoading />
      </Center>
    );
  }

  return (
    <Box>
      <Row gutter={[20, 30]}>
        {renderSection()}
        {!canAddSection && (
          <Col span={24}>
            <SectionForm
              loading={createSectionLoading}
              handleSubmit={handleAddSection}
            />
          </Col>
        )}
        {canAddSection && (
          <Col span={24}>
            <Button
              $type="white"
              onClick={() => setCanAddSection(false)}
              style={{ cursor: "pointer" }}
              margin="20px auto 0"
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box padding="0px 10px 0 0">
                  <Text>Add Section</Text>
                </Box>
                <PlusWithNoBorderIcon width={20} height={20} />
              </Box>
            </Button>
          </Col>
        )}
        <Col span={24}>
          {course?.isPublic ? (
            <Box
              onClick={() =>
                router.push(
                  `${Path.courses}/${courseId}?userId=${currentUserLogin?.userId}`
                )
              }
              as={Button}
              width="50%"
              margin="20px auto 0"
            >
              View Course
            </Box>
          ) : (
            <Box
              onClick={() => publishCourse(courseId)}
              loading={publishCourseLoading}
              as={Button}
              width="50%"
              margin="20px auto 0"
            >
              Publish Course
            </Box>
          )}
        </Col>
      </Row>
    </Box>
  );
};

export default CreateSections;
